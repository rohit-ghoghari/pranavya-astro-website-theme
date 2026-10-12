export interface ScheduleItem {
  timeOfDay: string; time: string;
  classes: string[]; levels: string[];
  trainer: string; trainerImage: string;
  trainerAlt?: string;
}

export interface DaySchedule {
  id: string;
  name: string;
  items: ScheduleItem[];
}


export const defaultWeeklyScheduleIndex1: DaySchedule[] = [
    {
      id: "sun",
      name: "Sunday",
      items: [
        {
          timeOfDay: "( Morning )", time: "6:00 AM to 7:00 AM",
          classes: ["Hatha Yoga", "Vinyasa Flow"], levels: ["Beginner", "Intermediate"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Morning )", time: "7:00 AM to 8:00 AM",
          classes: ["Power Yoga", "Pranayama & Meditation"], levels: ["Intermediate", "All Levels"],
          trainer: "James Carter", trainerImage: "/home-trainer-2.webp",
        },
        {
          timeOfDay: "( Morning )", time: "8:00 AM to 9:00 AM",
          classes: ["Yin Yoga", "Vinyasa Flow"], levels: ["Beginner", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-3.webp",
        },
        {
          timeOfDay: "( Evening )", time: "4:00 PM to 5:00 PM",
          classes: ["Restorative Yoga", "Power Yoga"], levels: ["Beginner", "Advanced"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Evening )", time: "5:00 PM to 6:00 PM",
          classes: ["Hatha Yoga", "Breathwork & Meditation"], levels: ["Beginner", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-2.webp",
          trainerAlt: "Lena Thompson",
        },
      ],
    },

    {
      id: "mon",
      name: "Monday",
      items: [
        {
          timeOfDay: "( Morning )", time: "6:00 AM to 7:00 AM",
          classes: ["Power Yoga", "Pranayama & Meditation"], levels: ["Beginner", "Intermediate"],
          trainer: "James Carter", trainerImage: "/home-trainer-2.webp",
        },
        {
          timeOfDay: "( Morning )", time: "7:00 AM to 8:00 AM",
          classes: ["Yin Yoga", "Vinyasa Flow"], levels: ["Intermediate", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-3.webp",
        },
        {
          timeOfDay: "( Morning )", time: "8:00 AM to 9:00 AM",
          classes: ["Hatha Yoga", "Vinyasa Flow"], levels: ["Beginner", "All Levels"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Evening )", time: "4:00 PM to 5:00 PM",
          classes: ["Restorative Yoga", "Power Yoga"], levels: ["Beginner", "Advanced"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Evening )", time: "5:00 PM to 6:00 PM",
          classes: ["Hatha Yoga", "Breathwork & Meditation"], levels: ["Beginner", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-2.webp",
        },
      ],
    },

    {
      id: "tue",
      name: "Tuesday",
      items: [
        {
          timeOfDay: "( Morning )", time: "6:00 AM to 7:00 AM",
          classes: ["Hatha Yoga", "Vinyasa Flow"], levels: ["Beginner", "Intermediate"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Morning )", time: "7:00 AM to 8:00 AM",
          classes: ["Yin Yoga", "Vinyasa Flow"], levels: ["Beginner", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-3.webp",
        },
        {
          timeOfDay: "( Morning )", time: "8:00 AM to 9:00 AM",
          classes: ["Power Yoga", "Pranayama & Meditation"], levels: ["Intermediate", "All Levels"],
          trainer: "James Carter", trainerImage: "/home-trainer-2.webp",
        },
        {
          timeOfDay: "( Evening )", time: "4:00 PM to 5:00 PM",
          classes: ["Restorative Yoga", "Power Yoga"], levels: ["Beginner", "Advanced"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Evening )", time: "5:00 PM to 6:00 PM",
          classes: ["Hatha Yoga", "Breathwork & Meditation"], levels: ["Beginner", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-2.webp",
        },
      ],
    },

    {
      id: "wed",
      name: "Wednesday",
      items: [
        {
          timeOfDay: "( Morning )", time: "6:00 AM to 7:00 AM",
          classes: ["Hatha Yoga", "Vinyasa Flow"], levels: ["Beginner", "Intermediate"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Morning )", time: "7:00 AM to 8:00 AM",
          classes: ["Power Yoga", "Pranayama & Meditation"], levels: ["Intermediate", "All Levels"],
          trainer: "James Carter", trainerImage: "/home-trainer-2.webp",
        },
        {
          timeOfDay: "( Morning )", time: "8:00 AM to 9:00 AM",
          classes: ["Yin Yoga", "Vinyasa Flow"], levels: ["Beginner", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-3.webp",
        },
        {
          timeOfDay: "( Evening )", time: "4:00 PM to 5:00 PM",
          classes: ["Restorative Yoga", "Power Yoga"], levels: ["Beginner", "Advanced"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Evening )", time: "5:00 PM to 6:00 PM",
          classes: ["Hatha Yoga", "Breathwork & Meditation"], levels: ["Beginner", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-2.webp",
        },
      ],
    },

    {
      id: "thu",
      name: "Thursday",
      items: [
        {
          timeOfDay: "( Morning )", time: "6:00 AM to 7:00 AM",
          classes: ["Power Yoga", "Pranayama & Meditation"], levels: ["Intermediate", "All Levels"],
          trainer: "James Carter", trainerImage: "/home-trainer-2.webp",
        },
        {
          timeOfDay: "( Morning )", time: "7:00 AM to 8:00 AM",
          classes: ["Hatha Yoga", "Vinyasa Flow"], levels: ["Beginner", "Intermediate"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Morning )", time: "8:00 AM to 9:00 AM",
          classes: ["Yin Yoga", "Vinyasa Flow"], levels: ["Beginner", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-3.webp",
        },
        {
          timeOfDay: "( Evening )", time: "4:00 PM to 5:00 PM",
          classes: ["Restorative Yoga", "Power Yoga"], levels: ["Beginner", "Advanced"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Evening )", time: "5:00 PM to 6:00 PM",
          classes: ["Hatha Yoga", "Breathwork & Meditation"], levels: ["Beginner", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-2.webp",
        },
      ],
    },

    {
      id: "fri",
      name: "Friday",
      items: [
        {
          timeOfDay: "( Morning )", time: "6:00 AM to 7:00 AM",
          classes: ["Hatha Yoga", "Vinyasa Flow"], levels: ["Beginner", "Intermediate"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Morning )", time: "7:00 AM to 8:00 AM",
          classes: ["Power Yoga", "Pranayama & Meditation"], levels: ["Intermediate", "All Levels"],
          trainer: "James Carter", trainerImage: "/home-trainer-2.webp",
        },
        {
          timeOfDay: "( Morning )", time: "8:00 AM to 9:00 AM",
          classes: ["Yin Yoga", "Vinyasa Flow"], levels: ["Beginner", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-3.webp",
        },
        {
          timeOfDay: "( Evening )", time: "4:00 PM to 5:00 PM",
          classes: ["Restorative Yoga", "Power Yoga"], levels: ["Beginner", "Advanced"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Evening )", time: "5:00 PM to 6:00 PM",
          classes: ["Hatha Yoga", "Breathwork & Meditation"], levels: ["Beginner", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-2.webp",
        },
      ],
    },

    {
      id: "sat",
      name: "Saturday",
      items: [
        {
          timeOfDay: "( Evening )", time: "6:00 PM to 7:00 PM",
          classes: ["Restorative Yoga", "Power Yoga"], levels: ["Beginner", "Advanced"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Evening )", time: "7:00 PM to 8:00 PM",
          classes: ["Hatha Yoga", "Breathwork & Meditation"], levels: ["Beginner", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-2.webp",
        },
        {
          timeOfDay: "( Morning )", time: "8:00 AM to 9:00 AM",
          classes: ["Hatha Yoga", "Vinyasa Flow"], levels: ["Beginner", "Intermediate"],
          trainer: "Sophie Bennett", trainerImage: "/home-trainer-1.webp",
        },
        {
          timeOfDay: "( Morning )", time: "4:00 AM to 5:00 AM",
          classes: ["Power Yoga", "Pranayama & Meditation"], levels: ["Intermediate", "All Levels"],
          trainer: "James Carter", trainerImage: "/home-trainer-2.webp",
        },
        {
          timeOfDay: "( Morning )", time: "5:00 AM to 6:00 AM",
          classes: ["Yin Yoga", "Vinyasa Flow"], levels: ["Beginner", "All Levels"],
          trainer: "Lena Thompson", trainerImage: "/home-trainer-3.webp",
        },
      ],
    },
];
