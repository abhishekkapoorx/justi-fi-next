"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export function ConditionalFooterWrapper() {
  const pathname = usePathname();
  
  // Hide footer for dashboard routes
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }
  
  return <Footer />;
}
