import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "출근한입",
    template: "%s | 출근한입",
  },
  description: "IT 뉴스를 짧게 요약해 보는 블로그, 출근한입",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-zinc-200 py-6 text-center text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
            © {new Date().getFullYear()} 출근한입 · 짧은 IT 뉴스
          </footer>
        </Providers>
      </body>
    </html>
  );
}
