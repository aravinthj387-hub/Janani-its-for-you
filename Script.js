const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const disc = document.getElementById("disc");

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playIcon.textContent = "❚❚";
    disc.classList.add("playing");
  } else {
    audio.pause();
    playIcon.textContent = "▶";
    disc.classList.remove("playing");
  }
});

audio.addEventListener("loadedmetadata", () => {
  progress.max = audio.duration;
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progress.value = audio.currentTime;
  current.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

audio.addEventListener("ended", () => {
  playIcon.textContent = "▶";
  disc.classList.remove("playing");
  progress.value = 0;
});

function formatTime(seconds) {
  if (!isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins + ":" + String(secs).padStart(2, "0");
}
