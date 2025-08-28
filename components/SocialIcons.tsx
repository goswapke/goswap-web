// components/SocialIcons.tsx
"use client";

import React from "react";

const links = {
  facebook: "https://facebook.com/goswapke",          // ← update if needed
  instagram: "https://instagram.com/goswapke",        // ← update if needed
  whatsapp: "https://wa.me/254700000000?text=Hi%20GoSwap%20team!", // ← put your WhatsApp number
};

const base =
  "inline-flex items-center justify-center h-10 w-10 rounded-full border border-[hsl(var(--border))] bg-white hover:bg-[hsl(var(--brand)/0.06)] transition";

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-3">
      {/* Facebook */}
      <a
        className={base}
        href={links.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GoSwap on Facebook"
        title="Facebook"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M22 12.06C22 6.55 17.52 2.06 12 2.06S2 6.55 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.86h2.78l-.44 2.91h-2.34V22c4.78-.81 8.44-4.95 8.44-9.94Z"
            fill="currentColor"
          />
        </svg>
      </a>

      {/* Instagram */}
      <a
        className={base}
        href={links.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GoSwap on Instagram"
        title="Instagram"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        className={base}
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20.52 3.48A11.5 11.5 0 0 0 3.5 20.5l-1.1 3.9 4-1.05A11.5 11.5 0 1 0 20.52 3.48Zm-8.51 18.03a9.1 9.1 0 0 1-4.64-1.27l-.33-.2-2.38.63.64-2.32-.21-.34a9.09 9.09 0 1 1 7.56 3.5Zm5.26-6.84c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.65.15-.19.29-.75.94-.92 1.13-.17.19-.34.21-.63.08-.29-.15-1.21-.45-2.31-1.42-.85-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.06-.36-.02-.51-.08-.15-.65-1.57-.89-2.15-.23-.56-.46-.49-.65-.5l-.56-.01c-.19 0-.5.07-.77.36-.26.29-1 1-1 2.41s1.02 2.78 1.16 2.97c.15.19 2.01 3.07 4.86 4.3.68.29 1.21.46 1.63.59.68.21 1.31.18 1.8.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.06-.13-.26-.2-.55-.35Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}
