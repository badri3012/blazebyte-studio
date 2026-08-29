import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/30 pt-20">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:block">
        <div className="p-6">
          <h2 className="font-heading font-bold text-lg mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <Link href="/admin" className="block px-4 py-2 rounded-md hover:bg-muted text-sm font-medium transition-colors">Dashboard</Link>
            <Link href="/admin/leads" className="block px-4 py-2 rounded-md hover:bg-muted text-sm font-medium transition-colors">Leads</Link>
            <Link href="/admin/packages" className="block px-4 py-2 rounded-md hover:bg-muted text-sm font-medium transition-colors">Packages</Link>
            <Link href="/admin/case-studies" className="block px-4 py-2 rounded-md hover:bg-muted text-sm font-medium transition-colors">Case Studies</Link>
            <Link href="/admin/settings" className="block px-4 py-2 rounded-md hover:bg-muted text-sm font-medium transition-colors">Settings</Link>
          </nav>
        </div>
        <div className="p-6 border-t border-border mt-auto">
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950">
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
