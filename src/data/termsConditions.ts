export interface ContentBlock {
    type: "paragraph" | "list" | "heading";
    content?: string;
    items?: string[];
    class?: string;
    link?: {
        href: string;
        text: string;
        target?: string;
    };
}


export const defaultTermsContent: ContentBlock[] = [
        {
            type: "paragraph",
            content:
                "Welcome to Pranavya Yoga. By accessing our website, attending our classes, or using any of our online or in-person services, you agree to comply with and be bound by these Terms & Conditions.",
            class: "pl-0! 1xl:pt-10! xl:pt-7! md:pt-5! pt-3!",
        },
        {
            type: "paragraph",
            content:
                "Please read them carefully before participating in any of our offerings.",
            class: "pl-0!",
        },

        {
            type: "heading",
            content: "1. Acceptance of Terms",
        },
        {
            type: "paragraph",
            content:
                "By using this website or registering for classes, you agree to these Terms & Conditions and our Privacy Policy. If you do not agree with any part of these terms, please discontinue use of our website and services.",
        },

        {
            type: "heading",
            content: "2. About Pranavya Yoga",
        },
        {
            type: "paragraph",
            content:
                "Pranavya Yoga is a wellness platform dedicated to offering yoga classes, retreats, workshops, and mindfulness content to individuals worldwide — both in-person and online. Our mission is to help you achieve physical balance, mental clarity, and spiritual growth through authentic yoga practices.",
        },

        {
            type: "heading",
            content: "3. Eligibility",
        },
        {
            type: "paragraph",
            content:
                "You must be at least 18 years old to use our website or participate in our programs. If you are under 18, you may access our services only with parental or guardian consent.",
        },

        {
            type: "heading",
            content: "4. Services Offered",
        },
        {
            type: "paragraph",
            content: "We provide:",
        },
        {
            type: "list",
            items: [
                "In-studio and online yoga classes",
                "Yoga teacher training programs",
                "Workshops, events, and wellness retreats",
                "Mindfulness and meditation resources",
                "Yoga-related educational materials",
            ],
        },
        {
            type: "paragraph",
            content:
                "We reserve the right to modify, suspend, or discontinue any of our services at any time without prior notice.",
        },

        {
            type: "heading",
            content: "5. User Responsibilities",
        },
        {
            type: "paragraph",
            content: "You agree to:",
        },
        {
            type: "list",
            items: [
                "Provide accurate, up-to-date personal information during registration or booking.",
                "Use our website only for lawful and respectful purposes.",
                "Refrain from sharing your account details or passwords with others.",
                "Follow all health, safety, and class participation guidelines.",
            ],
        },
        {
            type: "paragraph",
            content:
                "Any misuse or violation of these terms may result in suspension or termination of access.",
        },

        {
            type: "heading",
            content: "6. Health Disclaimer",
        },
        {
            type: "paragraph",
            content:
                "Yoga involves physical activity that requires care and self-awareness. By participating in any class or event, you acknowledge:",
        },
        {
            type: "list",
            items: [
                "You are physically fit and understand your own limitations.",
                "You have consulted a healthcare professional before starting any new exercise program.",
                "Pranavya Yoga, its instructors, and staff are not liable for injuries, illnesses, or damages unless caused by proven negligence.",
            ],
        },
        {
            type: "paragraph",
            content:
                "Your participation is entirely voluntary and at your own risk.",
        },

        {
            type: "heading",
            content: "7. Bookings, Payments & Refunds",
        },
        {
            type: "list",
            items: [
                "All bookings must be made through www.pranavyayoga.com or authorized platforms.",
                "Full payment is required at the time of booking.",
                "Refunds and cancellations are subject to our Cancellation Policy.",
                "Class passes, memberships, or event tickets are non-transferable unless specified.",
                "Pranavya Yoga reserves the right to cancel or reschedule any session due to unforeseen circumstances (e.g., instructor illness, technical issues, or low enrollment).",
            ],
        },

        {
            type: "heading",
            content: "8. Intellectual Property",
        },
        {
            type: "paragraph",
            content:
                "All content on this website — including text, images, graphics, videos, logos, and teaching materials — is the exclusive property of Pranavya Yoga. Unauthorized reproduction, distribution, modification, or resale of any materials is strictly prohibited.",
        },

        {
            type: "heading",
            content: "9. Use of Website",
        },
        {
            type: "paragraph",
            content: "You agree not to:",
        },
        {
            type: "list",
            items: [
                "Upload malicious software or attempt to hack or disrupt the site.",
                "Use this platform for advertising or commercial solicitation.",
                "Use this platform for advertising or commercial solicitation.",
            ],
        },
        {
            type: "paragraph",
            content:
                "Any misuse or violation of these terms may result in suspension or termination of access.",
        },

        {
            type: "heading",
            content: "10. Third-Party Services and Links",
        },
        {
            type: "paragraph",
            content:
                "Our website may include links to external websites or third-party services (like payment gateways or video platforms). Pranavya Yoga is not responsible for their content, privacy practices, or policies. We encourage you to review those sites’ terms independently.",
        },

        {
            type: "heading",
            content: "11. Limitation of Liability",
        },
        {
            type: "paragraph",
            content:
                "Pranavya Yoga shall not be held liable for:",
        },
        {
            type: "list",
            items: [
                "Any indirect, incidental, or consequential damages.",
                "Injuries, data loss, or service interruptions.",
                "Failures or errors caused by third-party integrations or internet connectivity issues.",
            ],
        },
        {
            type: "paragraph",
            content:
                "Your sole remedy for dissatisfaction is to discontinue using our services.",
        },

        {
            type: "heading",
            content: "12. Indemnification",
        },
        {
            type: "paragraph",
            content:
                "You agree to indemnify and hold harmless Pranavya Yoga, its instructors, employees, and affiliates from any claims, losses, or damages resulting from your use of the website or participation in classes or events.",
        },

        {
            type: "heading",
            content: "13. Changes to Terms",
        },
        {
            type: "paragraph",
            content:
                "We may update these Terms & Conditions periodically to reflect changes in our practices or legal requirements. All updates will be posted on this page with a revised “Last Updated” date. Continued use of our website signifies your acceptance of any modified terms.",
        },

        {
            type: "heading",
            content: "14. Governing Law",
        },
        {
            type: "paragraph",
            content:
                "These Terms shall be governed by and interpreted in accordance with the laws of [Insert Country/State Name].",
        },
        {
            type: "paragraph",
            content:
                "Any disputes shall be subject to the exclusive jurisdiction of the courts located in [Insert City/State].",
        },

        {
            type: "heading",
            content: "15. Contact Information",
        },
        {
            type: "paragraph",
            content:
                "If you have any questions, concerns, or feedback regarding these Terms & Conditions, please contact us at:",
        },
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
                target: "_blank",
            },
        },
    ];
