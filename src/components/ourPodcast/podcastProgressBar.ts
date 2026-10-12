export const formatPodcastTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};

export const updatePodcastProgressUI = (
  audio: HTMLAudioElement,
  progressBar: HTMLElement | null,
  progressFill: HTMLElement | null
) => {
  if (!progressBar) return;

  const duration = audio.duration;
  const currentTime = audio.currentTime;

  if (!Number.isFinite(duration) || duration <= 0) {
    return;
  }

  const percentage = Math.max(
    0,
    Math.min(100, (currentTime / duration) * 100)
  );

  progressBar.style.setProperty("--progress", `${percentage}%`);
  progressBar.setAttribute("aria-valuenow", String(Math.round(percentage)));

  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }
};

export const setupPodcastProgressBar = (
  audio: HTMLAudioElement,
  progressBar: HTMLElement | null,
  progressFill: HTMLElement | null,
  currentTimeElement: HTMLElement | null
) => {
  if (!progressBar) return { isDragging: () => false };

  let isDraggingProgress = false;

  const updateProgressFromPointer = (clientX: number) => {
    if (!progressBar || !Number.isFinite(audio.duration) || audio.duration <= 0) {
      return;
    }

    const rect = progressBar.getBoundingClientRect();
    if (rect.width <= 0) return;

    const percentage = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width)
    );

    const newTime = percentage * audio.duration;
    audio.currentTime = newTime;

    const percentageValue = percentage * 100;
    progressBar.style.setProperty("--progress", `${percentageValue}%`);
    progressBar.setAttribute("aria-valuenow", String(Math.round(percentageValue)));

    if (progressFill) {
      progressFill.style.width = `${percentageValue}%`;
    }

    if (currentTimeElement) {
      currentTimeElement.textContent = formatPodcastTime(newTime);
    }
  };

  progressBar.addEventListener("pointerdown", (event) => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;

    isDraggingProgress = true;
    progressBar.classList.add("is-dragging");

    try {
      progressBar.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture not available
    }

    updateProgressFromPointer(event.clientX);
  });

  progressBar.addEventListener("pointermove", (event) => {
    if (!isDraggingProgress) return;
    updateProgressFromPointer(event.clientX);
  });

  progressBar.addEventListener("pointerup", (event) => {
    if (!isDraggingProgress) return;
    isDraggingProgress = false;
    progressBar.classList.remove("is-dragging");

    try {
      progressBar.releasePointerCapture(event.pointerId);
    } catch {
      // Ignored
    }

    updatePodcastProgressUI(audio, progressBar, progressFill);
  });

  progressBar.addEventListener("pointercancel", () => {
    isDraggingProgress = false;
    progressBar.classList.remove("is-dragging");
    updatePodcastProgressUI(audio, progressBar, progressFill);
  });

  progressBar.addEventListener("keydown", (event) => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;

    let handled = true;
    switch (event.key) {
      case "ArrowLeft":
        audio.currentTime = Math.max(0, audio.currentTime - 5);
        break;
      case "ArrowRight":
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
        break;
      case "Home":
        audio.currentTime = 0;
        break;
      case "End":
        audio.currentTime = audio.duration;
        break;
      default:
        handled = false;
    }

    if (handled) {
      event.preventDefault();
      updatePodcastProgressUI(audio, progressBar, progressFill);
    }
  });

  return {
    isDragging: () => isDraggingProgress,
  };
};
