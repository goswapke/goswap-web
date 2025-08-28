// prisma/seed.ts
import { PrismaClient, Role, ListingType, Prisma } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Stable ID helper: create a readable deterministic id for vehicles so
 * re-running seeds won't duplicate rows.
 */
function vehicleIdSlug(v: {
  make: string;
  model: string;
  year: number;
  locationCity: string;
}) {
  return `${v.make}-${v.model}-${v.year}-${v.locationCity}`
    .toLowerCase()
    .replace(/\s+/g, "-");
}

async function main() {
  console.log("🌱 Seeding GoSwap…");

  // Admin credentials (override in Vercel env if you want stronger defaults)
  const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@goswap.ke";
  const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "ChangeMeNow!123";

  // Demo users
  const PARTNER_EMAIL = process.env.SEED_PARTNER_EMAIL || "partner@goswap.ke";
  const PARTNER_PASSWORD =
    process.env.SEED_PARTNER_PASSWORD || "PartnerPass!123";

  const TRAVELLER_EMAIL =
    process.env.SEED_TRAVELLER_EMAIL || "traveller@goswap.ke";
  const TRAVELLER_PASSWORD =
    process.env.SEED_TRAVELLER_PASSWORD || "TravellerPass!123";

  // 1) Admin user
  const adminPasswordHash = await hash(ADMIN_PASSWORD, 10);
  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      role: Role.ADMIN,
    },
    create: {
      email: ADMIN_EMAIL,
      password: adminPasswordHash,
      name: "GoSwap Admin",
      role: Role.ADMIN,
    },
  });
  console.log("✔️ Admin:", admin.email);

  // 2) Partner user + PartnerProfile (private payout config)
  const partnerPasswordHash = await hash(PARTNER_PASSWORD, 10);
  const partner = await prisma.user.upsert({
    where: { email: PARTNER_EMAIL },
    update: {
      role: Role.PARTNER,
    },
    create: {
      email: PARTNER_EMAIL,
      password: partnerPasswordHash,
      name: "Seed Partner",
      role: Role.PARTNER,
    },
  });

  // Ensure PartnerProfile exists/updated
  await prisma.partnerProfile.upsert({
    where: { userId: partner.id },
    update: {
      businessName: "Seed Partner Ltd",
      payoutMethod: "M-PESA",
      mpesaNumber: "0700000000",
      commissionPct: new Prisma.Decimal("0.12"), // 12%
      status: "APPROVED",
    },
    create: {
      userId: partner.id,
      businessName: "Seed Partner Ltd",
      payoutMethod: "M-PESA",
      mpesaNumber: "0700000000",
      commissionPct: new Prisma.Decimal("0.12"),
      status: "APPROVED",
    },
  });
  console.log("✔️ Partner:", partner.email);

  // 3) Traveller user
  const travellerPasswordHash = await hash(TRAVELLER_PASSWORD, 10);
  const traveller = await prisma.user.upsert({
    where: { email: TRAVELLER_EMAIL },
    update: {
      role: Role.TRAVELLER,
    },
    create: {
      email: TRAVELLER_EMAIL,
      password: travellerPasswordHash,
      name: "Seed Traveller",
      role: Role.TRAVELLER,
    },
  });
  console.log("✔️ Traveller:", traveller.email);

  // 4) Vehicles for the partner (APPROVED)
  const vehicles = [
    {
      listingType: ListingType.SWAP,
      make: "Toyota",
      model: "RAV4",
      year: 2019,
      locationCity: "Nairobi",
      description: "Clean, well-maintained compact SUV. Great for city and trips.",
      imageUrl:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop",
      fuelType: "Petrol",
      transmission: "Automatic",
      status: "APPROVED",
    },
    {
      listingType: ListingType.LEASE,
      make: "Mazda",
      model: "CX-5",
      year: 2020,
      locationCity: "Mombasa",
      description: "Comfortable ride with excellent fuel economy.",
      imageUrl:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop",
      fuelType: "Diesel",
      transmission: "Automatic",
      status: "APPROVED",
    },
    {
      listingType: ListingType.SWAP,
      make: "Subaru",
      model: "Forester",
      year: 2018,
      locationCity: "Kisumu",
      description: "AWD, roomy and reliable. Ideal for weekend getaways.",
      imageUrl:
        "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1600&auto=format&fit=crop",
      fuelType: "Petrol",
      transmission: "Automatic",
      status: "APPROVED",
    },
    {
      listingType: ListingType.LEASE,
      make: "Toyota",
      model: "Probox",
      year: 2017,
      locationCity: "Nairobi",
      description: "Workhorse for errands. Practical and economical.",
      imageUrl:
        "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1600&auto=format&fit=crop",
      fuelType: "Petrol",
      transmission: "Manual",
      status: "APPROVED",
    },
    {
      listingType: ListingType.SWAP,
      make: "Nissan",
      model: "X-Trail",
      year: 2019,
      locationCity: "Nakuru",
      description: "Comfortable family SUV with ample cargo space.",
      imageUrl:
        "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=1600&auto=format&fit=crop",
      fuelType: "Petrol",
      transmission: "Automatic",
      status: "APPROVED",
    },
  ] as const;

  for (const v of vehicles) {
    const id = vehicleIdSlug({
      make: v.make,
      model: v.model,
      year: v.year,
      locationCity: v.locationCity,
    });

    await prisma.vehicle.upsert({
      where: { id },
      update: {
        partnerId: partner.id,
        listingType: v.listingType,
        make: v.make,
        model: v.model,
        year: v.year,
        locationCity: v.locationCity,
        description: v.description,
        imageUrl: v.imageUrl,
        fuelType: v.fuelType,
        transmission: v.transmission,
        status: v.status,
      },
      create: {
        id, // stable id so re-seeding won't duplicate
        partnerId: partner.id,
        listingType: v.listingType,
        make: v.make,
        model: v.model,
        year: v.year,
        locationCity: v.locationCity,
        description: v.description,
        imageUrl: v.imageUrl,
        fuelType: v.fuelType,
        transmission: v.transmission,
        status: v.status,
      },
    });
  }
  console.log(`✔️ Vehicles: ${vehicles.length} seeded/updated`);

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
