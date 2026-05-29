import Script from "next/script";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/chat/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="lazyOnload"
      />
      <Suspense fallback={<div className="flex h-dvh bg-sidebar" />}>
        <div className="flex h-dvh">
          <AppSidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Toaster
              position="top-center"
              toastOptions={{
                className: "!bg-card !text-foreground !border-2 !border-black !shadow-md",
              }}
            />
            {children}
          </div>
        </div>
      </Suspense>
    </>
  );
}
