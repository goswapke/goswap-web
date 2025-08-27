// lib/mock.ts
export type City = "Nairobi" | "Mombasa" | "Kisumu";
export type PickupType = "SGR" | "Airport" | "City Center";
export type DriveMode = "Self-drive" | "Chauffeured";

export type Vehicle = {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  city: City;
  pickup: PickupType[];
  modes: DriveMode[];
  priceSelf: number;
  priceChauffeured: number;
  image: string;
  description: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    title: "Toyota Axio",
    make: "Toyota",
    model: "Axio",
    year: 2017,
    city: "Nairobi",
    pickup: ["Airport", "City Center"],
    modes: ["Self-drive", "Chauffeured"],
    priceSelf: 4500,
    priceChauffeured: 7000,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400",
    description: "Reliable compact sedan, perfect for city trips."
  },
  {
    id: "v2",
    title: "Mazda Demio",
    make: "Mazda",
    model: "Demio",
    year: 2016,
    city: "Mombasa",
    pickup: ["SGR", "City Center"],
    modes: ["Self-drive"],
    priceSelf: 3800,
    priceChauffeured: 0,
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1400",
    description: "Economical hatchback, great for coastal drives."
  },
  {
    id: "v3",
    title: "Toyota Noah (7-seater)",
    make: "Toyota",
    model: "Noah",
    year: 2018,
    city: "Kisumu",
    pickup: ["Airport", "City Center"],
    modes: ["Chauffeured"],
    priceSelf: 0,
    priceChauffeured: 10000,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400",
    description: "Spacious van ideal for groups; driver included."
  }
];
