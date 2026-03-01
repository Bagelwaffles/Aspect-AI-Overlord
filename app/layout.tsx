import "./globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        <Script
          id="hubspot-script"
          strategy="afterInteractive"
          src="https://js-na2.hs-scripts.com/245396651.js"
        />
      </body>
    </html>
  );
}
