import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={GeistSans.className}>
      <body className="bg-slate-100">
        <main className="min-h-screen mx-auto p-5 bg-white max-w-md w-full flex flex-col items-center">
          <Link href="/" className="font-bold text-4xl mb-14">
            Notes
          </Link>

          {children}
        </main>
      </body>
    </html>
  );
}
