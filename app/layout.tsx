import type { Metadata } from "next";
import "../styles/globals.css";
import { DemoProvider } from "./providers/DemoProvider";
import { PageTransition } from "./components/PageTransition";

export const metadata: Metadata = {
  title: "Clearwater Ridge Care Coordinator Demo",
  description: "Demo MVP for shared care coordination status tracking"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DemoProvider>
          <div className="min-h-screen bg-slate-50">
            <div className="main-gradient min-h-screen">
              <main className="mx-auto max-w-6xl px-6 py-10">
                <PageTransition>{children}</PageTransition>
              </main>
            </div>
          </div>
        </DemoProvider>
      </body>
    </html>
  );
}
