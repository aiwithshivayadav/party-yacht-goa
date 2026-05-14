// ─── Shared data for all pages ───────────────────────────────────────────────

export const WHATSAPP_NUMBER = "918960070105";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
export const PHONE_DISPLAY = "+91 89600 70105";
export const EMAIL = "hello@partyyachtgoa.com";
export const ADDRESS = "Panaji Marina, Goa — 403001, India";
export const SITE_NAME = "Party Yacht Goa";

export function waLink(msg: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;
}

// ─── Yacht Data ───────────────────────────────────────────────────────────────

export type Yacht = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  capacity: number;
  length: string;
  priceFrom: number;
  priceUnit: string;
  category: string[];
  occasion: string[];
  images: number;
  features: string[];
  specs: { label: string; value: string }[];
  rating: number;
  reviews: number;
  badge: string;
  badgeColor: string;
  highlight: boolean;
};

export const YACHTS: Yacht[] = [
  {
    slug: "sunset-42",
    name: "Sunset 42",
    tagline: "The Ultimate Party Vessel",
    description:
      "The Sunset 42 is Goa's most sought-after party yacht. With a 42-foot deck, powerful DJ system, full LED lighting rig, and a dance floor built for the ocean, this vessel transforms every voyage into a legendary celebration. Ideal for large groups who want to experience Goa nightlife at its most electric — from the middle of the Arabian Sea.",
    capacity: 50,
    length: "42 ft",
    priceFrom: 25000,
    priceUnit: "per cruise",
    category: ["party", "large", "dj"],
    occasion: ["bachelor", "birthday", "corporate", "dj", "fireworks"],
    images: 36,
    features: [
      "Professional DJ System",
      "Full LED Light Rig",
      "Dance Floor",
      "Bar Counter & Setup",
      "Life Jackets",
      "Bluetooth Audio",
      "Cooler & Ice Service",
      "Seating for 50",
      "Canopy Shade Area",
      "Safety Equipment",
    ],
    specs: [
      { label: "Length", value: "42 ft" },
      { label: "Capacity", value: "Up to 50 guests" },
      { label: "Type", value: "Party Yacht" },
      { label: "Cruising Speed", value: "12 knots" },
      { label: "Departure", value: "Panaji / Baga" },
      { label: "Duration", value: "2–4 hours" },
    ],
    rating: 4.9,
    reviews: 87,
    badge: "Most Popular",
    badgeColor: "#c9a96e",
    highlight: true,
  },
  {
    slug: "mv-krishna",
    name: "MV Krishna",
    tagline: "Majestic on the Mandovi",
    description:
      "MV Krishna is a flagship vessel built for grand occasions. With capacity for 40 guests, a dedicated stage area, and premium sound system, this is the yacht of choice for corporate events, large birthday parties, and high-energy DJ nights. Its commanding presence on the water makes every voyage feel like a VIP affair.",
    capacity: 40,
    length: "45 ft",
    priceFrom: 22000,
    priceUnit: "per cruise",
    category: ["large", "party", "corporate"],
    occasion: ["corporate", "birthday", "bachelor", "dj"],
    images: 9,
    features: [
      "Stage Area",
      "Premium Sound System",
      "Bar Counter",
      "Large Deck Space",
      "LED Lighting",
      "Corporate Setup Available",
      "Projector On Request",
      "Safety Crew",
    ],
    specs: [
      { label: "Length", value: "45 ft" },
      { label: "Capacity", value: "Up to 40 guests" },
      { label: "Type", value: "Event Vessel" },
      { label: "Departure", value: "Panaji Marina" },
      { label: "Duration", value: "2–5 hours" },
    ],
    rating: 4.8,
    reviews: 31,
    badge: "Corporate Choice",
    badgeColor: "#0ea5e9",
    highlight: false,
  },
  {
    slug: "orca",
    name: "Orca",
    tagline: "Power Meets Elegance",
    description:
      "The Orca is a sleek, powerful yacht that balances luxury and energy. With a spacious sun deck, premium sound, and a full bar setup, it's equally suited to intimate corporate gatherings and spirited celebrations. The Orca's bold lines and smooth glide make every Goa sunset cruise feel cinematic.",
    capacity: 30,
    length: "40 ft",
    priceFrom: 20000,
    priceUnit: "per cruise",
    category: ["luxury", "large"],
    occasion: ["corporate", "birthday", "sunset", "bachelor"],
    images: 23,
    features: [
      "Sun Deck",
      "Premium Sound System",
      "Bar Counter",
      "Canopy Shade",
      "Comfortable Seating",
      "LED Accent Lighting",
      "Safety Equipment",
    ],
    specs: [
      { label: "Length", value: "40 ft" },
      { label: "Capacity", value: "Up to 30 guests" },
      { label: "Type", value: "Luxury Cruiser" },
      { label: "Departure", value: "Panaji / Calangute" },
      { label: "Duration", value: "2–4 hours" },
    ],
    rating: 4.8,
    reviews: 63,
    badge: "Top Rated",
    badgeColor: "#3b82f6",
    highlight: true,
  },
  {
    slug: "polaris",
    name: "Polaris",
    tagline: "Navigate in Style",
    description:
      "Polaris is a premium 40-foot cruiser with a refined aesthetic. Its expansive deck, elegant lounge seating, and powerful audio setup create an atmosphere that feels more like a floating rooftop than a yacht. Perfect for corporate teams looking to impress or birthday groups wanting to own the horizon.",
    capacity: 30,
    length: "40 ft",
    priceFrom: 18000,
    priceUnit: "per cruise",
    category: ["luxury", "large"],
    occasion: ["corporate", "birthday", "bachelor", "sunset"],
    images: 23,
    features: [
      "Lounge Seating Area",
      "Premium Audio",
      "LED Setup",
      "Bar Counter",
      "Large Open Deck",
      "Bluetooth Connectivity",
      "Safety Crew",
    ],
    specs: [
      { label: "Length", value: "40 ft" },
      { label: "Capacity", value: "Up to 30 guests" },
      { label: "Type", value: "Premium Cruiser" },
      { label: "Departure", value: "Panaji" },
      { label: "Duration", value: "2–4 hours" },
    ],
    rating: 4.9,
    reviews: 54,
    badge: "Premium",
    badgeColor: "#a855f7",
    highlight: false,
  },
  {
    slug: "prestige-36",
    name: "Prestige 36",
    tagline: "Intimate Luxury at Sea",
    description:
      "The Prestige 36 is our most intimate luxury offering. Designed for couples, small groups, and milestone celebrations, it delivers a sense of private exclusivity that larger vessels simply cannot. Proposal setups, anniversary dinners, and romantic sunset cruises feel extraordinary aboard this vessel.",
    capacity: 20,
    length: "36 ft",
    priceFrom: 15000,
    priceUnit: "per cruise",
    category: ["luxury", "medium"],
    occasion: ["couple", "sunset", "proposal", "birthday", "anniversary"],
    images: 19,
    features: [
      "Luxury Seating",
      "Sound System",
      "Bar Setup",
      "Photography Friendly Deck",
      "Proposal Décor Available",
      "Candles & Rose Petals",
      "Champagne Service",
    ],
    specs: [
      { label: "Length", value: "36 ft" },
      { label: "Capacity", value: "Up to 20 guests" },
      { label: "Type", value: "Luxury Yacht" },
      { label: "Departure", value: "Panaji / Baga" },
      { label: "Duration", value: "2–3 hours" },
    ],
    rating: 5.0,
    reviews: 41,
    badge: "Best for Couples",
    badgeColor: "#ec4899",
    highlight: true,
  },
  {
    slug: "malini",
    name: "Malini Waver Rider",
    tagline: "Adventure on the Arabian Sea",
    description:
      "The Malini Waver Rider brings a spirit of adventure to your Goa experience. Built for dynamic cruising, this 38-foot vessel is equally at home hosting a birthday bash or a high-energy bachelor party. Its open deck and thrilling rides through Goa's waves make it a standout choice for those who like their ocean experience with a little adrenaline.",
    capacity: 25,
    length: "38 ft",
    priceFrom: 14000,
    priceUnit: "per cruise",
    category: ["adventure", "medium"],
    occasion: ["birthday", "bachelor", "corporate", "sunset"],
    images: 19,
    features: [
      "Open Adventure Deck",
      "Music System",
      "Water Sports Ready",
      "Spacious Layout",
      "Bar Setup",
      "Safety Gear",
    ],
    specs: [
      { label: "Length", value: "38 ft" },
      { label: "Capacity", value: "Up to 25 guests" },
      { label: "Type", value: "Adventure Yacht" },
      { label: "Departure", value: "Baga / Candolim" },
      { label: "Duration", value: "2–3 hours" },
    ],
    rating: 4.8,
    reviews: 38,
    badge: "Adventure Pick",
    badgeColor: "#06b6d4",
    highlight: false,
  },
  {
    slug: "shantam",
    name: "Shantam",
    tagline: "Serene Seas, Grand Moments",
    description:
      "Shantam is perfect for those who want a relaxed, unhurried experience on the water. With comfortable seating, a good sound system, and a refreshment bar, it offers everything you need for a beautiful sunset cruise or a small group celebration without the intensity of a party vessel.",
    capacity: 20,
    length: "35 ft",
    priceFrom: 12000,
    priceUnit: "per cruise",
    category: ["medium", "budget"],
    occasion: ["sunset", "couple", "birthday", "anniversary"],
    images: 12,
    features: [
      "Comfortable Seating",
      "Sound System",
      "Snack & Beverage Bar",
      "Relaxed Open Deck",
      "Safety Equipment",
    ],
    specs: [
      { label: "Length", value: "35 ft" },
      { label: "Capacity", value: "Up to 20 guests" },
      { label: "Type", value: "Leisure Cruiser" },
      { label: "Departure", value: "Panaji" },
      { label: "Duration", value: "2–3 hours" },
    ],
    rating: 4.7,
    reviews: 29,
    badge: "Great Value",
    badgeColor: "#10b981",
    highlight: false,
  },
  {
    slug: "blue-fin",
    name: "Blue Fin",
    tagline: "Speed, Style & the Sea",
    description:
      "Blue Fin is a sleek speedboat built for thrill-seekers who want to feel the rush of the Arabian Sea. Perfect for couples and small groups, it zips across Goa's waters with style, offering jaw-dropping views, wind in your hair, and the kind of freedom you can only get on the open ocean.",
    capacity: 15,
    length: "30 ft",
    priceFrom: 10000,
    priceUnit: "per cruise",
    category: ["medium", "speed"],
    occasion: ["couple", "bachelor", "sunset", "birthday"],
    images: 11,
    features: [
      "High-Speed Experience",
      "Open Air Deck",
      "Thrilling Ocean Ride",
      "Photo-Friendly Layout",
      "Bluetooth Audio",
    ],
    specs: [
      { label: "Length", value: "30 ft" },
      { label: "Capacity", value: "Up to 15 guests" },
      { label: "Type", value: "Speed Yacht" },
      { label: "Departure", value: "Baga / Calangute" },
      { label: "Duration", value: "1.5–2.5 hours" },
    ],
    rating: 4.8,
    reviews: 22,
    badge: "Speed & Thrill",
    badgeColor: "#f59e0b",
    highlight: false,
  },
  {
    slug: "fun-liner",
    name: "Fun Liner",
    tagline: "Pure Fun on the Water",
    description:
      "Fun Liner lives up to its name — it's built for groups who want maximum fun with great value. Spacious, music-ready, and group-friendly, it's a favourite for birthday groups and bachelor parties who want the yacht experience without the premium price tag.",
    capacity: 20,
    length: "32 ft",
    priceFrom: 10000,
    priceUnit: "per cruise",
    category: ["medium", "budget"],
    occasion: ["birthday", "bachelor", "corporate", "sunset"],
    images: 10,
    features: [
      "Party-Ready Deck",
      "Music System",
      "Group Seating",
      "Refreshment Bar",
      "Safety Equipment",
    ],
    specs: [
      { label: "Length", value: "32 ft" },
      { label: "Capacity", value: "Up to 20 guests" },
      { label: "Type", value: "Party Cruiser" },
      { label: "Departure", value: "Panaji" },
      { label: "Duration", value: "2–3 hours" },
    ],
    rating: 4.7,
    reviews: 19,
    badge: "Group Favourite",
    badgeColor: "#8b5cf6",
    highlight: false,
  },
  {
    slug: "manta-ray",
    name: "Manta Ray",
    tagline: "Glide Like a Legend",
    description:
      "The Manta Ray is designed for the most intimate ocean experiences. With room for up to 12 guests and a design built for romantic evenings, it's our top pick for couples, proposal setups, and small group sunset cruises. Minimal, beautiful, and deeply personal.",
    capacity: 12,
    length: "28 ft",
    priceFrom: 9000,
    priceUnit: "per cruise",
    category: ["small", "budget"],
    occasion: ["couple", "sunset", "proposal", "anniversary"],
    images: 7,
    features: [
      "Intimate Setup",
      "Bluetooth Audio",
      "Sunset Views",
      "Romantic Décor Available",
      "Private Experience",
    ],
    specs: [
      { label: "Length", value: "28 ft" },
      { label: "Capacity", value: "Up to 12 guests" },
      { label: "Type", value: "Intimate Cruiser" },
      { label: "Departure", value: "Panaji / Baga" },
      { label: "Duration", value: "1.5–2 hours" },
    ],
    rating: 4.9,
    reviews: 14,
    badge: "Intimate",
    badgeColor: "#f43f5e",
    highlight: false,
  },
  {
    slug: "sea-ray",
    name: "Sea Ray",
    tagline: "Luxury in Every Wave",
    description:
      "Sea Ray is our most exclusive ultra-private vessel — built for couples and small parties of up to 10 who want a truly personal ocean experience. With a luxury finish, impeccable attention to detail, and the kind of privacy that money can buy, Sea Ray is the definition of intimate luxury at sea.",
    capacity: 10,
    length: "25 ft",
    priceFrom: 8000,
    priceUnit: "per cruise",
    category: ["small", "luxury"],
    occasion: ["couple", "sunset", "proposal", "anniversary"],
    images: 4,
    features: [
      "Ultra-Private Experience",
      "Luxury Finish",
      "Compact & Intimate",
      "Sunset Oriented",
      "Couple Décor On Request",
    ],
    specs: [
      { label: "Length", value: "25 ft" },
      { label: "Capacity", value: "Up to 10 guests" },
      { label: "Type", value: "Ultra-Private Yacht" },
      { label: "Departure", value: "Panaji / Baga" },
      { label: "Duration", value: "1.5–2 hours" },
    ],
    rating: 5.0,
    reviews: 11,
    badge: "Ultra Private",
    badgeColor: "#d946ef",
    highlight: false,
  },
];

export function getYacht(slug: string): Yacht | undefined {
  return YACHTS.find((y) => y.slug === slug);
}

// ─── Experience Data ──────────────────────────────────────────────────────────

export type Experience = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: string;
  accent: string;
  color: string;
  image: string;
  tag: string;
  includes: string[];
  duration: string;
  priceFrom: string;
  bestYachts: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    slug: "sunset-cruise",
    title: "Sunset Cruise",
    subtitle: "Where the sky bleeds gold",
    description: "Drift into the golden hour on the Arabian Sea. Champagne, music, and a sky that paints itself for you.",
    longDescription: "There is no filter that captures a Goa sunset from the deck of a private yacht. As the sun descends toward the Arabian Sea, the sky transforms into shades of amber, gold and crimson — and you have a front-row seat. Our sunset cruises are designed to be unhurried, beautiful, and deeply memorable. Enjoy chilled drinks, curated music, and the company of those who matter most.",
    icon: "sunset",
    accent: "#f59e0b",
    color: "from-amber-900/60 to-orange-900/30",
    image: "/yachts/sunset-42/sunset-42-6.jpeg",
    tag: "Most Popular",
    includes: ["2-hour cruise", "Welcome drinks", "Curated playlist", "Life jackets", "Professional crew"],
    duration: "2–3 hours",
    priceFrom: "₹8,000",
    bestYachts: ["prestige-36", "manta-ray", "sea-ray", "shantam"],
  },
  {
    slug: "birthday-party",
    title: "Birthday Party",
    subtitle: "Celebrate in the middle of the ocean",
    description: "Celebrate in style with a private yacht, décor, cake cutting and unforgettable ocean memories.",
    longDescription: "A birthday party on a private yacht is an experience that no rooftop restaurant or beach shack can compete with. We handle the décor, the music, the bar, the cake setup — everything. All you need to do is show up and celebrate. From intimate gatherings of 10 to raucous parties of 50, we have the perfect vessel and setup for your birthday.",
    icon: "cake",
    accent: "#ec4899",
    color: "from-pink-900/60 to-rose-900/30",
    image: "/yachts/orca/orca-3.jpeg",
    tag: "Celebrated 200+",
    includes: ["Decorated deck", "Birthday cake setup", "DJ or playlist", "Bar counter", "Photo-friendly lighting", "Crew & safety"],
    duration: "3–4 hours",
    priceFrom: "₹12,000",
    bestYachts: ["sunset-42", "orca", "polaris", "malini"],
  },
  {
    slug: "bachelor-party",
    title: "Bachelor Party",
    subtitle: "The last great adventure before forever",
    description: "The ultimate pre-wedding celebration — DJ, drinks, Goa vibes and the open sea.",
    longDescription: "Goa is the bachelor party capital of India — and the ocean is its best kept secret. A private yacht puts you away from the crowds, on the open water, with your crew and a DJ who knows exactly what the night needs. No table booking. No strangers. Just your group, the Arabian Sea, and a night that becomes the benchmark for every celebration that follows.",
    icon: "users",
    accent: "#a855f7",
    color: "from-purple-900/60 to-violet-900/30",
    image: "/yachts/polaris/polaris-5.jpeg",
    tag: "Wildly Popular",
    includes: ["DJ system & speaker", "Full bar setup", "LED lighting", "Entry banner", "Customised playlist", "Safety crew"],
    duration: "3–5 hours",
    priceFrom: "₹15,000",
    bestYachts: ["sunset-42", "mv-krishna", "orca", "malini"],
  },
  {
    slug: "couple-yacht-date",
    title: "Couple Yacht Date",
    subtitle: "Romance on the Arabian Sea",
    description: "A private deck, ocean breeze, candlelight dinner and just the two of you. Romance redefined.",
    longDescription: "Some occasions deserve more than a restaurant table. Our couple yacht dates are crafted to create intimacy, wonder, and memories that last a lifetime. Rose petals on the deck, champagne on ice, soft music and a horizon that seems to exist just for the two of you. Whether it's a first date, an anniversary, or a moment to reconnect — the ocean has a way of making everything feel more meaningful.",
    icon: "heart",
    accent: "#ef4444",
    color: "from-red-900/60 to-rose-900/30",
    image: "/yachts/prestige-36/prestige-36-1.jpeg",
    tag: "Most Romantic",
    includes: ["Rose petal décor", "Champagne on ice", "Soft music playlist", "Private crew", "Candles & fairy lights"],
    duration: "2–3 hours",
    priceFrom: "₹9,000",
    bestYachts: ["prestige-36", "sea-ray", "manta-ray"],
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    subtitle: "Where deals are made on the ocean",
    description: "Impress clients and reward your team with a premium floating corporate experience.",
    longDescription: "When the boardroom feels stale, take your team to the ocean. Corporate yacht experiences are the ultimate way to impress clients, celebrate team milestones, or simply reward your people with something extraordinary. We handle the setup — branding, A/V, catering, logistics — while you focus on the people and conversations that matter.",
    icon: "briefcase",
    accent: "#3b82f6",
    color: "from-blue-900/60 to-indigo-900/30",
    image: "/yachts/mv-krishna/mv-krishna-1.jpeg",
    tag: "Premium",
    includes: ["Corporate branding setup", "A/V equipment", "Catering options", "Projector on request", "Professional crew", "Photography"],
    duration: "3–5 hours",
    priceFrom: "₹20,000",
    bestYachts: ["sunset-42", "mv-krishna", "orca", "polaris"],
  },
  {
    slug: "dj-yacht-party",
    title: "DJ Yacht Party",
    subtitle: "The ocean is your dancefloor",
    description: "Turn up the volume on the ocean. Live DJ, lights, cocktails and non-stop energy.",
    longDescription: "Imagine a DJ set that goes until the stars come out, a dance floor on the open water, and a skyline of Goa lights glowing behind you. Our DJ Yacht Parties are the most electric experience we offer. Professional DJ, full LED rig, bar setup, and a crew that knows how to keep the energy going. This is what it means to own the night.",
    icon: "music",
    accent: "#06b6d4",
    color: "from-cyan-900/60 to-teal-900/30",
    image: "/yachts/sunset-42/sunset-42-2.jpeg",
    tag: "High Energy",
    includes: ["Professional DJ", "Full LED light rig", "Dance floor space", "Full bar setup", "Speaker system", "Safety crew"],
    duration: "3–5 hours",
    priceFrom: "₹18,000",
    bestYachts: ["sunset-42", "mv-krishna", "malini"],
  },
  {
    slug: "proposal-setup",
    title: "Proposal Setup",
    subtitle: "She will say yes",
    description: "Say yes against a backdrop of the setting sun and infinite ocean. We handle every detail.",
    longDescription: "The most important question of your life deserves the most extraordinary setting. Our proposal setups are meticulously planned — rose petals, champagne, candles, fairy lights, and a sunset that feels like it was ordered for this exact moment. We coordinate everything discreetly so you can focus on the moment. Our crew disappears when it matters, leaving just the two of you and the ocean.",
    icon: "diamond",
    accent: "#10b981",
    color: "from-emerald-900/60 to-green-900/30",
    image: "/yachts/prestige-36/prestige-36-4.jpeg",
    tag: "Magical",
    includes: ["Full deck décor", "Rose petals", "Champagne service", "Candles & fairy lights", "Discreet crew", "Photography available", "Surprise coordination"],
    duration: "2–3 hours",
    priceFrom: "₹12,000",
    bestYachts: ["prestige-36", "sea-ray", "manta-ray"],
  },
  {
    slug: "fireworks-celebration",
    title: "Fireworks Night",
    subtitle: "Light up the Arabian Sea",
    description: "Sky-lighting fireworks above the sea — New Year's, anniversaries, or just because you can.",
    longDescription: "Fireworks are magnificent from the shore. From the deck of a private yacht, anchored in the middle of the Arabian Sea, they are otherworldly. The reflections on the water, the darkness surrounding you, the sound travelling across the ocean — nothing compares. Perfect for New Year's Eve, Diwali, anniversaries, or any occasion where you want to paint the sky.",
    icon: "sparkles",
    accent: "#eab308",
    color: "from-yellow-900/60 to-amber-900/30",
    image: "/yachts/orca/orca-1.jpeg",
    tag: "Spectacular",
    includes: ["Professional fireworks display", "Private yacht deck", "Bar setup", "Music system", "Safety crew", "Anchored offshore"],
    duration: "2–4 hours",
    priceFrom: "₹20,000",
    bestYachts: ["sunset-42", "orca", "polaris"],
  },
];

export function getExperience(slug: string): Experience | undefined {
  return EXPERIENCES.find((e) => e.slug === slug);
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  { name: "Priya & Arjun Mehta", occasion: "Anniversary Sunset Cruise", yacht: "Prestige 36", rating: 5, text: "We celebrated our 5th anniversary on the Prestige 36 and it was beyond anything we imagined. The crew was incredibly attentive, the sunset view was breathtaking, and the whole experience felt like something out of a dream. Absolutely worth every rupee.", location: "Mumbai", initial: "P" },
  { name: "Rohit Sharma", occasion: "Birthday Party", yacht: "Sunset 42", rating: 5, text: "Threw my 30th birthday party on the Sunset 42 with 35 friends. The DJ setup was insane, the deck was massive, and the whole crew made sure everyone was having the time of their lives. Party Yacht Goa exceeded all expectations — already planning the next one!", location: "Delhi", initial: "R" },
  { name: "Jake Thompson", occasion: "Bachelor Party", yacht: "Orca", rating: 5, text: "My bachelor party on the Orca was hands down the best experience of my life. The team organised everything — drinks, music, decorations — we just showed up and had the most epic night on the Arabian Sea. Highly recommend for any bachelor party in Goa.", location: "London, UK", initial: "J" },
  { name: "Sneha Kulkarni", occasion: "Corporate Team Outing", yacht: "MV Krishna", rating: 5, text: "Booked the MV Krishna for our annual team outing of 35 people. The experience was seamless — the booking process was easy, the yacht was spotless, and the crew were professional and friendly. Our team is still talking about it. Will definitely book again.", location: "Bangalore", initial: "S" },
  { name: "Aarav & Nisha Patel", occasion: "Proposal Setup", yacht: "Prestige 36", rating: 5, text: "Party Yacht Goa arranged the most perfect proposal setup. Rose petals, champagne, the sunset backdrop — she said yes before I even finished the question! The crew was discreet and made the whole moment magical. Cannot thank them enough.", location: "Ahmedabad", initial: "A" },
  { name: "Marco Ricci", occasion: "Sunset Cruise", yacht: "Polaris", rating: 5, text: "Traveling through Goa and decided to do a sunset cruise on the Polaris. Absolutely world class. The boat, the crew, the views — everything rivaled the best yacht experiences I had in Greece or Croatia. Incredible value and an unforgettable evening.", location: "Rome, Italy", initial: "M" },
];
