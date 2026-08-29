import { createClient } from "@/lib/supabase/server";
import { LeadStatusSelect } from "@/components/admin/lead-status-select";

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  
  let leads = [];
  let fetchError = null;
  
  try {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (error) {
      fetchError = error.message;
    } else {
      leads = data || [];
    }
  } catch (err) {
    fetchError = err instanceof Error ? err.message : "Failed to connect to the database.";
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-bold">Lead Management</h1>
      </div>

      {fetchError && (
        <div className="bg-amber-50 text-amber-900 border border-amber-200 p-4 rounded-md mb-8 text-sm">
          <strong>Database Connection Issue:</strong> {fetchError}. 
          <br/>Ensure your Supabase project is set up and environment variables are configured correctly.
        </div>
      )}

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
            {leads.length === 0 && !fetchError && (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center text-muted-foreground">
                  No leads found. When a user submits a form, it will appear here.
                </td>
              </tr>
            )}
            
            {leads.map((lead: { id: string, name: string, full_name: string, email: string, business_name: string, industry: string, business_type: string, services: string, service_interested_in: string, package: string, budget: string, goals: string, source: string, status: string, created_at: string }) => (
              <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">
                  {lead.full_name || lead.name} <br/>
                  <a href={`mailto:${lead.email}`} className="text-xs text-primary hover:underline font-normal">{lead.email}</a>
                </td>
                <td className="px-6 py-4">
                  {lead.business_name || 'N/A'} <br/>
                  <span className="text-xs text-muted-foreground">{lead.industry || lead.business_type}</span>
                </td>
                <td className="px-6 py-4 max-w-[200px] truncate" title={lead.services || lead.service_interested_in}>
                  {lead.services || lead.service_interested_in || 'N/A'}
                </td>
                <td className="px-6 py-4">{lead.package || 'N/A'}</td>
                <td className="px-6 py-4">{lead.budget || 'N/A'}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground font-mono">
                    {lead.source || 'contact'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <LeadStatusSelect id={lead.id} currentStatus={lead.status} />
                </td>
                <td className="px-6 py-4 text-muted-foreground">{new Date(lead.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <a href={`mailto:${lead.email}?subject=Regarding your enquiry at BlazeByte Studio`} className="text-primary hover:underline text-xs font-medium">Reply</a>
                  <button className="text-muted-foreground hover:text-foreground text-xs font-medium">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
