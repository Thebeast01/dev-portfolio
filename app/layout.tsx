import type { Metadata } from "next";
import { Inter, Rubik_Distressed } from "next/font/google";
import "./globals.css";
import { Provider } from "./theme-provider";
import { Navbar } from "@/components/navbar";
import { FloatingDock } from "@/components/floating-dock";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});
const rubik = Rubik_Distressed({
  variable: "--font-rubik",
  subsets: ['latin'],
  weight: "400"
})

export const metadata: Metadata = {
  title: "Mohammad Saif",
  description: "I'm Mohammad Saif, a full-stack engineer passionate about building fast, scalable and user-focused digital products. I specialize in JavaScript and TypeScript ecosystems, delivering end-to-end solutions across web and mobile platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body
        className={`${inter.variable} ${rubik.variable} antialiased`}

      >
        <Provider>
          <main className="h-screen w-screen max-w-screen overflow-x-hidden flex scrollbar-hide justify-center bg-white font-sans dark:bg-background "
          >
            <div className="flex relative flex-col h-screen items-center max-w-6xl w-full py-8 overflow-x-hidden ">
              <Navbar />
              {children}
              <FloatingDock />
            </div>
          </main>
        </Provider>
      </body>
    </html>
  );
}
