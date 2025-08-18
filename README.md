# GoSwap Web (Next.js 14 + Prisma + NextAuth)
MVP with success-page Pesapal confirmation (no IPN yet) and admin “Mark Paid”.

## Setup
1) Add env vars (see `.env.example`)
2) `npx prisma db push` (Vercel will run this via Build Command)
3) Deploy to Vercel with Build Command: `npx prisma db push && next build`

## Pages
/ — home • /auth/signin • /auth/signup • /success • /cancel • /admin
API: /api/pesapal/order • /api/pesapal/status
