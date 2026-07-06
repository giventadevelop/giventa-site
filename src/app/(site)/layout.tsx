import type { Metadata } from 'next';
import { auth, currentUser } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import GlobexStaticAssets from '@/components/globex/GlobexStaticAssets';
import GlobexHeader from '@/components/globex/GlobexHeader';
import GlobexFooter from '@/components/globex/GlobexFooter';
import GlobexPreloaderDismiss from '@/components/globex/GlobexPreloaderDismiss';
import GlobexMenuSync from '@/components/globex/GlobexMenuSync';
import GlobexInfoSidebar from '@/components/globex/GlobexInfoSidebar';
import { fetchAdminProfileServer } from '@/app/admin/manage-usage/ApiServerActions';
import { resolveIsTenantAdmin } from '@/lib/resolveTenantAdminStatus';
import { isAdminRole } from '@/lib/utils';
import '@/styles/globex-shell.css';

export const metadata: Metadata = {
  title: 'Giventa — IT Solutions',
  description: 'Giventa provides best-in-class IT solutions and consulting services.',
};

async function resolveSiteTenantAdmin(): Promise<boolean> {
  try {
    const headersList = await headers();
    if (headersList.get('x-clerk-syncing') === 'true') {
      return false;
    }

    const { userId } = await auth();
    if (!userId) return false;

    const profile = await fetchAdminProfileServer(userId);
    if (isAdminRole(profile?.userRole)) {
      return true;
    }

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress ?? null;
    return resolveIsTenantAdmin(userId, email);
  } catch {
    return false;
  }
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isTenantAdmin = await resolveSiteTenantAdmin();

  return (
    <div className="globex-layout">
      <GlobexStaticAssets />
      <div className="page-wrapper">
        <div className="preloader" />
        <GlobexPreloaderDismiss />
        <GlobexMenuSync />
        <GlobexHeader isTenantAdmin={isTenantAdmin} />
        <GlobexInfoSidebar />
        <main className="globex-main">{children}</main>
        <GlobexFooter />
      </div>
    </div>
  );
}
