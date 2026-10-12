import { initBookingSuccessPopup } from './bookClassPopup';
import { initBookClassDropdowns, closeDropdown, closeAllDropdowns } from './bookClassDropdowns';

    const initBookClassForm = () => {
        const form = document.querySelector<HTMLFormElement>("#book-class-form");

        if (!form) return;
        if (form.dataset.initialized === "true") return;
        form.dataset.initialized = "true";

        /*
         * ==========================================
         * VALIDATION HELPERS
         * ==========================================
         */

        const errorEls = new Map<HTMLInputElement, HTMLElement>();

        // Element that gets the red border / focus
        const getTarget = (field: HTMLInputElement): HTMLElement => {
            if (field.type === "hidden") {
                return (
                    field
                        .closest(".dropdown")
                        ?.querySelector<HTMLElement>(".dropdown-btn") ?? field
                );
            }
            return field;
        };

        // Element the error message is inserted after
        const getAnchor = (field: HTMLInputElement): HTMLElement => {
            if (field.type === "hidden") {
                return (field.closest(".dropdown") as HTMLElement) ?? field;
            }
            if (field.type === "checkbox") {
                return field.parentElement ?? field;
            }
            return field;
        };

        const getMessage = (field: HTMLInputElement): string => {
            const value = field.value.trim();

            if (field.type === "checkbox") {
                return field.checked ? "" : "Please accept this to continue.";
            }

            if (field.type === "hidden") {
                return value ? "" : "Please select an option.";
            }

            if (!value) {
                return field.type === "date"
                    ? "Please select a date."
                    : "This field is required.";
            }

            if (
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

        const setError = (field: HTMLInputElement, message: string) => {
            const target = getTarget(field);
            let error = errorEls.get(field);

            if (message) {
                if (!error) {
                    error = document.createElement("p");
                    error.className = "field-error";
                    error.style.color = "#ef4444";
                    error.style.fontSize = "14px";
                    error.style.marginTop = "6px";
                    error.setAttribute("role", "alert");
                    getAnchor(field).insertAdjacentElement("afterend", error);
                    errorEls.set(field, error);
                }

                error.textContent = message;

                if (field.type !== "checkbox") {
                    target.style.setProperty("border-color", "#ef4444", "important");
                }
                target.setAttribute("aria-invalid", "true");
            } else {
                error?.remove();
                errorEls.delete(field);
                target.style.removeProperty("border-color");
                target.removeAttribute("aria-invalid");
            }
        };

        const validateField = (field: HTMLInputElement): boolean => {
            const message = getMessage(field);
            setError(field, message);
            return message === "";
        };

        const requiredFields = Array.from(
            form.querySelectorAll<HTMLInputElement>("input[required]:not(:disabled)")
        );

        const dropdowns = Array.from(
            form.querySelectorAll<HTMLElement>(".dropdown")
        );

        /*
         * ==========================================
         * CUSTOM DROPDOWNS
         * ==========================================
         */

        initBookClassDropdowns(form, validateField);

        /*
         * ==========================================
         * PHONE NUMBER (digits only, max 10)
         * ==========================================
         */

        const phoneInput = form.querySelector<HTMLInputElement>(".phone-input");

        phoneInput?.addEventListener("input", () => {
            phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
        });

        /*
         * ==========================================
         * LIVE VALIDATION
         * Only re-checks fields that already show an error,
         * so the layout never shifts while the user is clicking
         * somewhere else (this is what broke dropdown clicks).
         * ==========================================
         */

        requiredFields.forEach((field) => {
            // Dropdowns validate themselves when an option is picked
            if (field.type === "hidden") return;

            if (field.type === "checkbox") {
                field.addEventListener("change", () => validateField(field));
                return;
            }

            ["input", "change"].forEach((eventName) => {
                field.addEventListener(eventName, () => {
                    if (errorEls.has(field)) validateField(field);
                });
            });
        });

        /*
         * ==========================================
         * FORM SUBMIT
         * ==========================================
         */

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            closeAllDropdowns();

            let firstInvalid: HTMLInputElement | null = null;

            for (const field of requiredFields) {
                if (!validateField(field) && !firstInvalid) {
                    firstInvalid = field;
                }
            }

            if (firstInvalid) {
                const target = getTarget(firstInvalid);

                target.scrollIntoView({ behavior: "smooth", block: "center" });
                target.focus({ preventScroll: true });

                return;
            }

            /* Collect form data */
            const formData = new FormData(form);
            const data: Record<string, string | boolean> = {};

            formData.forEach((value, key) => {
                data[key] = String(value);
            });

            data.condition = form.querySelector<HTMLInputElement>("#condition")?.checked ?? false;
            data.information = form.querySelector<HTMLInputElement>("#information")?.checked ?? false;
            data.updates = form.querySelector<HTMLInputElement>("#updates")?.checked ?? false;

            console.log("BOOK CLASS FORM SUBMITTED");
            console.log("Form Data:", data);
            console.table(data);

            /* Loading state */
            const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
            const submitText = submitButton?.querySelector<HTMLElement>(".submit-text");
            const submitLoader = submitButton?.querySelector<HTMLElement>(".submit-loader");

            if (submitButton) submitButton.disabled = true;

            submitText?.classList.add("hidden");

            if (submitLoader) {
                submitLoader.classList.remove("hidden");
                submitLoader.classList.add("flex");
            }

            /* Simulated request: replace with your real API call */
            await new Promise((resolve) => setTimeout(resolve, 1500));

            /* Remove loading state */
            if (submitButton) submitButton.disabled = false;

            submitLoader?.classList.add("hidden");
            submitLoader?.classList.remove("flex");
            submitText?.classList.remove("hidden");

            resetBookClassForm();

            /* Success popup */
            const successPopup = document.querySelector<HTMLElement>("#booking-success-popup");

            if (successPopup) {
                successPopup.classList.remove("hidden");
                successPopup.classList.add("flex");
                document.body.classList.add("overflow-hidden");
            }
        });

                /*
         * ==========================================
         * RESET FORM AFTER SUCCESS
         * ==========================================
         */

        const resetBookClassForm = () => {
            // Reset normal inputs, dates and checkboxes
            form.reset();

            // Reset all custom dropdowns
            dropdowns.forEach((dropdown) => {
                const button = dropdown.querySelector<HTMLButtonElement>(".dropdown-btn");
                const text = dropdown.querySelector<HTMLElement>(".dropdown-text");
                const hiddenInput = dropdown.querySelector<HTMLInputElement>('input[type="hidden"]');
                const items = dropdown.querySelectorAll<HTMLElement>(".dropdown-item");

                // Close dropdown
                closeDropdown(dropdown);

                // Clear hidden value
                if (hiddenInput) {
                    hiddenInput.value = "";
                }

                // Restore original placeholder text
                if (text) {
                    const placeholder = text.dataset.placeholder;

                    if (placeholder) {
                        text.textContent = placeholder;
                    }

                    text.classList.remove("text-thunder-100");
                    text.classList.add("text-thunder-100/50");
                }

                // Remove selected option
                items.forEach((item) => {
                    item.classList.remove("is-selected");
                });

                // Reset button state
                button?.removeAttribute("aria-invalid");
                button?.style.removeProperty("border-color");
            });

            // Remove all validation errors
            errorEls.forEach((error) => error.remove());
            errorEls.clear();

            // Remove any invalid state from fields
            requiredFields.forEach((field) => {
                const target = getTarget(field);

                target.style.removeProperty("border-color");
                target.removeAttribute("aria-invalid");
            });
        };

        initBookingSuccessPopup();
    };

    /* Initial page load */
    initBookClassForm();

    /* Astro View Transitions */
    document.addEventListener("astro:page-load", initBookClassForm);

