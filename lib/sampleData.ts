export type Vehicle = {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  city: "NAIROBI" | "MOMBASA" | "KISUMU";
  pickupType: "SGR" | "AIRPORT" | "CITY_CENTER";
  category: "LEASE" | "SWAP";
  selfDrivePerDay?: number;
  chauffeuredPerDay?: number;
  description?: string;
  plateMasked?: string;
};

export const vehicles: Vehicle[] = [
  { id: "v1", title: "Mazda Demio", make: "Mazda", model: "Demio", year: 2015, city: "NAIROBI", pickupType: "AIRPORT", category: "LEASE", selfDrivePerDay: 3500, chauffeuredPerDay: 5500, description: "Compact, fuel efficient." },
  { id: "v2", title: "Toyota Axio", make: "Toyota", model: "Axio", year: 2016, city: "MOMBASA", pickupType: "SGR", category: "LEASE", selfDrivePerDay: 4500, chauffeuredPerDay: 6500, description: "Comfortable sedan." },
  { id: "v3", title: "Subaru Forester", make: "Subaru", model: "Forester", year: 2014, city: "KISUMU", pickupType: "CITY_CENTER", category: "LEASE", selfDrivePerDay: 6500, chauffeuredPerDay: 8500, description: "Spacious SUV." },
  { id: "s1", title: "Nissan Note (Swap)", make: "Nissan", model: "Note", year: 2013, city: "NAIROBI", pickupType: "AIRPORT", category: "SWAP", plateMasked: "K** 3**X", description: "City runabout, swap preferred with Mombasa." },
  { id: "s2", title: "Toyota Ractis (Swap)", make: "Toyota", model: "Ractis", year: 2012, city: "MOMBASA", pickupType: "CITY_CENTER", category: "SWAP", plateMasked: "K** 7**C", description: "Looking to swap with Nairobi." },
  { id: "s3", title: "Honda Fit (Swap)", make: "Honda", model: "Fit", year: 2015, city: "KISUMU", pickupType: "SGR", category: "SWAP", plateMasked: "K** 1**Q", description: "Swap corridor Kisumu ↔ Nairobi." }
];
