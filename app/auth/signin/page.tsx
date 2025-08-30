// app/auth/signin/page.tsx
"use client";

import { Suspense } from "react";
import SignInInner from "./signin-inner";

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <main className="page-wrap">
          <section className="max-w-md mx-auto card p-6 md:p-8">Loading…</section>
        </main>
      }
    >
      <SignInInner />
    </Suspense>
  );
}
