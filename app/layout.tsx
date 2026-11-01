import Link from "next/link";
import "./globals.css";
import NavLink from "@/components/NavLink";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="8crlmrb26yW3LhxletyOlmCPcF-9r-YugV3kMfuHUsY" />
      </head>
      <body>
        <div className="min-h-screen bg-black text-zinc-300">
          <header className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-sm z-50">

            <div className="max-w-2xl mx-auto px-8 py-4">
              
              <nav className="flex items-center justify-between gap-12 text-zinc-400 text-sm">

                <div className="flex gap-6"> 
                  <NavLink href="/" className="text-zinc-100 hover:text-white transition-colors">
                    Junhyeok Kim
                  </NavLink>
                  <NavLink href="/work" className="hover:text-white transition-colors">
                    Work
                  </NavLink>
                  <NavLink href="/publications" className="hover:text-white transition-colors">
                    Publications
                  </NavLink>
                  <NavLink href="/cv" className="hover:text-white transition-colors">
                    CV
                  </NavLink>
                </div>

                <div className="flex gap-4 text-zinc-500">
                  <a
                    href="mailto:visual713@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    Email
                  </a>

                  <a
                    href="https://www.linkedin.com/in/junhyeok-kim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </nav>
            </div>
          </header>

          <main className="max-w-2xl mx-auto px-8 py-30 pb-[30vh]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}