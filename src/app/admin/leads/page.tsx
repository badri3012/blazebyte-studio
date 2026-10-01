import { LeadStatusSelect } from "@/components/admin/lead-status-select";
import { dbGetAllLeads } from "@/lib/supabase-db";

export default async function AdminLeadsPage() {
  const leads = await dbGetAllLeads();

  return (
    <div className="p-8 font-sans">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold">Lead Management</h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            Official studio lead intake records & project enquiry tracking.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-muted/50 text-foreground font-medium">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Business</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Package</th>
              <th className="px-6 py-4">Budget</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.length === 0 && (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center text-muted-foreground">
                  No leads found. When a user submits an order or enquiry, it will appear here.
                </td>
              </tr>
            )}
            
            {leads.map((lead: any) => (
              <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">
                  {lead.full_name || lead.name || "Valued Client"} <br/>
                  <a href={`mailto:${lead.email}`} className="text-xs text-primary hover:underline font-normal">{lead.email}</a>
                </td>
                <td className="px-6 py-4">
                  {lead.business_name || lead.company || 'N/A'} <br/>
                  <span className="text-xs text-muted-foreground">{lead.industry || lead.business_type || ''}</span>
                </td>
                <td className="px-6 py-4 max-w-[200px] truncate" title={lead.services || lead.service_interested_in || lead.service}>
                  {lead.services || lead.service_interested_in || lead.service || 'General'}
                </td>
                <td className="px-6 py-4">{lead.package || 'Custom'}</td>
                <td className="px-6 py-4">{lead.budget || 'N/A'}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground font-mono">
                    {lead.source || 'website'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <LeadStatusSelect id={lead.id} currentStatus={lead.status || "New"} />
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'Recent'}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <a href={`mailto:${lead.email}?subject=Regarding your enquiry at BlazeByte Studio`} className="text-primary hover:underline text-xs font-medium">Reply</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
