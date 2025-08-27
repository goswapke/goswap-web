// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const vehicles = [
    {
      make: "Toyota", model: "RAV4", year: 2019, fuelType: "Petrol", transmission: "Automatic",
      locationCity: "Nairobi",
      imageUrl: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a",
      description: "Clean SUV, ideal for city and weekend trips."
    },
    {
      make: "Mazda", model: "CX-5", year: 2020, fuelType: "Petrol", transmission: "Automatic",
      locationCity: "Mombasa",
      imageUrl: "https://images.unsplash.com/photo-1549921296-3b4a3d4b8b36",
      description: "Comfortable coastal cruiser, well maintained."
    },
    {
      make: "Subaru", model: "Forester", year: 2018, fuelType: "Petrol", transmission: "Automatic",
      locationCity: "Kisumu",
      imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820f36e55",
      description: "All-wheel drive, great for trips around the lake."
    },
    {
      make: "Nissan", model: "X-Trail", year: 2017, fuelType: "Diesel", transmission: "Automatic",
      locationCity: "Nairobi",
      imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4f1a5b4f9c",
      description: "Spacious family SUV with good ground clearance."
    },
    {
      make: "Honda", model: "CR-V", year: 2019, fuelType: "Petrol", transmission: "Automatic",
      locationCity: "Mombasa",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      description: "Reliable and efficient; perfect for coastal drives."
    }
  ];

  for (const v of vehicles) {
    await prisma.vehicle.upsert({
      where: { id: `${v.make}_${v.model}_${v.year}_${v.locationCity}`.toLowerCase().replace(/\s+/g, "-") },
      update: v,
      create: {
        ...v,
        id: `${v.make}_${v.model}_${v.year}_${v.locationCity}`.toLowerCase().replace(/\s+/g, "-"),
        listingType: "SWAP"
      },
    });
  }

  console.log("✅ Seeded swap vehicles");
}

main().finally(() => prisma.$disconnect());
