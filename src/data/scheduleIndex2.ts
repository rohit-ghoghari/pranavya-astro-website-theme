export interface ScheduleItem {
    time: string; className: string;
    level: string; trainer: string;
}

export interface ScheduleDay {
    id: string;
    name: string;
    items: ScheduleItem[];
    tableClass?: string;
    theadClass?: string;
}

export const defaultScheduleIndex2: ScheduleDay[] = [
        {
            id: "sun",
            name: "Sunday",
            tableClass:
                "w-full border-collapse block md:table md:border border-[#673E2C33]",
            theadClass:
                "hidden md:table-header-group bg-whitesmoke-100",
            items: [
                {
                    time: "6:00 AM to 7:00 AM", className: "Vinyasa Flow",
                    level: "Beginner", trainer: "Sophia Bennett",
                },
                {
                    time: "7:00 AM to 8:00 AM", className: "Power Yoga",
                    level: "Intermediate", trainer: "James Carter",
                },
                {
                    time: "8:00 AM to 9:00 AM", className: "Yin Yoga",
                    level: "All Levels", trainer: "Sophia Bennett",
                },
                {
                    time: "4:00 PM to 5:00 PM", className: "Restorative Yoga",
                    level: "Intermediate", trainer: "Laura Thompson",
                },
                {
                    time: "5:00 PM to 6:00 PM", className: "Vinyasa Flow",
                    level: "All Levels", trainer: "Amelia Green",
                },
                {
                    time: "6:00 PM to 7:00 PM", className: "Hatha Yoga",
                    level: "Beginner", trainer: "Laura Thompson",
                },
            ],
        },

        {
            id: "mon",
            name: "Monday",
            tableClass:
                "w-full border-collapse block md:table border border-[#673E2C33]",
            theadClass:
                "block md:table-header-group bg-whitesmoke-100",
            items: [
                {
                    time: "6:00 AM to 7:00 AM", className: "Power Yoga",
                    level: "Intermediate", trainer: "James Carter",
                },
                {
                    time: "7:00 AM to 8:00 AM", className: "Vinyasa Flow",
                    level: "Beginner", trainer: "Sophia Bennett",
                },
                {
                    time: "8:00 PM to 9:00 AM", className: "Restorative Yoga",
                    level: "Intermediate", trainer: "Laura Thompson",
                },
                {
                    time: "4:00 AM to 5:00 PM", className: "Yin Yoga",
                    level: "All Levels", trainer: "Sophia Bennett",
                },
                {
                    time: "5:00 PM to 6:00 PM", className: "Hatha Yoga",
                    level: "Beginner", trainer: "Laura Thompson",
                },
                {
                    time: "6:00 PM to 7:00 PM", className: "Vinyasa Flow",
                    level: "All Levels", trainer: "Amelia Green",
                },
            ],
        },

        {
            id: "tue",
            name: "Tuesday",
            tableClass:
                "w-full border-collapse block md:table border border-[#673E2C33]",
            theadClass:
                "block md:table-header-group bg-whitesmoke-100",
            items: [
                {
                    time: "6:00 AM to 7:00 AM", className: "Yin Yoga",
                    level: "All Levels", trainer: "Sophia Bennett",
                },
                {
                    time: "7:00 AM to 8:00 AM", className: "Vinyasa Flow",
                    level: "Beginner", trainer: "Sophia Bennett",
                },
                {
                    time: "8:00 AM to 9:00 AM", className: "Power Yoga",
                    level: "Intermediate", trainer: "James Carter",
                },
                {
                    time: "4:00 PM to 5:00 PM", className: "Restorative Yoga",
                    level: "Intermediate", trainer: "Laura Thompson",
                },
                {
                    time: "5:00 PM to 6:00 PM", className: "Vinyasa Flow",
                    level: "All Levels", trainer: "Amelia Green",
                },
                {
                    time: "6:00 PM to 7:00 PM", className: "Hatha Yoga",
                    level: "Beginner", trainer: "Laura Thompson",
                },
            ],
        },

        {
            id: "wed",
            name: "Wednesday",
            tableClass:
                "w-full border-collapse block md:table border border-[#673E2C33]",
            theadClass:
                "block md:table-header-group bg-whitesmoke-100",
            items: [
                {
                    time: "6:00 AM to 7:00 AM", className: "Restorative Yoga",
                    level: "Intermediate", trainer: "Laura Thompson",
                },
                {
                    time: "7:00 AM to 8:00 AM", className: "Vinyasa Flow",
                    level: "All Levels", trainer: "Amelia Green",
                },
                {
                    time: "8:00 AM to 9:00 AM", className: "Hatha Yoga",
                    level: "Beginner", trainer: "Laura Thompson",
                },
                {
                    time: "4:00 PM to 5:00 PM", className: "Vinyasa Flow",
                    level: "Beginner", trainer: "Sophia Bennett",
                },
                {
                    time: "5:00 PM to 6:00 PM", className: "Power Yoga",
                    level: "Intermediate", trainer: "James Carter",
                },
                {
                    time: "6:00 PM to 7:00 PM", className: "Yin Yoga",
                    level: "All Levels", trainer: "Sophia Bennett",
                },
            ],
        },

        {
            id: "thu",
            name: "Thursday",
            tableClass:
                "w-full border-collapse block md:table border border-[#673E2C33]",
            theadClass:
                "block md:table-header-group bg-whitesmoke-100",
            items: [
                {
                    time: "6:00 AM to 7:00 AM", className: "Power Yoga",
                    level: "Intermediate", trainer: "James Carter",
                },
                {
                    time: "7:00 AM to 8:00 AM", className: "Yin Yoga",
                    level: "All Levels", trainer: "Sophia Bennett",
                },
                {
                    time: "8:00 AM to 9:00 AM", className: "Vinyasa Flow",
                    level: "Beginner", trainer: "Sophia Bennett",
                },
                {
                    time: "4:00 PM to 5:00 PM", className: "Restorative Yoga",
                    level: "Intermediate", trainer: "Laura Thompson",
                },
                {
                    time: "5:00 PM to 6:00 PM", className: "Vinyasa Flow",
                    level: "All Levels", trainer: "Amelia Green",
                },
                {
                    time: "6:00 PM to 7:00 PM", className: "Hatha Yoga",
                    level: "Beginner", trainer: "Laura Thompson",
                },
            ],
        },

        {
            id: "fri",
            name: "Friday",
            tableClass:
                "w-full border-collapse block md:table border border-[#673E2C33]",
            theadClass:
                "block md:table-header-group bg-whitesmoke-100",
            items: [
                {
                    time: "6:00 AM to 7:00 AM", className: "Yin Yoga",
                    level: "All Levels", trainer: "Sophia Bennett",
                },
                {
                    time: "7:00 PM to 8:00 AM", className: "Restorative Yoga",
                    level: "Intermediate", trainer: "Laura Thompson",
                },
                {
                    time: "8:00 AM to 9:00 AM", className: "Vinyasa Flow",
                    level: "Beginner", trainer: "Sophia Bennett",
                },
                {
                    time: "4:00 AM to 5:00 PM", className: "Power Yoga",
                    level: "Intermediate", trainer: "James Carter",
                },
                {
                    time: "5:00 PM to 6:00 PM", className: "Vinyasa Flow",
                    level: "All Levels", trainer: "Amelia Green",
                },
                {
                    time: "6:00 PM to 7:00 PM", className: "Hatha Yoga",
                    level: "Beginner", trainer: "Laura Thompson",
                },
            ],
        },

        {
            id: "sat",
            name: "Saturday",
            tableClass:
                "w-full border-collapse block md:table border border-[#673E2C33]",
            theadClass:
                "block md:table-header-group bg-whitesmoke-100",
            items: [
                {
                    time: "6:00 PM to 7:00 AM", className: "Hatha Yoga",
                    level: "Beginner", trainer: "Laura Thompson",
                },
                {
                    time: "7:00 PM to 8:00 AM", className: "Restorative Yoga",
                    level: "Intermediate", trainer: "Laura Thompson",
                },
                {
                    time: "8:00 AM to 9:00 AM", className: "Vinyasa Flow",
                    level: "Beginner", trainer: "Sophia Bennett",
                },
                {
                    time: "4:00 AM to 5:00 PM", className: "Power Yoga",
                    level: "Intermediate", trainer: "James Carter",
                },
                {
                    time: "6:00 AM to 7:00 PM", className: "Yin Yoga",
                    level: "All Levels", trainer: "Sophia Bennett",
                },
                {
                    time: "7:00 PM to 8:00 PM", className: "Vinyasa Flow",
                    level: "All Levels", trainer: "Amelia Green",
                },
            ],
        },
    ];
