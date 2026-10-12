import {
  formatPodcastTime,
  updatePodcastProgressUI,
  setupPodcastProgressBar,
} from "./podcastProgressBar";
import { setupPodcastControls } from "./podcastPlayerCore";

const initPodcastPlayers = () => {
  const players = document.querySelectorAll<HTMLElement>(".podcast-player");

  players.forEach((player) => {
    if (player.dataset.initialized === "true") return;
    player.dataset.initialized = "true";

    const audio = player.querySelector<HTMLAudioElement>("audio");
    const playButton = player.querySelector<HTMLButtonElement>("button.play-btn, .play-btn");
    const playIcon = player.querySelector<HTMLElement>(".icon-play");
    const pauseIcon = player.querySelector<HTMLElement>(".icon-pause");
    const muteButton = player.querySelector<HTMLButtonElement>("button.mute-btn, .mute-btn");
    const volumeIcon = player.querySelector<HTMLElement>(".icon-volume");
    const mutedIcon = player.querySelector<HTMLElement>(".icon-muted");
    const speedButton = player.querySelector<HTMLButtonElement>("button.speed-btn, .speed-btn");
    const rewindButton = player.querySelector<HTMLButtonElement>("button.rewind-btn, .rewind-btn");
    const forwardButton = player.querySelector<HTMLButtonElement>("button.forward-btn, .forward-btn");
    const progressBar = player.querySelector<HTMLElement>(".progress-bar");
    const progressFill = player.querySelector<HTMLElement>(".progress-fill");
    const currentTimeElement = player.querySelector<HTMLElement>(".current-time");
    const durationElement = player.querySelector<HTMLElement>(".duration");

    if (!audio || !playButton) return;

    const { isDragging } = setupPodcastProgressBar(
      audio,
      progressBar,
      progressFill,
      currentTimeElement
    );

    const { updatePlayState } = setupPodcastControls(
      audio,
      playButton,
      playIcon,
      pauseIcon,
      muteButton,
      volumeIcon,
      mutedIcon,
      speedButton,
      rewindButton,
      forwardButton,
      () => updatePodcastProgressUI(audio, progressBar, progressFill)
    );

    audio.addEventListener("loadedmetadata", () => {
      if (durationElement) {
        durationElement.textContent = formatPodcastTime(audio.duration);
      }
      if (currentTimeElement) {
        currentTimeElement.textContent = formatPodcastTime(audio.currentTime);
      }
      updatePodcastProgressUI(audio, progressBar, progressFill);
    });

    audio.addEventListener("timeupdate", () => {
      const current = audio.currentTime;
      const duration = audio.duration;

      if (currentTimeElement) {
        currentTimeElement.textContent = formatPodcastTime(current);
      }
      if (durationElement && Number.isFinite(duration)) {
        durationElement.textContent = formatPodcastTime(duration);
      }
      if (!isDragging()) {
        updatePodcastProgressUI(audio, progressBar, progressFill);
      }
    });

    audio.addEventListener("play", updatePlayState);
    audio.addEventListener("pause", updatePlayState);
    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      updatePlayState();
      if (progressFill) progressFill.style.width = "0%";
      if (progressBar) {
        progressBar.style.setProperty("--progress", "0%");
        progressBar.setAttribute("aria-valuenow", "0");
      }
      if (currentTimeElement) currentTimeElement.textContent = "0:00";
    });

    progressBar?.style.setProperty("--progress", "0%");
    progressBar?.setAttribute("aria-valuenow", "0");
    updatePlayState();
  });
};

const initRevealMore = () => {
  const section =
    document.querySelector<HTMLElement>("#featured-podcasts") ?? document;
  const button = section.querySelector<HTMLButtonElement>(".reveal-more");
  if (!button || button.dataset.initialized === "true") return;

  button.dataset.initialized = "true";

  button.addEventListener("click", () => {
    section
      .querySelectorAll<HTMLElement>('.podcast-card[data-extra="true"]')
      .forEach((card) => {
        card.removeAttribute("data-extra");
      });

    button.style.display = "none";
    const aosGlobal = (window as unknown as { AOS?: { refresh?: () => void } }).AOS;
    aosGlobal?.refresh?.();
  });
};

const initPodcast = () => {
  initPodcastPlayers();
  initRevealMore();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPodcast);
} else {
  initPodcast();
}
document.addEventListener("astro:page-load", initPodcast);
