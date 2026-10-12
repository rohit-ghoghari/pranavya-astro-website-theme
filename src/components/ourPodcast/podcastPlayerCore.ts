export const setupPodcastControls = (
  audio: HTMLAudioElement,
  playButton: HTMLButtonElement,
  playIcon: HTMLElement | null,
  pauseIcon: HTMLElement | null,
  muteButton: HTMLButtonElement | null,
  volumeIcon: HTMLElement | null,
  mutedIcon: HTMLElement | null,
  speedButton: HTMLButtonElement | null,
  rewindButton: HTMLButtonElement | null,
  forwardButton: HTMLButtonElement | null,
  onProgressUpdate: () => void
) => {
  const updatePlayState = () => {
    const playing = !audio.paused;
    playIcon?.classList.toggle("hidden", playing);
    pauseIcon?.classList.toggle("hidden", !playing);
    playButton.setAttribute("aria-label", playing ? "Pause podcast" : "Play podcast");
  };

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      document.querySelectorAll<HTMLAudioElement>(".podcast-player audio").forEach((otherAudio) => {
        if (otherAudio !== audio) {
          otherAudio.pause();
        }
      });

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Unable to play podcast:", error);
        });
      }
    } else {
      audio.pause();
    }
  });

  muteButton?.addEventListener("click", () => {
    audio.muted = !audio.muted;
    volumeIcon?.classList.toggle("hidden", audio.muted);
    mutedIcon?.classList.toggle("hidden", !audio.muted);
    muteButton.setAttribute("aria-label", audio.muted ? "Unmute podcast" : "Mute podcast");
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
    onProgressUpdate();
  });

  forwardButton?.addEventListener("click", () => {
    const duration = Number.isFinite(audio.duration) ? audio.duration : Infinity;
    audio.currentTime = Math.min(duration, audio.currentTime + 10);
    onProgressUpdate();
  });

  return { updatePlayState };
};
