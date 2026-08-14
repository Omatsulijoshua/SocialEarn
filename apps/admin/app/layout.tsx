import './globals.css';
import type { Metadata } from 'next';
import { AdminLayoutWrapper } from '@/components/AdminLayoutWrapper';

export const metadata: Metadata = {
  title: 'SocialEarn Admin Portal — Enterprise Operations Console',
  description: 'Production operations dashboard for SocialEarn tasks, campaigns, verification, fraud prevention, and financial management.',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0f172a] text-slate-100 antialiased selection:bg-purple-500 selection:text-white">
        <AdminLayoutWrapper>
          {children}
        </AdminLayoutWrapper>
      </body>
    </html>
  );
}
