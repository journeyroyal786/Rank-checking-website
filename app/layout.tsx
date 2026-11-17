import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'RankPilot — SEO Intelligence', description:'Website traffic estimates, keyword research and competitor intelligence.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
