import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="font-heading text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "New Leads", value: "12", desc: "Uncontacted this month" },
          { title: "Active Proposals", value: "4", desc: "Awaiting client signature" },
          { title: "Won Clients", value: "3", desc: "Closed this month" },
          { title: "Total Revenue", value: "₹1,24,000", desc: "Monthly Recurring Revenue" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground flex items-center justify-center h-48 border border-dashed border-border rounded-lg">
              [Recent Leads Table Loading...]
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Package Interest</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground flex items-center justify-center h-48 border border-dashed border-border rounded-lg">
              [Package Distribution Chart]
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
