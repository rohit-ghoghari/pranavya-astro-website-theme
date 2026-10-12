export interface EventItem {
  image: string;
  title: string;
  description: string;
  date: string;
  type: "past" | "upcoming";
}

export const events: EventItem[] = [
  // =========================
  // ALL / PAST EVENTS
  // =========================
  {
    image: "/events_2-1.webp",
    title: "The 84 Asana Series with Tara Johnson",
    description: "An in-depth exploration of classical postures led by a seasoned champion.",
    date: "01 August",
    type: "past",
  },
  {
    image: "/events_2-2.webp",
    title: "Mindful Leadership Through Yoga",
    description: "A retreat-style workshop blending yoga with mindful leadership strategies.",
    date: "01 August",
    type: "past",
  },
  {
    image: "/events_2-3.webp",
    title: "Balance & Core Workshop",
    description: "Focused movement sessions to build strength, stability, and body awareness.",
    date: "01 August",
    type: "past",
  },
  {
    image: "/events_2-4.webp",
    title: "Hip Opening Intensive with Ravi Das",
    description: "A dynamic flow designed to unlock tight hips and increase lower body mobility.",
    date: "01 August",
    type: "past",
  },
  {
    image: "/events_2-5.webp",
    title: "Sunset Yoga & Mantra Chanting",
    description: "An uplifting community practice ending with collective chanting and intention setting.",
    date: "01 August",
    type: "past",
  },
  {
    image: "/events_2-6.webp",
    title: "Yoga Philosophy & Practice Retreat",
    description: "A multi-day journey into the roots of yoga—combining theory, breath, and movement.",
    date: "01 August",
    type: "past",
  },
  {
    image: "/events_2-7.webp",
    title: "RESTORATIVE YOGA & SOUND BATH",
    description: "A deeply relaxing session combining restorative poses and crystal bowl healing.",
    date: "01 August",
    type: "past",
  },
  {
    image: "/events_2-8.webp",
    title: "Yoga for Mental Clarity",
    description: "A calming practice combining gentle asanas and mindfulness techniques to focus and balance.",
    date: "01 August",
    type: "past",
  },
  {
    image: "/events_2-9.webp",
    title: "Sunrise Flow and Breath Awakening",
    description: "A gentle morning flow to awaken your energy and set a peaceful tone for the day.",
    date: "02 August",
    type: "past",
  },
  {
    image: "/events_2-10.webp",
    title: "Hip Mobility and Core Strength",
    description: "A grounding practice focused on loosening hips while building deep core support.",
    date: "03 August",
    type: "past",
  },
  {
    image: "/events_2-11.webp",
    title: "Chakra Yoga and Energy Balance",
    description: "Align body and mind through chakra-focused movement and mindful breathing.",
    date: "03 August",
    type: "past",
  },
  {
    image: "/events_2-12.webp",
    title: "Yin Yoga for Deep Release",
    description: "Long-held postures designed to target fascia and create space in the joints.",
    date: "18 November",
    type: "past",
  },
  {
    image: "/events_2-13.webp",
    title: "Vinyasa Flow and Heart Opener",
    description: "A rhythmic sequence to energize your body and expand the chest and shoulders.",
    date: "12 September",
    type: "past",
  },
  {
    image: "/events_2-14.webp",
    title: "Dynamic Flow for Total Body Strength",
    description: "An energizing sequence to tone, stretch, and build stamina from head to toe.",
    date: "26 August",
    type: "past",
  },

  // =========================
  // UPCOMING EVENTS
  // =========================
  {
    image: "/events_2-15.webp",
    title: "Evening Calm and Gentle Unwind",
    description: "Release the day’s stress through supported postures and soft breathwork.",
    date: "02 August",
    type: "upcoming",
  },
  {
    image: "/events_2-8.webp",
    title: "Dynamic Flow for Total Body Strength",
    description: "An energizing sequence to tone, stretch, and build stamina from head to toe.",
    date: "03 August",
    type: "upcoming",
  },
  {
    image: "/events_2-17.webp",
    title: "Inversion Foundations and Balance Play",
    description: "Learn to safely explore inversions with drills and techniques for all levels.",
    date: "28 August",
    type: "upcoming",
  },
  {
    image: "/events_2-18.webp",
    title: "Spinal Health and Mobility Flow",
    description: "Strengthen and mobilize the spine with thoughtful movement and awareness.",
    date: "29 August",
    type: "upcoming",
  },
  {
    image: "/events_2-19.webp",
    title: "Breath-Centered Flow for Inner Peace",
    description: "Connect breath to movement and cultivate calm through fluid sequences.",
    date: "01 August",
    type: "upcoming",
  },
  {
    image: "/events_2-20.webp",
    title: "Creative Vinyasa and Free Expression",
    description: "Explore movement beyond structure in this playful, flowing yoga practice.",
    date: "26 August",
    type: "upcoming",
  },
  {
    image: "/events_2-21.webp",
    title: "Morning Energy Boost and Clarity Flow",
    description: "Start your day with uplifting poses and breathwork to sharpen your focus.",
    date: "01 August",
    type: "upcoming",
  },
  {
    image: "/events_2-22.webp",
    title: "Hips, Hamstrings, and Low Back Release",
    description: "Loosen tight hips and hamstrings while relieving lower back tension.",
    date: "26 August",
    type: "upcoming",
  },
];

export const eventHref = (event: { title: string; type: string }) => {
  const slug =
    event.title === "Balance & Core Workshop"
      ? "balance-core-workshop"
      : event.title
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
  const occurrence =
    event.title === "Dynamic Flow for Total Body Strength" &&
    event.type === "upcoming"
      ? "-upcoming"
      : "";

  return `/events/${slug}${occurrence}`;
};
