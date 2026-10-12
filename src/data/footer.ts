export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: "instagram" | "x" | "facebook" | "youtube";
}

export interface FooterConfig {
  logo: string;
  logoAlt: string;
  description: string;
  quickLinks: FooterLink[];
  serviceLinks: FooterLink[];
  studioHours: {
    weekday: string;
    weekend: string;
  };
  address: string;
  addressHref: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  socials: SocialLink[];
  copyright: string;
  privacyHref: string;
  termsHref: string;
  helpHref: string;
}

export const defaultFooterData: FooterConfig = {
  logo: "/main-logo-black.svg",
  logoAlt: "Pranavya",
  description:
    "Pranavya Yoga offers a mindful sanctuary for self-discovery through breath, movement, and inner peace.",

  quickLinks: [
    { label: "Classes", href: "/classes/classOne/" },
    { label: "Retreats", href: "/retreat/YogaRetreat/" },
    { label: "Events", href: "/events/ourEvents/" },
    { label: "Blog", href: "/blogs/blogOne/" },
    { label: "Contact", href: "/bookClass/" },
  ],

  serviceLinks: [
    { label: "Book a Class", href: "/bookClass/" },
    { label: "Join a Retreat", href: "/retreat/YogaRetreat/" },
    { label: "personal Yoga Sessions", href: "/classes/classOne/" },
    { label: "Corporate Wellness", href: "/classes/classOne/" },
    { label: "Schedule Consultation", href: "/schedule/" },
  ],

  studioHours: {
    weekday: "Mon - Fri: 7:00 AM – 7:00 PM",
    weekend: "Sat - Sun: 8:00 AM – 5:00 PM",
  },

  address: "108 Serenity Street, Bliss City, NY",
  addressHref: "https://maps.google.com/?q=108+Serenity+Street+Bliss+City+NY",

  phone: "+1 (555) 987-6543",
  phoneHref: "tel:+15559876543",

  email: "hello@example.com",
  emailHref: "mailto:hello@example.com",

  socials: [
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      icon: "instagram",
    },
    {
      name: "X",
      href: "https://x.com/?lang=en",
      icon: "x",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/",
      icon: "facebook",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/",
      icon: "youtube",
    },
  ],

  copyright: "© 2025 Pranavya Yoga. All rights reserved.",
  privacyHref: "/privacyPolicy/",
  termsHref: "/termscondition/",
  helpHref: "/faq/",
};
