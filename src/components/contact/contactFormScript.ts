declare const AOS: any;

export const initContactForm = () => {
    const form = document.querySelector<HTMLFormElement>("#book-class-form");

    if (!form) return;

    if (form.dataset.initialized === "true") return;

    form.dataset.initialized = "true";

    const fields = Array.from(
        form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
            "input[required], textarea[required]"
        )
    );

    const errorEls = new Map<HTMLElement, HTMLElement>();

    const getMessage = (
        field: HTMLInputElement | HTMLTextAreaElement
    ): string => {
        const value = field.value.trim();

        if (!value) {
            return "This field is required.";
        }

        if (
            field instanceof HTMLInputElement &&
            field.type === "email" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
            return "Please enter a valid email address.";
        }

        if (
            field.classList.contains("phone-input") &&
            !/^\d{10}$/.test(value)
        ) {
            return "Phone number must be exactly 10 digits.";
        }

        return "";
    };

    const validateField = (
        field: HTMLInputElement | HTMLTextAreaElement
    ): boolean => {
        const message = getMessage(field);
        let error = errorEls.get(field);

        if (message) {
            if (!error) {
                error = document.createElement("p");
                error.className = "field-error";
                error.style.color = "#ef4444";
                error.style.fontSize = "14px";
                error.style.marginTop = "6px";
                error.setAttribute("role", "alert");

                field.insertAdjacentElement("afterend", error);
                errorEls.set(field, error);
            }

            error.textContent = message;
            field.style.setProperty(
                "border-color",
                "#ef4444",
                "important"
            );
            field.setAttribute("aria-invalid", "true");

            return false;
        }

        error?.remove();
        errorEls.delete(field);

        field.style.removeProperty("border-color");
        field.removeAttribute("aria-invalid");

        return true;
    };

    // Phone: digits only, maximum 10 digits.
    const phoneInput =
        form.querySelector<HTMLInputElement>(".phone-input");

    phoneInput?.addEventListener("input", () => {
        phoneInput.value = phoneInput.value
            .replace(/\D/g, "")
            .slice(0, 10);
    });

    // Live validation.
    fields.forEach((field) => {
        ["input", "change"].forEach((eventName) => {
            field.addEventListener(eventName, () => {
                if (errorEls.has(field)) {
                    validateField(field);
                }
            });
        });
    });

    // Submit ONLY to console.log.
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let firstInvalid:
            | HTMLInputElement
            | HTMLTextAreaElement
            | null = null;

        for (const field of fields) {
            if (!validateField(field) && !firstInvalid) {
                firstInvalid = field;
            }
        }

        if (firstInvalid) {
            firstInvalid.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            firstInvalid.focus({
                preventScroll: true,
            });

            return;
        }

        const data: Record<string, string | boolean> = {};

        new FormData(form).forEach((value, key) => {
            data[key] = String(value);
        });

        data.condition =
            form.querySelector<HTMLInputElement>("#condition")?.checked ??
            false;

        data.information =
            form.querySelector<HTMLInputElement>("#information")
                ?.checked ?? false;

        console.log("CONTACT FORM SUBMITTED:", data);

        form.reset();

        errorEls.forEach((error) => error.remove());
        errorEls.clear();

        fields.forEach((field) => {
            field.style.removeProperty("border-color");
            field.removeAttribute("aria-invalid");
        });
    });
};

initContactForm();

document.addEventListener("astro:page-load", initContactForm);

if (typeof AOS !== "undefined") {
    AOS.init({ offset: 60 });
}
