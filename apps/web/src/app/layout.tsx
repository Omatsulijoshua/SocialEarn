import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SocialEarn — Engage. Earn. Grow.',
  description: 'The premier social task, engagement, and rewards marketplace. Turn social activity into verified rewards.',
  keywords: ['SocialEarn', 'Social Tasks', 'Rewards Marketplace', 'Earn Points', 'Social Engagement', 'Verified Tasks'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080c14] text-slate-100 antialiased selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
