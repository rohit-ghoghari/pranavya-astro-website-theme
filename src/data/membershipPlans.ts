export interface Plan {
  name: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
}

export const defaultMonthlyPlans: Plan[] = [
  {
    name: "Essence Plan",
    description:
      "Beginners or occasional yogis seeking gentle consistency and community connection.",
    price: "$39",
    features: [
      "4 In-Studio Group Yoga Classes per Month",
      "Access to Monthly Community Events",
      "Welcome Kit with Studio Essentials",
      "Basic Member Portal Access",
      "1 Bonus Pass for a Friend (One-Time)",
    ],
    buttonText: "BOOK MONTHLY",
    buttonHref: "/bookClass/",
  },
  {
    name: "Balance Plan",
    description:
      "Regular practitioners looking to deepen their practice with more flexibility and perks.",
    price: "$69",
    features: [
      "8 Group Yoga Classes per Month",
      "Priority Class Booking",
      "1 Monthly Guest Pass",
      "10% Discount on Workshops & Retreats",
      "Access to On-Demand Class Library",
      "Member Dashboard & Progress Tracking",
    ],
    buttonText: "BOOK MONTHLY",
    buttonHref: "/bookClass/",
  },
  {
    name: "Elevate Plan",
    description:
      "Committed yogis ready for transformational growth and holistic integration.",
    price: "$119",
    features: [
      "Unlimited Group Classes (Studio & Online)",
      "1 Private Yoga Session per Month",
      "Early Registration for Events & Retreats",
      "15% Discount on Workshops, Courses, and Merchandise",
      "Exclusive Monthly Guided Meditation Recording",
      "Priority Support & Direct Instructor Access",
    ],
    buttonText: "BOOK MONTHLY",
    buttonHref: "/bookClass/",
  },
];

export const defaultYearlyPlans: Plan[] = [
  {
    name: "Balance Plan",
    description:
      "Intermediate-level yogis who practice weekly and enjoy community perks.",
    price: "$699",
    features: [
      "8 Group Classes per Month (96/year)",
      "Monthly Guest Pass",
      "Priority Booking Year-Round",
      "10% Discount on Retreats & Products",
      "Personalized Practice Progress Report (Bi-Annual)",
      "Early Access to New Programs",
    ],
    buttonText: "BOOK MONTHLY",
    buttonHref: "/bookClass/",
  },
  {
    name: "Essence Plan",
    description:
      "Casual yogis who want long-term access to yoga without a monthly hassle.",
    price: "$399",
    features: [
      "4 Group Classes per Month (48/year)",
      "Access to All Community Events",
      "Welcome Tote Bag + Yoga Mat",
      "Annual Gratitude Gift Box",
      "1 Bonus Class Credit",
    ],
    buttonText: "BOOK MONTHLY",
    buttonHref: "/bookClass/",
  },
  {
    name: "Elevate Plan",
    description:
      "Dedicated yogis seeking a fully immersive and supported experience all year.",
    price: "$1199",
    features: [
      "Unlimited Classes (In-Studio & Online)",
      "12 Private Sessions (1/Month)",
      "Monthly Wellness Coaching Check-In",
      "VIP Invitations to All Special Events",
      "15% Discount on Workshops, Programs & Products",
      "Year-End Reflection & Goal-Setting Session",
    ],
    buttonText: "BOOK MONTHLY",
    buttonHref: "/bookClass/",
  },
];
