const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};

const initPodcastPlayers = (root: ParentNode = document): void => {
  const players = root.querySelectorAll<HTMLElement>(".podcast-player");

  players.forEach((player) => {
    if (player.dataset.initialized === "true") return;

    const audio = player.querySelector<HTMLAudioElement>("audio");
    const playButton = player.querySelector<HTMLButtonElement>(".play-btn");
    const playIcon = player.querySelector<HTMLElement>(".icon-play");
    const pauseIcon = player.querySelector<HTMLElement>(".icon-pause");
    const muteButton = player.querySelector<HTMLButtonElement>(".mute-btn");
    const volumeIcon = player.querySelector<HTMLElement>(".icon-volume");
    const mutedIcon = player.querySelector<HTMLElement>(".icon-muted");
    const speedButton = player.querySelector<HTMLButtonElement>(".speed-btn");
    const rewindButton = player.querySelector<HTMLButtonElement>(".rewind-btn");
    const forwardButton = player.querySelector<HTMLButtonElement>(".forward-btn");
    const progressBar = player.querySelector<HTMLElement>(".progress-bar");
    const progressFill = player.querySelector<HTMLElement>(".progress-fill");
    const currentTimeElement = player.querySelector<HTMLElement>(".current-time");
    const durationElement = player.querySelector<HTMLElement>(".duration");

    if (!audio || !playButton) return;

    player.dataset.initialized = "true";

    const updatePlayState = (): void => {
      const playing = !audio.paused;

      playIcon?.classList.toggle("hidden", playing);
      pauseIcon?.classList.toggle("hidden", !playing);

      playButton.setAttribute(
        "aria-label",
        playing ? "Pause podcast" : "Play podcast",
      );
    };

    const updateProgress = (): void => {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;

      const percentage = Math.max(
        0,
        Math.min(100, (audio.currentTime / audio.duration) * 100),
      );

      progressBar?.style.setProperty("--progress", `${percentage}%`);
      progressBar?.setAttribute("aria-valuenow", String(Math.round(percentage)));

      if (progressFill) {
        progressFill.style.width = `${percentage}%`;
      }

      if (currentTimeElement) {
        currentTimeElement.textContent = formatTime(audio.currentTime);
      }

      if (durationElement) {
        durationElement.textContent = formatTime(audio.duration);
      }
    };

    const seekFromPointer = (clientX: number): void => {
      if (!progressBar || !Number.isFinite(audio.duration) || audio.duration <= 0) {
        return;
      }

      const rect = progressBar.getBoundingClientRect();
      if (rect.width <= 0) return;

      const percentage = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width),
      );

      audio.currentTime = percentage * audio.duration;
      updateProgress();
    };

    playButton.addEventListener("click", () => {
      if (!audio.paused) {
        audio.pause();
        return;
      }

      document
        .querySelectorAll<HTMLAudioElement>(".podcast-player audio")
        .forEach((otherAudio) => {
          if (otherAudio !== audio) otherAudio.pause();
        });

      void audio.play().catch((error: unknown) => {
        console.error("Unable to play podcast:", error);
      });
    });

    audio.addEventListener("play", updatePlayState);
    audio.addEventListener("pause", updatePlayState);
    audio.addEventListener("ended", updatePlayState);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("durationchange", updateProgress);

    muteButton?.addEventListener("click", () => {
      audio.muted = !audio.muted;

      volumeIcon?.classList.toggle("hidden", audio.muted);
      mutedIcon?.classList.toggle("hidden", !audio.muted);

      muteButton.setAttribute(
        "aria-label",
        audio.muted ? "Unmute podcast" : "Mute podcast",
      );
    });

    speedButton?.addEventListener("click", () => {
      const speeds = [1, 1.25, 1.5, 1.75, 2];
      const currentIndex = speeds.indexOf(audio.playbackRate);
      const nextSpeed = speeds[(currentIndex + 1) % speeds.length];

      audio.playbackRate = nextSpeed;
      speedButton.dataset.speed = String(nextSpeed);
      speedButton.setAttribute("aria-label", `Playback speed ${nextSpeed}x`);
    });

    rewindButton?.addEventListener("click", () => {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
      updateProgress();
    });

    forwardButton?.addEventListener("click", () => {
      const duration = Number.isFinite(audio.duration) ? audio.duration : Infinity;
      audio.currentTime = Math.min(duration, audio.currentTime + 10);
      updateProgress();
    });

    let dragging = false;

    progressBar?.addEventListener("pointerdown", (event: PointerEvent) => {
      dragging = true;
      progressBar.classList.add("is-dragging");
      progressBar.setPointerCapture(event.pointerId);
      seekFromPointer(event.clientX);
    });

    progressBar?.addEventListener("pointermove", (event: PointerEvent) => {
      if (dragging) seekFromPointer(event.clientX);
    });

    const stopDragging = (): void => {
      dragging = false;
      progressBar?.classList.remove("is-dragging");
    };

    progressBar?.addEventListener("pointerup", stopDragging);
    progressBar?.addEventListener("pointercancel", stopDragging);
    progressBar?.addEventListener("lostpointercapture", stopDragging);

    progressBar?.addEventListener("keydown", (event: KeyboardEvent) => {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
        updateProgress();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        audio.currentTime = Math.max(0, audio.currentTime - 5);
        updateProgress();
      } else if (event.key === "Home") {
        event.preventDefault();
        audio.currentTime = 0;
        updateProgress();
      } else if (event.key === "End") {
        event.preventDefault();
        audio.currentTime = audio.duration;
        updateProgress();
      }
    });

    progressBar?.style.setProperty("--progress", "0%");
    progressBar?.setAttribute("aria-valuenow", "0");
    updatePlayState();
  });
};

initPodcastPlayers();

document.addEventListener("astro:page-load", () => {
  initPodcastPlayers();
});
