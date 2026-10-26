/**
 * BLAZEBYTE STUDIO — CLI / DEPLOYMENT WORKFLOW INDEXNOW SUBMISSION SCRIPT
 *
 * Usage:
 *   npx tsx scripts/submit-indexnow.ts [--dry-run] [--urls=https://www.blazebyte.shop/web,https://www.blazebyte.shop/ai]
 *
 * Options:
 *   --dry-run       Validates URLs and prints payload without sending live HTTP requests.
 *   --urls=...      Comma-separated list of candidate URLs. Defaults to the 18 core sitemap URLs.
 *   --force         Bypasses duplicate change detection history.
 */

import * as fs from "fs";
import * as path from "path";
import {
  submitToIndexNow,
  APPROVED_CORE_INDEXABLE_URLS,
  filterAndDeduplicateUrls,
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
} from "../src/lib/indexnow";

const HISTORY_FILE = path.join(process.cwd(), ".indexnow-history.json");

interface HistoryEntry {
  lastSubmitted: string;
  urls: string[];
  statusCodes: number[];
}

function loadHistory(): Record<string, HistoryEntry> {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
    }
  } catch {
    // Ignore read errors
  }
  return {};
}

function saveHistory(history: Record<string, HistoryEntry>) {
  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
  } catch (err: any) {
    console.warn("Could not save .indexnow-history.json:", err.message);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const force = args.includes("--force");
  const urlArg = args.find((a) => a.startsWith("--urls="));

  console.log("=================================================");
  console.log(" BLAZEBYTE STUDIO — INDEXNOW SUBMISSION MANAGER");
  console.log("=================================================");
  console.log(`Host:         ${INDEXNOW_HOST}`);
  console.log(`Key:          ${INDEXNOW_KEY}`);
  console.log(`Key Location: ${INDEXNOW_KEY_LOCATION}`);
  console.log(`Dry Run:      ${isDryRun ? "YES (No requests will be sent)" : "NO (Live submission)"}`);

  let candidateUrls: string[] = [];
  if (urlArg) {
    candidateUrls = urlArg.replace("--urls=", "").split(",").map((u) => u.trim()).filter(Boolean);
  } else {
    candidateUrls = [...APPROVED_CORE_INDEXABLE_URLS];
  }

  console.log(`Candidate URLs: ${candidateUrls.length}`);

  const { approved, rejected } = filterAndDeduplicateUrls(candidateUrls, INDEXNOW_HOST);

  console.log(`Approved URLs:  ${approved.length}`);
  console.log(`Rejected URLs:  ${rejected.length}`);

  if (rejected.length > 0) {
    console.log("\n[REJECTED URL DETAILS]:");
    for (const r of rejected) {
      console.log(` - ${r.url} -> ${r.reason}`);
    }
  }

  if (approved.length === 0) {
    console.warn("\nNo valid URLs to submit. Exiting.");
    process.exit(0);
  }

  // Deduplication / History check
  const history = loadHistory();
  const lastEntry = history[INDEXNOW_HOST];
  if (!force && lastEntry && !isDryRun) {
    const prevSet = new Set(lastEntry.urls);
    const hasChanges = approved.length !== lastEntry.urls.length || approved.some((u) => !prevSet.has(u));
    if (!hasChanges) {
      console.log(`\nAll ${approved.length} approved URLs were already successfully submitted on ${lastEntry.lastSubmitted}.`);
      console.log("Use --force to resubmit unchanged URLs.");
      process.exit(0);
    }
  }

  if (isDryRun) {
    console.log("\n[DRY RUN PAYLOAD PREVIEW]:");
    const payload = {
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList: approved,
    };
    console.log(JSON.stringify(payload, null, 2));
    console.log("\nDry run completed successfully. No requests were dispatched.");
    process.exit(0);
  }

  console.log(`\nDispatching IndexNow submission for ${approved.length} URLs...`);
  const report = await submitToIndexNow(approved);

  console.log("\n[SUBMISSION REPORT]:");
  console.log(`Timestamp:       ${report.timestamp}`);
  console.log(`Overall Success: ${report.overallSuccess ? "PASSED (200/202)" : "FAILED"}`);
  console.log(`Batches Run:     ${report.batches.length}`);

  for (const b of report.batches) {
    console.log(
      ` Batch #${b.batchIndex} (${b.submittedUrls.length} URLs) -> Status ${b.statusCode} (${b.statusText}): ${b.explanation}`
    );
  }

  if (report.overallSuccess) {
    history[INDEXNOW_HOST] = {
      lastSubmitted: report.timestamp,
      urls: approved,
      statusCodes: report.batches.map((b) => b.statusCode),
    };
    saveHistory(history);
  } else {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("Fatal IndexNow error:", err);
  process.exit(1);
});
