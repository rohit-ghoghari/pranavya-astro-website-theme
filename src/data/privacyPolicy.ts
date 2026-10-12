export interface PolicyBlock {
    type: "heading" | "paragraph" | "subheading" | "list";
    content?: string;
    items?: string[];
    class?: string;
    link?: {
        href: string;
        text: string;
        class?: string;
    };
}

export interface PolicySection {
    number: number;
    title: string;
    content: PolicyBlock[];
}


export const defaultPolicySections: PolicySection[] = [
        {
            number: 1,
            title: "Information We Collect",
            content: [
                {
                    type: "paragraph",
                    content:
                        "We collect different types of information to provide you with the best possible experience:",
                },
                {
                    type: "subheading",
                    content: "a. Personal Information",
                },
                {
                    type: "paragraph",
                    content:
                        "When you register, purchase, or contact us, we may collect:",
                },
                {
                    type: "list",
                    items: [
                        "Full Name",
                        "Email Address",
                        "Phone Number",
                        "Billing & Shipping Address",
                        "Payment Details (processed securely through trusted third-party gateways)",
                    ],
                },
                {
                    type: "subheading",
                    content: "b. Non-Personal Information",
                },
                {
                    type: "paragraph",
                    content:
                        "Automatically collected data may include:",
                },
                {
                    type: "list",
                    items: [
                        "Browser type and version",
                        "Device information (desktop, tablet, mobile)",
                        "IP address and general location",
                        "Pages visited, time spent, and navigation paths",
                    ],
                },
                {
                    type: "subheading",
                    content: "c. Sensitive Health Information",
                },
                {
                    type: "paragraph",
                    content:
                        "For yoga or wellness services, we may ask about your health or fitness level (optional) to ensure safe practice recommendations. This information is kept confidential and used only for class suitability and safety.",
                },
            ],
        },

        {
            number: 2,
            title: "How We Use Your Information",
            content: [
                {
                    type: "paragraph",
                    content:
                        "We use collected information to:",
                },
                {
                    type: "list",
                    items: [
                        "Process bookings, class registrations, and retreat payments",
                        "Provide customer support and respond to inquiries",
                        "Send updates, newsletters, and promotional offers (only if you’ve subscribed)",
                        "Personalize your experience on our website",
                        "Improve class offerings, content, and digital performance",
                        "Ensure compliance with legal obligations and security standards",
                    ],
                },
                {
                    type: "paragraph",
                    content:
                        "We do not sell, rent, or trade your personal information.",
                },
            ],
        },

        {
            number: 3,
            title: "Cookies and Tracking Technologies",
            content: [
                {
                    type: "paragraph",
                    content:
                        "We use cookies and similar technologies to:",
                },
                {
                    type: "list",
                    items: [
                        "Maintain user sessions and remember login details",
                        "Track analytics (via tools like Google Analytics)",
                        "Improve site usability and personalize content",
                    ],
                },
                {
                    type: "paragraph",
                    content:
                        "You can choose to disable cookies through your browser settings, but some features may not function as intended.",
                },
            ],
        },

        {
            number: 4,
            title: "Data Security",
            content: [
                {
                    type: "paragraph",
                    content:
                        "Your privacy is important to us. We implement:",
                },
                {
                    type: "list",
                    items: [
                        "SSL encryption for all transactions",
                        "Restricted data access to authorized staff only",
                        "Regular system monitoring for vulnerabilities",
                    ],
                },
                {
                    type: "paragraph",
                    content:
                        "However, please note that no online platform can guarantee 100% security. You use our website at your own risk.",
                },
            ],
        },

        {
            number: 5,
            title: "Data Retention",
            content: [
                {
                    type: "paragraph",
                    content:
                        "We retain your information only for as long as necessary:",
                },
                {
                    type: "list",
                    items: [
                        "To fulfill the purpose for which it was collected",
                        "To comply with legal or accounting requirements",
                        "To resolve disputes and enforce agreements",
                    ],
                },
                {
                    type: "paragraph",
                    content:
                        "After this period, your data is securely deleted or anonymized.",
                },
            ],
        },

        {
            number: 6,
            title: "Third-Party Services",
            content: [
                {
                    type: "paragraph",
                    content:
                        "We may share limited information with trusted third-party providers such as:",
                },
                {
                    type: "list",
                    items: [
                        "Payment gateways (e.g., Stripe, PayPal)",
                        "Email services (e.g., Mailchimp)",
                        "Analytics tools (e.g., Google Analytics)",
                    ],
                },
                {
                    type: "paragraph",
                    content:
                        "Each third party has its own privacy policy and complies with data protection laws.",
                },
                {
                    type: "paragraph",
                    content:
                        "We never authorize them to use your information for their own marketing.",
                },
            ],
        },

        {
            number: 7,
            title: "Your Rights",
            content: [
                {
                    type: "paragraph",
                    content:
                        "Depending on your location, you may have rights to:",
                },
                {
                    type: "list",
                    items: [
                        "Access the personal data we hold about you",
                        "Request correction or deletion of your data",
                        "Withdraw consent for marketing communications",
                        "Request data portability",
                    ],
                },
                {
                    type: "paragraph",
                    content:
                        "To exercise any of these rights, email us at hello@example.com.",
                    link: {
                        href: "mailto:hello@example.com",
                        text: "hello@example.com.",
                        class: "font-medium",
                    },
                },
            ],
        },

        {
            number: 8,
            title: "Children’s Privacy",
            content: [
                {
                    type: "paragraph",
                    content:
                        "Our website and services are not intended for children under 16 years of age.",
                },
                {
                    type: "paragraph",
                    content:
                        "We do not knowingly collect personal data from minors. If we learn that we have inadvertently received such data, we will delete it immediately.",
                },
            ],
        },

        {
            number: 9,
            title: "Changes to This Policy",
            content: [
                {
                    type: "paragraph",
                    content:
                        "We may revise this Privacy Policy periodically. Updates will be posted on this page with a new “Last Updated” date. Continued use of our website means you accept those updates.",
                },
            ],
        },

        {
            number: 10,
            title: "Contact Us",
            content: [
                {
                    type: "paragraph",
                    content:
                        "If you have any questions, concerns, or requests related to privacy, please contact:",
                },
                {
                    type: "paragraph",
                    content: "Pranavya Yoga",
                    class: "font-medium",
                },
                {
                    type: "paragraph",
                    content: "Email:",
                    class: "font-medium",
                    link: {
                        href: "mailto:hello@example.com",
                        text: "hello@example.com",
                    },
                },
                {
                    type: "paragraph",
                    content: "Call:",
                    class: "font-medium",
                    link: {
                        href: "tel:+15559876543",
                        text: " +1 (555) 987-6543",
                    },
                },
                {
                    type: "paragraph",
                    content: "Address:",
                    class: "font-medium",
                    link: {
                        href: "https://www.google.com/maps?q=108+Serenity+Street,+Bliss+City,+NY",
                        text: "108 Serenity Street, Bliss City, NY",
                    },
                },
            ],
        },
    ];
