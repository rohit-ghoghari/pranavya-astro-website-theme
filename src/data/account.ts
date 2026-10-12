export interface AccountOrder {
  id: string;
  product: string;
  date: string;
  amount: string;
  status: string;
  href: string;
}

export const dashboardOrders: AccountOrder[] = [
  { id: "#1045", product: "Manduka PRO Yoga Mat 6mm", date: "25 Nov", amount: "$138.00", status: "Processing", href: "/shop/manduka-pro-yoga-mat/" },
  { id: "#1046", product: "Buddha Teas Organic Calm Tea", date: "25 Nov", amount: "$49.98", status: "Delivered", href: "/shop/buddha-teas-organic-calm-tea/" },
  { id: "#1047", product: "Gaiam Yoga Starter Kit", date: "25 Nov", amount: "$49.98", status: "Processing", href: "/shop/gaiam-yoga-starter-kit/" },
  { id: "#1048", product: "Wellness Gift Card", date: "25 Nov", amount: "$39.00", status: "Delivered", href: "/shop/wellness-gift-card/" },
];

export const ordersList: AccountOrder[] = [
  { id: "#1045", product: "Manduka PRO Yoga Mat 6mm", date: "25 Nov", amount: "$138.00", status: "Processing", href: "/shop/manduka-pro-yoga-mat/" },
  { id: "#1046", product: "Buddha Teas Organic Calm Tea", date: "25 Nov", amount: "$49.98", status: "Delivered", href: "/shop/buddha-teas-organic-calm-tea/" },
  { id: "#1047", product: "Gaiam Yoga Starter Kit", date: "25 Nov", amount: "$49.98", status: "Processing", href: "/shop/gaiam-yoga-starter-kit/" },
  { id: "#1048", product: "Wellness Gift Card", date: "25 Nov", amount: "$39.00", status: "Delivered", href: "/shop/wellness-gift-card/" },
];

export interface AccountClass {
  time: string;
  className: string;
  instructor: string;
  duration: string;
  status: string;
  statusClass: string;
  action: string;
  image: string;
  date: string;
  classStatus: string;
  programDuration: string;
  sessionDuration: string;
  format: string;
  detail: string;
}

export const accountClasses: AccountClass[] = [
  {
    time: "7:00 AM",
    className: "Morning Flow Yoga",
    instructor: "Ravi Das",
    duration: "3 Months",
    status: "Available",
    statusClass: "btn btn-available uppercase rounded-xl xl:text-sm text-xs xl:px-6 lg:px-5.5 px-4 xl:py-2 py-1.5 md:mx-auto",
    action: "View Details",
    image: "/account-class-1.webp",
    date: "12 Aug 2025",
    classStatus: "Completed",
    programDuration: "3 Months",
    sessionDuration: "60 Minutes",
    format: "In-Studio",
    detail: "A gentle, energizing morning yoga session focused on improving flexibility, posture, and breathing control. Perfect for starting your day with clarity and balance.",
  },
  {
    time: "8:30 AM",
    className: "Sunset Yin Yoga",
    instructor: "Meera Kapoor",
    duration: "1 Months",
    status: "complete",
    statusClass: "btn btn-complete uppercase rounded-xl xl:text-sm text-xs xl:px-6 lg:px-5.5 px-4 xl:py-2 py-1.5 md:mx-auto",
    action: "Reschedule",
    image: "/account-class-2.webp",
    date: "14 Aug 2025",
    classStatus: "In Progress",
    programDuration: "1 Months",
    sessionDuration: "45 Minutes",
    format: "In-Studio",
    detail: "A slow, deep-stretch evening session designed to release tension and calm the nervous system. Perfect for unwinding after a long day.",
  },
  {
    time: "5:30 PM",
    className: "Power Vinyasa Challenge",
    instructor: "Arjun Malhotra",
    duration: "1 year",
    status: "Available",
    statusClass: "btn btn-available uppercase rounded-xl xl:text-sm text-xs xl:px-6 lg:px-5.5 px-4 xl:py-2 py-1.5 md:mx-auto",
    action: "View Details",
    image: "/account-class-3.webp",
    date: "20 Aug 2025",
    classStatus: "Completed",
    programDuration: "30 Days",
    sessionDuration: "60 Minutes",
    format: "Hybrid (Studio + Online)",
    detail: "A high-energy strength-building challenge with dynamic flows, controlled breathing, and weekly progress tracking.",
  },
  {
    time: "6:30 PM",
    className: "Deep Sleep Restorative Yoga",
    instructor: "Ananya Roy",
    duration: "6 Months",
    status: "Cancelled",
    statusClass: "btn btn-cancel uppercase rounded-xl xl:text-sm text-xs xl:px-6 lg:px-5.5 px-4 xl:py-2 py-1.5 md:mx-auto",
    action: "Cancel Booking",
    image: "/account-class-4.webp",
    date: "19 Aug 2025",
    classStatus: "Booked",
    programDuration: "6 Months",
    sessionDuration: "60 Minutes",
    format: "Online",
    detail: "A gentle, restful practice using supported poses to relax the body and improve sleep quality. Ideal for stress relief and deep rest.",
  },
];

export interface AccountPlan {
  name: string;
  status: string;
  statusClasses: string;
  startDate: string;
  renewalDate: string;
  duration: string;
  nextPayment: string;
}

export const accountPlans: AccountPlan[] = [
  {
    name: "Elevent Yoga Plan",
    status: "Active",
    statusClasses: "text-[#338805] bg-[#CFFFB5] uppercase font-semibold w-fit 1xl:text-sm xl:text-xs text-[11px] md:py-2 sm:py-[6px] py-[5px] xl:px-5 sm:px-4 px-3 rounded-full md:mx-auto",
    startDate: "15 Sep 2025",
    renewalDate: "15 Dec 2025",
    duration: "3 Months",
    nextPayment: "$369",
  },
  {
    name: "Essence Yoga Plan",
    status: "Cancle",
    statusClasses: "text-[#881805] bg-[#FFC0B5] uppercase font-semibold w-fit 1xl:text-sm xl:text-xs text-[11px] md:py-2 sm:py-[6px] py-[5px] xl:px-5 sm:px-4 px-3 rounded-full md:mx-auto",
    startDate: "16 Dec 2025",
    renewalDate: "15 Mar 2026",
    duration: "3 Months",
    nextPayment: "$369",
  },
  {
    name: "Balance Yoga Plan",
    status: "Complete",
    statusClasses: "text-[#673E2C] bg-[#F7F5F4] uppercase font-semibold w-fit 1xl:text-sm xl:text-xs text-[11px] md:py-2 sm:py-[6px] py-[5px] xl:px-5 sm:px-4 px-3 rounded-full md:mx-auto",
    startDate: "16 Mar 2026",
    renewalDate: "15 Jun 2026",
    duration: "3 Months",
    nextPayment: "$369",
  },
];

export const billingRows = [
  { date: "15 Nov 2025", amount: "$369", status: "Paid", cycle: "Monthly", invoice: "details" as const },
  { date: "15 Oct 2025", amount: "₹799", status: "Paid", cycle: "Monthly", invoice: "retry" as const },
  { date: "15 Sep 2025", amount: "$369", status: "Paid", cycle: "Monthly", invoice: "download" as const },
];

export const planBenefits = [
  "Unlimited Group Classes (Studio & Online)",
  "1 Private Yoga Session per Month",
  "Early Registration for Events & Retreats",
  "15% Discount on Workshops, Courses, and Merchandise",
  "Exclusive Monthly Guided Meditation Recording",
  "Priority Support & Direct Instructor Access",
];

export const cancelReasons = [
  "Select Reason",
  "Ordered by mistake",
  "Found a better price",
  "Delivery is taking too long",
  "Item no longer needed",
  "Other (opens text box)",
];


