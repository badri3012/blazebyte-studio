const https = require('https');
const http = require('http');

async function checkUrl(targetUrl, redirectCount = 0) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;
      const agent = parsed.protocol === 'https:' ? new https.Agent({ rejectUnauthorized: false }) : undefined;
      const req = client.request(targetUrl, { method: 'GET', agent, headers: { 'User-Agent': 'BlazeByte-Audit-Bot/1.0' } }, (res) => {
        let body = '';
        res.on('data', chunk => {
          if (body.length < 50000) body += chunk;
        });
        res.on('end', () => {
          let canonical = null;
          const match = body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
          if (match) canonical = match[1];

          let title = null;
          const titleMatch = body.match(/<title>([^<]+)<\/title>/i);
          if (titleMatch) title = titleMatch[1];

          resolve({
            url: targetUrl,
            status: res.statusCode,
            location: res.headers.location || null,
            canonical,
            title,
            bodySnippet: body.slice(0, 100).trim()
          });
        });
      });
      req.on('error', (err) => {
        resolve({ url: targetUrl, status: 'ERROR', error: err.message });
      });
      req.setTimeout(8000, () => {
        req.destroy();
        resolve({ url: targetUrl, status: 'TIMEOUT' });
      });
      req.end();
    } catch (e) {
      resolve({ url: targetUrl, status: 'EXCEPTION', error: e.message });
    }
  });
}

async function run() {
  console.log('=== 1. DOMAIN ARCHITECTURE & CANONICAL AUDIT (ISS-001) ===');
  const domainTests = [
    'https://www.blazebyte.shop/',
    'https://blazebyte.shop/',
    'http://www.blazebyte.shop/',
    'http://blazebyte.shop/'
  ];
  for (const url of domainTests) {
    const res = await checkUrl(url);
    console.log(`URL: ${url} -> Status: ${res.status}${res.location ? ` -> Location: ${res.location}` : ''}`);
  }

  console.log('\n=== 2. SERVICES INDEXABILITY AUDIT (ISS-002) ===');
  const servicesRes = await checkUrl('https://www.blazebyte.shop/services');
  console.log(`URL: ${servicesRes.url}`);
  console.log(`Status: ${servicesRes.status}`);
  console.log(`Canonical: ${servicesRes.canonical}`);
  console.log(`Title: ${servicesRes.title}`);

  console.log('\n=== 3. REDIRECT ERRORS AUDIT (ISS-003) ===');
  const redirectTests = [
    'https://www.blazebyte.shop/case-studies',
    'https://www.blazebyte.shop/case-studies/',
    'https://www.blazebyte.shop/work/'
  ];
  for (const url of redirectTests) {
    const res = await checkUrl(url);
    console.log(`URL: ${url} -> Status: ${res.status}${res.location ? ` -> Location: ${res.location}` : ''}`);
  }

  console.log('\n=== 4. SITEMAP ALL 18 CANONICAL ROUTES AUDIT ===');
  const sitemapUrls = [
    'https://www.blazebyte.shop',
    'https://www.blazebyte.shop/web',
    'https://www.blazebyte.shop/marketing',
    'https://www.blazebyte.shop/ai',
    'https://www.blazebyte.shop/apps',
    'https://www.blazebyte.shop/work',
    'https://www.blazebyte.shop/process',
    'https://www.blazebyte.shop/about',
    'https://www.blazebyte.shop/contact',
    'https://www.blazebyte.shop/faq',
    'https://www.blazebyte.shop/packages',
    'https://www.blazebyte.shop/services',
    'https://www.blazebyte.shop/services/seo',
    'https://www.blazebyte.shop/privacy-policy',
    'https://www.blazebyte.shop/terms-and-conditions',
    'https://www.blazebyte.shop/refund-policy',
    'https://www.blazebyte.shop/cookie-policy',
    'https://www.blazebyte.shop/disclaimer'
  ];

  for (const url of sitemapUrls) {
    const res = await checkUrl(url);
    console.log(`[${res.status}] ${url} | Title: "${res.title || 'N/A'}" | Canonical: ${res.canonical || 'N/A'}`);
  }

  console.log('\n=== 5. INDEXNOW KEY FILE AUDIT ===');
  const keyRes = await checkUrl('https://www.blazebyte.shop/f044b8477f014aeca046d92d9938f16a.txt');
  console.log(`Status: ${keyRes.status} | Content: ${keyRes.bodySnippet}`);
}

run();
