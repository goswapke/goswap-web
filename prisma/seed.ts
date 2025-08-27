// prisma/seed.ts
import { prisma } from "../lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  // --- Seed a test user (for login) ---
  const email = "admin@goswap.co.ke";
  const passwordPlain = "goswap123"; // change later in production
  const passwordHash = await hash(passwordPlain, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: passwordHash,
      name: "GoSwap Admin",
      role: "admin",
    },
  });

  // --- Seed vehicles (swap) ---
  const vehicles = [
    {
      make: "Toyota", model: "RAV4", year: 2019, fuelType: "Petrol", transmission: "Automatic",
      locationCity: "Nairobi",
      imageUrl: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a",
      description: "Clean SUV, ideal for city and weekend trips.",
      listingType: "SWAP" as const
    },
    {
      make: "Mazda", model: "CX-5", year: 2020, fuelType: "Petrol", transmission: "Automatic",
      locationCity: "Mombasa",
      imageUrl: "https://images.unsplash.com/photo-1549921296-3b4a3d4b8b36",
      description: "Comfortable coastal cruiser, well maintained.",
      listingType: "SWAP" as const
    },
    {
      make: "Subaru", model: "Forester", year: 2018, fuelType: "Petrol", transmission: "Automatic",
      locationCity: "Kisumu",
      imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820f36e55",
      description: "All-wheel drive, great for trips around the lake.",
      listingType: "SWAP" as const
    },
    {
      make: "Nissan", model: "X-Trail", year: 2017, fuelType: "Diesel", transmission: "Automatic",
      locationCity: "Nairobi",
      imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4f1a5b4f9c",
      description: "Spacious family SUV with good ground clearance.",
      listingType: "SWAP" as const
    },
    {
      make: "Honda", model: "CR-V", year: 2019, fuelType: "Petrol", transmission: "Automatic",
      locationCity: "Mombasa",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      description: "Reliable and efficient; perfect for coastal drives.",
      listingType: "SWAP" as const
    }
  ];

  for (const v of vehicles) {
    const id = `${v.make}_${v.model}_${v.year}_${v.locationCity}`.toLowerCase().replace(/\s+/g, "-");
    await prisma.vehicle.upsert({
      where: { id },
      update: v,
      create: { ...v, id },
    });
  }

  return "✅ Seeded 1 user and swap vehicles";
}

export default main;

if (require.main === module) {
  main()
    .then(msg => { console.log(msg); process.exit(0); })
    .catch(err => { console.error(err); process.exit(1); });
}
