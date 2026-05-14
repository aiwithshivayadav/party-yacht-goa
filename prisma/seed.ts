// prisma/seed.ts — Run with: npm run db:seed
// Populates the DB with initial data from static data file

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌊 Seeding Party Yacht Goa database...");

  // ─── Create Admin User ───────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || "admin@partyyachtgoa.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "9956260744";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Super Admin",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });
  console.log(`✓ Admin user: ${admin.email}`);

  // ─── Create Staff Members ────────────────────────────────────
  const staff = [
    { email: "sneha@partyyachtgoa.com", name: "Sneha Desai", role: "SALES" as const },
    { email: "anil@partyyachtgoa.com", name: "Anil Sharma", role: "SALES" as const },
    { email: "priya@partyyachtgoa.com", name: "Priya Nair", role: "OPERATIONS" as const },
    { email: "rahul@partyyachtgoa.com", name: "Rahul Menon", role: "ACCOUNTANT" as const },
  ];

  for (const s of staff) {
    await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: {
        email: s.email,
        name: s.name,
        password: hashedPassword,
        role: s.role,
        isActive: true,
      },
    });
    console.log(`✓ Staff: ${s.name}`);
  }

  // ─── Seed Yachts ─────────────────────────────────────────────
  const YACHTS_DATA = [
    { slug: "sunset-42", name: "Sunset 42", tagline: "The King of Goa's Waters", capacity: 40, length: "42 ft", priceFrom: 25000, badge: "Most Popular", badgeColor: "#c9a96e", images: 36 },
    { slug: "orca", name: "Orca", tagline: "Power Meets Elegance", capacity: 30, length: "38 ft", priceFrom: 20000, badge: "Best for DJ Nights", badgeColor: "#6366f1", images: 23 },
    { slug: "polaris", name: "Polaris", tagline: "Navigate in Style", capacity: 25, length: "36 ft", priceFrom: 18000, images: 23 },
    { slug: "prestige-36", name: "Prestige 36", tagline: "Intimacy on the Arabian Sea", capacity: 20, length: "36 ft", priceFrom: 22000, images: 19 },
    { slug: "malini", name: "Malini", tagline: "Goa's Premier Party Catamaran", capacity: 60, length: "52 ft", priceFrom: 35000, badge: "Largest Deck", badgeColor: "#22d3ee", images: 19 },
    { slug: "mv-krishna", name: "MV Krishna", tagline: "Corporate & Group Luxury", capacity: 80, length: "65 ft", priceFrom: 45000, badge: "Corporate", badgeColor: "#a855f7", images: 9 },
    { slug: "shantam", name: "Shantam", tagline: "Calm Waters, Calm Soul", capacity: 20, length: "34 ft", priceFrom: 15000, images: 12 },
    { slug: "blue-fin", name: "Blue Fin", tagline: "Speed and Style", capacity: 15, length: "32 ft", priceFrom: 14000, images: 11 },
    { slug: "fun-liner", name: "Fun Liner", tagline: "All Fun, All Day", capacity: 50, length: "48 ft", priceFrom: 30000, images: 10 },
    { slug: "manta-ray", name: "Manta Ray", tagline: "Glide Through the Arabian Sea", capacity: 12, length: "30 ft", priceFrom: 12000, images: 7 },
    { slug: "sea-ray", name: "Sea Ray", tagline: "Pure. Fast. Luxurious.", capacity: 8, length: "28 ft", priceFrom: 18000, badge: "Most Exclusive", badgeColor: "#c9a96e", images: 4 },
  ];

  for (const y of YACHTS_DATA) {
    const yacht = await prisma.yacht.upsert({
      where: { slug: y.slug },
      update: {},
      create: {
        slug: y.slug,
        name: y.name,
        tagline: y.tagline,
        capacity: y.capacity,
        length: y.length,
        priceFrom: y.priceFrom,
        priceUnit: "per trip",
        badge: y.badge,
        badgeColor: y.badgeColor,
        isActive: true,
        images: {
          create: Array.from({ length: Math.min(y.images, 5) }, (_, i) => ({
            url: `/yachts/${y.slug}/${y.slug}-${i + 1}.jpeg`,
            order: i,
            isCover: i === 0,
          })),
        },
        pricing: {
          create: [
            { duration: "2hr", label: "2 Hours", price: y.priceFrom },
            { duration: "3hr", label: "3 Hours", price: Math.round(y.priceFrom * 1.4) },
            { duration: "halfday", label: "Half Day", price: Math.round(y.priceFrom * 2.2) },
            { duration: "fullday", label: "Full Day", price: Math.round(y.priceFrom * 3.5) },
          ],
        },
      },
    });
    console.log(`✓ Yacht: ${yacht.name}`);
  }

  // ─── Default Settings ────────────────────────────────────────
  const defaultSettings = [
    { key: "site_name", value: "Party Yacht Goa", group: "general" },
    { key: "site_url", value: "https://partyyachtgoa.com", group: "general" },
    { key: "whatsapp_number", value: "918960070105", group: "general" },
    { key: "currency", value: "INR", group: "general" },
    { key: "timezone", value: "Asia/Kolkata", group: "general" },
    { key: "booking_advance_payment_pct", value: "50", group: "payments" },
    { key: "auto_confirmation_email", value: "true", group: "email" },
    { key: "auto_whatsapp_confirmation", value: "true", group: "whatsapp" },
  ];

  for (const s of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: { key: s.key, value: s.value, group: s.group, label: s.key.replace(/_/g, " ") },
    });
  }
  console.log(`✓ Default settings created`);

  console.log("\n🎉 Seed complete! Party Yacht Goa is ready.");
  console.log(`\n📧 Admin login: ${adminEmail}`);
  console.log(`🔑 Password: ${adminPassword}`);
  console.log("\n⚠️  IMPORTANT: Change the admin password after first login!\n");
}

main()
  .catch((e) => { console.error("Seed failed:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
