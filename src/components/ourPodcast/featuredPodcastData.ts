export interface Podcast {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  metaDuration: string;
  duration: string;
  artist: string;
  audio: string;
  episode: number;
}

export const INITIAL_VISIBLE_COUNT = 6;

export const DEFAULT_FEATURED_PODCASTS: Podcast[] = [
    {
      image: "/podcast-1.webp",
      imageAlt: "podcast",
      title: "Cultivating Daily Mindfulness",
      description:
        "Learn simple, effective ways to integrate mindfulness into your everyday routine—on and off the mat.",
      metaDuration: "22 minutes",
      duration: "1:56",
      artist: "Jessica Moore",
      audio: "/audio/health-2.mp3",
      episode: 1,
    },
    {
      image: "/podcast-2.webp",
      imageAlt: "podcast",
      title: "The Healing Power of Breath",
      description:
        "Discover pranayama practices that can calm your mind, energize your body, and support emotional balance.",
      metaDuration: "28 minutes",
      duration: "1:51",
      artist: "Priya Sharma",
      audio: "/audio/health.mp3",
      episode: 2,
    },
    {
      image: "/podcast-3.webp",
      imageAlt: "podcast",
      title: "Finding Flow in Your Practice",
      description:
        "Explore how to move with intention and create a harmonious connection between breath, body, and mind.",
      metaDuration: "32 minutes",
      duration: "1:51",
      artist: "Daniel Lee",
      audio: "/audio/health.mp3",
      episode: 3,
    },
    {
      image: "/podcast-4.webp",
      imageAlt: "podcast",
      title: "Grounded in the Present",
      description:
        "Learn how to stay grounded in the present by gently guiding your awareness back to your breath, body, and current surroundings.",
      metaDuration: "18 minutes",
      duration: "1:51",
      artist: "David Lin",
      audio: "/audio/health.mp3",
      episode: 4,
    },
    {
      image: "/podcast-5.webp",
      imageAlt: "podcast",
      title: "The Art of Stillness",
      description:
        "Discover the peaceful power of stillness and how moments of quiet can help calm your mind and center your emotional energy.",
      metaDuration: "22 minutes",
      duration: "1:51",
      artist: "Priya Kapoor",
      audio: "/audio/health.mp3",
      episode: 5,
    },
    {
      image: "/podcast-6.webp",
      imageAlt: "podcast",
      title: "Morning Intention Setting",
      description:
        "Learn simple, effective ways to integrate mindfulness into your everyday routine—on and off the mat.",
      metaDuration: "15 minutes",
      duration: "1:51",
      artist: "Marcus Hale",
      audio: "/audio/health.mp3",
      episode: 6,
    },
    {
      image: "/podcast-7.webp",
      imageAlt: "podcast",
      title: "Mindfulness for Busy Days",
      description:
        "Explore practical ways to stay mindful on busy days by returning to your breath and softening into calm awareness as life unfolds.",
      metaDuration: "19 minutes",
      duration: "1:51",
      artist: "Aisha Monroe",
      audio: "/audio/health.mp3",
      episode: 7,
    },
    {
      image: "/podcast-8.webp",
      imageAlt: "podcast",
      title: "Walking with Awareness",
      description:
        "Turn your daily walks into meditative moments by observing each step and breath with presence, ease, and appreciation for the now.",
      metaDuration: "16 minutes",
      duration: "1:51",
      artist: "Ethan Rivera",
      audio: "/audio/health.mp3",
      episode: 8,
    },
    {
      image: "/podcast-9.webp",
      imageAlt: "podcast",
      title: "Mindful Listening Practice",
      description:
        "Learn to deepen your connection with others through mindful listening, full attention, and a calm, open-hearted awareness.",
      metaDuration: "21 minutes",
      duration: "1:51",
      artist: "Ethan Rivera",
      audio: "/audio/health.mp3",
      episode: 9,
    },
    {
      image: "/podcast-10.webp",
      imageAlt: "podcast",
      title: "Softening Stress Responses",
      description:
        "Use breath and gentle awareness to soften stress responses and return to a steady, centered place within when challenges arise.",
      metaDuration: "23 minutes",
      duration: "1:51",
      artist: "Jonah Kim",
      audio: "/audio/health.mp3",
      episode: 10,
    },
    {
      image: "/podcast-11.webp",
      imageAlt: "podcast",
      title: "Sleep-Well Wind Down",
      description:
        "Ease into rest with a calming practice that helps you let go of tension, quiet your thoughts, and prepare the body for deep sleep.",
      metaDuration: "17 minutes",
      duration: "1:51",
      artist: "Naomi Ellis",
      audio: "/audio/health.mp3",
      episode: 11,
    },
    {
      image: "/podcast-12.webp",
      imageAlt: "Yoga Class",
      title: "Loving-Kindness in Daily Life",
      description:
        "Practice extending loving-kindness to yourself and others by opening your heart and connecting to compassion in daily moments.",
      metaDuration: "24 minutes",
      duration: "1:51",
      artist: "Omar Bennett",
      audio: "/audio/health.mp3",
      episode: 12,
    },
    {
      image: "/podcast-13.webp",
      imageAlt: "podcast",
      title: "The Power of the Pause",
      description:
        "Experience the power of mindful pauses and how choosing stillness before reacting can bring clarity, peace, and self-control.",
      metaDuration: "20 minutes",
      duration: "1:51",
      artist: "Meera Patel",
      audio: "/audio/health.mp3",
      episode: 13,
    },
    {
      image: "/podcast-14.webp",
      imageAlt: "podcast",
      title: "Mindfulness While Eating",
      description:
        "Savor each bite and nourish your body by bringing awareness to the textures, tastes, and sensations of mindful eating rituals.",
      metaDuration: "18 minutes",
      duration: "1:51",
      artist: "James Holloway",
      audio: "/audio/health.mp3",
      episode: 14,
    },
    {
      image: "/podcast-15.webp",
      imageAlt: "podcast",
      title: "Releasing Mental Clutter",
      description:
        "Let go of overthinking by using the breath to create space in your mind, release mental noise, and return to gentle presence.",
      metaDuration: "22 minutes",
      duration: "1:51",
      artist: "Aria Thompson",
      audio: "/audio/health.mp3",
      episode: 15,
    },
    {
      image: "/podcast-16.webp",
      imageAlt: "podcast",
      title: "Mindful Digital Habits",
      description:
        "Bring mindfulness into your digital life by creating space to pause, observe, and engage with screens more consciously and calmly.",
      metaDuration: "18 minutes",
      duration: "1:51",
      artist: "Alex Romero",
      audio: "/audio/health.mp3",
      episode: 16,
    },
    {
      image: "/podcast-17.webp",
      imageAlt: "podcast",
      title: "Breath as Your Anchor",
      description:
        "Anchor yourself in the moment with the steady rhythm of your breath and find peace in the center of whatever life is offering.",
      metaDuration: "16 minutes",
      duration: "1:51",
      artist: "Sofia Nguyen",
      audio: "/audio/health.mp3",
      episode: 17,
    },
    {
      image: "/podcast-18.webp",
      imageAlt: "podcast",
      title: "The Mindful Morning Ritual",
      description:
        "Awaken your day with a morning routine that blends breath, movement, and intention to set a calm and focused tone for everything ahead.",
      metaDuration: "21 minutes",
      duration: "1:51",
      artist: "Thomas Reed",
      audio: "/audio/health.mp3",
      episode: 18,
    },
  ];
