// Event Detail video center button player script
export function initEventVideo() {
    const video = document.getElementById("eventVideo") as HTMLVideoElement | null;
    const playBtn = document.querySelector<HTMLElement>(".video-play");
    if (!video || !playBtn || video.dataset.videoInit === "true") return;
    video.dataset.videoInit = "true";

    const showBtn = () => {
        playBtn.style.display = "flex";
    };
    const hideBtn = () => {
        playBtn.style.display = "none";
    };

    playBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        video.setAttribute("controls", "");
        video.play();
        hideBtn();
    });

    video.addEventListener("pause", showBtn);
    video.addEventListener("ended", showBtn);
    video.addEventListener("play", hideBtn);

    if (!video.paused) hideBtn();
}

initEventVideo();
document.addEventListener("astro:page-load", initEventVideo);
