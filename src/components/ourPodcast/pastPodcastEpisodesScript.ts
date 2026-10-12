export const initPastPodcastEpisodes = () => {
  const section =
    document.querySelector<HTMLElement>("#past-podcast-episodes") ?? document;
  const featuredVideo = document.querySelector<HTMLVideoElement>("#featuredVideo");
  const featuredEpisodeNo = document.querySelector<HTMLElement>("#featuredEpisodeNo");
  const featuredTitle = document.querySelector<HTMLElement>("#featuredTitle");
  const featuredDesc = document.querySelector<HTMLElement>("#featuredDesc");
  const featuredTime = document.querySelector<HTMLElement>("#featuredTime");
  const featuredName = document.querySelector<HTMLElement>("#featuredName");
  const episodeCards = section.querySelectorAll<HTMLElement>(".episode-card");
  const revealMoreButton = section.querySelector<HTMLButtonElement>(
    "#pastPodcastRevealMore, .past-podcast-reveal, .reveal-more"
  );

  /* ---------------- UPDATE FEATURED EPISODE ---------------- */
  const selectEpisode = (card: HTMLElement, autoplay = true) => {
    if (!featuredVideo) return;

    const episodeNo = card.dataset.episode ?? "";
    const title = card.querySelector<HTMLElement>(".episode-title")?.textContent?.trim() ?? "";
    const description = card.querySelector<HTMLElement>(".episode-desc")?.textContent?.trim() ?? "";
    const duration = card.querySelector<HTMLElement>(".episode-time")?.textContent?.trim() ?? "";
    const artist = card.querySelector<HTMLElement>(".episode-name")?.textContent?.trim() ?? "";
    const videoSrc =
      card.querySelector<HTMLSourceElement>(".episode-video-src source")?.getAttribute("src") ?? "";

    if (featuredEpisodeNo) featuredEpisodeNo.textContent = `Episode-${episodeNo}`;
    if (featuredTitle) featuredTitle.textContent = title;
    if (featuredDesc) featuredDesc.textContent = description;
    if (featuredTime) featuredTime.textContent = duration;
    if (featuredName) featuredName.textContent = artist;

    if (videoSrc) {
      featuredVideo.pause();
      featuredVideo.src = videoSrc;
      featuredVideo.currentTime = 0;
      featuredVideo.load();

      if (autoplay) {
        featuredVideo.play()?.catch((error) => {
          console.warn("Featured podcast video could not autoplay:", error);
        });
      }
    }

    featuredVideo.dataset.episode = episodeNo;
  };

  /* ---------------- EPISODE CARD CLICK ---------------- */
  episodeCards.forEach((card) => {
    if (card.dataset.initialized === "true") return;
    card.dataset.initialized = "true";

    card.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.closest("video")) return;
      selectEpisode(card, true);
    });
  });

  /* ---------------- REVEAL MORE ---------------- */
  if (revealMoreButton && revealMoreButton.dataset.initialized !== "true") {
    revealMoreButton.dataset.initialized = "true";

    revealMoreButton.addEventListener("click", () => {
      const hiddenCards = section.querySelectorAll<HTMLElement>(
        ".episode-card.is-hidden, .episode-card[data-extra='true']"
      );

      hiddenCards.forEach((card) => {
        card.classList.remove("is-hidden");
        card.removeAttribute("data-extra");
        card.style.display = "";
        card.style.removeProperty("display");
        card.classList.add("aos-animate");
      });

      revealMoreButton.style.display = "none";

      const aosGlobal = (window as unknown as { AOS?: { refresh?: () => void } }).AOS;
      aosGlobal?.refresh?.();
    });
  }
};

/* Initial load + Astro client-side navigation */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPastPodcastEpisodes);
} else {
  initPastPodcastEpisodes();
}
document.addEventListener("astro:page-load", initPastPodcastEpisodes);
