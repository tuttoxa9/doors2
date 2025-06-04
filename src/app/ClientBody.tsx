"use client";

import { useEffect } from "react";
import { CartProvider } from "@/hooks/useCart";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <CartProvider>
      <div className="antialiased">{children}</div>
    </CartProvider>
  );
}
