import type { Metadata } from 'next';
import GlobexStaticAssets from '@/components/globex/GlobexStaticAssets';
import GlobexHeader from '@/components/globex/GlobexHeader';
import GlobexFooter from '@/components/globex/GlobexFooter';
import GlobexPreloaderDismiss from '@/components/globex/GlobexPreloaderDismiss';
import GlobexInfoSidebar from '@/components/globex/GlobexInfoSidebar';
import GlobexSearchPopup from '@/components/globex/GlobexSearchPopup';
import '@/styles/globex-shell.css';

export const metadata: Metadata = {
  title: 'Giventa — IT Solutions',
  description: 'Giventa provides best-in-class IT solutions and consulting services.',
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="globex-layout">
      <GlobexStaticAssets />
      <div className="page-wrapper">
        <div className="preloader" />
        <GlobexPreloaderDismiss />
        <GlobexHeader />
        <GlobexInfoSidebar />
        <GlobexSearchPopup />
        <main className="globex-main">{children}</main>
        <GlobexFooter />
      </div>
    </div>
  );
}
