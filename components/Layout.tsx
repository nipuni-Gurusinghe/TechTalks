// components/Layout.tsx
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import React from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export default function Layout({
  children,
  title = "TechTalks - Modern Insights",
  description = "A platform for modern tech discussions and articles.",
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Page container */}
      <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100 dark:bg-slate-900 dark:text-gray-100">
        
        {/* Global Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
}
