export interface DropdownOption {
    label: string;
    value?: string;
}

export interface DropdownData {
    name: string;
    placeholder: string;
    options: DropdownOption[];
    required?: boolean;
    arrowClass?: string;
    menuClass?: string;
}

export const defaultGenderOptions: DropdownOption[] = [
    { label: "Male" },
    { label: "Female" },
];

export const defaultCountryOptions: DropdownOption[] = [
    { label: "India" },
    { label: "USA" },
    { label: "Canada" },
    { label: "Germany" },
];

export const defaultStateOptions: DropdownOption[] = [
    { label: "Gujarat" },
    { label: "Haryana" },
    { label: "Punjab" },
    { label: "Uttar Pradesh" },
    { label: "Rajasthan" },
];

export const defaultCityOptions: DropdownOption[] = [
    { label: "Surat" },
    { label: "Pune" },
    { label: "Bengaluru" },
    { label: "Ahmedabad" },
];

export const defaultClassOptions: DropdownOption[] = [
    { label: "Hatha Yoga" },
    { label: "Vinyasa Flow" },
    { label: "Restorative Yoga" },
    { label: "Yin Yoga" },
    { label: "Power Yoga" },
    { label: "Kids Yoga" },
];

export const defaultTrainerOptions: DropdownOption[] = [
    { label: "Jessica Moore" },
    { label: "Emily Turner" },
    { label: "Michael Lee" },
    { label: "Michael Green" },
    { label: "Laura Bennet" },
];

export const defaultTimeSlotOptions: DropdownOption[] = [
    { label: "6:00 AM to 7:00 AM" },
    { label: "7:00 AM to 8:00 AM" },
    { label: "8:00 AM to 9:00 AM" },
    { label: "4:00 PM to 5:00 PM" },
    { label: "5:00 PM to 6:00 PM" },
];

export const defaultExperienceOptions: DropdownOption[] = [
    { label: "Beginner" },
    { label: "Advance" },
    { label: "Exprienced" },
];

export const defaultPaymentOptions: DropdownOption[] = [
    { label: "UPI" },
    { label: "Net Banking" },
    { label: "Credit/Debit Cards" },
    { label: "Bank Transfers" },
    { label: "Cash" },
];

export const defaultPlanOptions: DropdownOption[] = [
    { label: "Essence Plan" },
    { label: "Balance Plan" },
    { label: "Elevate Plan" },
];

export const defaultGatewayOptions: DropdownOption[] = [
    { label: "Gooogle Pay" },
    { label: "Paytm" },
    { label: "Phone Pay" },
    { label: "Amazon Pay" },
    { label: "Razorpay" },
];

export const createDropdownValue = (option: DropdownOption) =>
    option.value ?? option.label;
