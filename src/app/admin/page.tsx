import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dbGetAllLeads, dbGetAllInvoices } from "@/lib/supabase-db";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock, FileText, UserCheck } from "lucide-react";

export default async function AdminDashboardPage() {
  const leads = await dbGetAllLeads();
  const invoices = await dbGetAllInvoices();

  const newLeadsCount = leads.filter((l) => l.status === "New" || l.status === "NEW").length;
  const activeProjectsCount = invoices.filter(
    (i) => i.status === "ADVANCE PAID" || i.status === "PROJECT ACTIVE"
  ).length;
  const pendingAdvancesCount = invoices.filter(
    (i) => i.status === "AWAITING ADVANCE" || i.status === "ISSUED"
  ).length;

  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.advancePaid || 0), 0);
  const totalBookedValue = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="p-6 sm:p-8 space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-heading text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            Real-time studio system metrics, active lead intake, and revenue tracking.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/invoices"
            className="px-4 py-2 bg-primary text-primary-foreground text-xs font-mono font-bold uppercase rounded-md hover:opacity-90 transition-all flex items-center gap-1.5"
          >
            <span>Invoices</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/admin/leads"
            className="px-4 py-2 border border-border bg-card text-foreground text-xs font-mono font-bold uppercase rounded-md hover:bg-muted transition-all flex items-center gap-1.5"
          >
            <span>Leads ({leads.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              New Leads
            </CardTitle>
            <UserCheck className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{newLeadsCount}</div>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              {leads.length} total recorded leads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Active Projects
            </CardTitle>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{activeProjectsCount}</div>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              50% advance confirmed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Pending Advances
            </CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{pendingAdvancesCount}</div>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              Invoices awaiting 50% payment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Collected Revenue
            </CardTitle>
            <FileText className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              ₹{totalBookedValue.toLocaleString("en-IN")} total contract value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Recent Leads & Active Invoices */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold">Recent Leads</CardTitle>
            <Link
              href="/admin/leads"
              className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
            >
              View All ({leads.length}) →
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {recentLeads.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-muted-foreground">
                  No leads recorded yet.
                </div>
              ) : (
                recentLeads.map((lead) => (
                  <div key={lead.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm">{lead.full_name}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {lead.business_name || lead.email} • {lead.services}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-muted text-foreground">
                      {lead.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold">Commercial Invoices</CardTitle>
            <Link
              href="/admin/invoices"
              className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
            >
              Manage Invoices ({invoices.length}) →
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {invoices.slice(0, 5).map((inv) => (
                <div key={inv.invoiceId} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm">{inv.invoiceId} — {inv.clientName}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {inv.projectName} ({inv.selectedPackage})
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-xs">
                      ₹{inv.totalAmount.toLocaleString("en-IN")}
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      50%: ₹{inv.advanceRequired.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
