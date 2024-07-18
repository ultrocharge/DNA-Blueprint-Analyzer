import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GeneticNamePlate",
  description: "generate genetic data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-blue-50 dark:bg-gray-900">
        <Provider>
          <main>
            <ThemeSwitcher />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}


