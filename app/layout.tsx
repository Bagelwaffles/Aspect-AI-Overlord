// app/layout.tsx
import "./globals.css";
import Script from "next/script";
import Link from "next/link";

export const metadata = {
  title: "Aspect Marketing Solutions",
  description: "AI Agent Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        {/* Top Nav */}
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white font-semibold">
                A
              </span>
              <div className="leading-tight">
                <div className="font-semibold">Aspect</div>
                <div className="text-xs text-zinc-500">AI Agent Platform</div>
              </div>
            </Link>

            <nav className="flex items-center gap-2">
              <Link
                href="/agents"
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                Agents
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </header>

        {/* Page */}
        <main className="mx-auto w-full max-w-6xl px-4 py-10">
          {children}
        </main>

        {/* HubSpot tracking */}
        <Script
          id="hubspot-script"
          strategy="afterInteractive"
          src="https://js-na2.hs-scripts.com/245396651.js"
        />
      </body>
    </html>
  );
}
