export function initEventsSchedule() {
  const scheduleTabs = document.querySelectorAll<HTMLButtonElement>(".schedule-tab");
  const schedulePanels = document.querySelectorAll<HTMLElement>(".schedule-panel");

  // Tab Buttons
  scheduleTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.target;
      if (!target) return;

      scheduleTabs.forEach((item) => {
        item.classList.remove("is-active");
      });
      tab.classList.add("is-active");

      schedulePanels.forEach((panel) => {
        panel.classList.add("hidden");
      });

      const targetPanel = document.querySelector<HTMLElement>(target);
      if (targetPanel) {
        targetPanel.classList.remove("hidden");
      }
    });
  });

  // ALL EVENTS - READ MORE
  const allReadMore = document.querySelector<HTMLButtonElement>("#all-read-more");
  const allHiddenEvents = document.querySelectorAll<HTMLElement>(".event-hidden");
  allReadMore?.addEventListener("click", () => {
    allHiddenEvents.forEach((event) => {
      event.classList.remove("hidden!");
    });
    document.querySelector("#all-read-more-wrapper")?.remove();
  });

  // UPCOMING EVENTS - READ MORE
  const upcomingReadMore = document.querySelector<HTMLButtonElement>("#upcoming-read-more");
  const upcomingHiddenEvents = document.querySelectorAll<HTMLElement>(".upcoming-event-hidden");
  upcomingReadMore?.addEventListener("click", () => {
    upcomingHiddenEvents.forEach((event) => {
      event.classList.remove("hidden!");
    });
    document.querySelector("#upcoming-read-more-wrapper")?.remove();
  });

  // PAST EVENTS - READ MORE
  const pastReadMore = document.querySelector<HTMLButtonElement>("#past-read-more");
  const pastHiddenEvents = document.querySelectorAll<HTMLElement>(".past-event-hidden");
  pastReadMore?.addEventListener("click", () => {
    pastHiddenEvents.forEach((event) => {
      event.classList.remove("hidden!");
    });
    document.querySelector("#past-read-more-wrapper")?.remove();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initEventsSchedule, { once: true });
} else {
  initEventsSchedule();
}
