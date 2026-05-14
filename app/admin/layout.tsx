import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { SessionProvider } from "./SessionProvider";

export const metadata: Metadata = {
  title: "Admin — Party Yacht Goa",
  description: "Party Yacht Goa Admin Dashboard",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Only attempt session fetch when DB is configured
  let session = null;
  if (process.env.DATABASE_URL) {
    try {
      const { getServerSession } = await import("next-auth");
      const { authOptions } = await import("@/lib/auth");
      session = await getServerSession(authOptions);
      if (!session) {
        const { redirect } = await import("next/navigation");
        redirect("/login");
      }
    } catch {
      // DB not available — allow access in dev mode
    }
  }

  return (
    <SessionProvider session={session}>
      <div className="flex h-screen overflow-hidden" style={{ background: "#08080f", color: "#ffffff" }}>
        <AdminSidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
