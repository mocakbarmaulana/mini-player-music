const musicBox = document.querySelector(".inner-width");
const btnPlay = document.querySelector(".btn-play");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const audio = document.querySelector("#audio");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const title = document.querySelector(".title");
const time = document.querySelector(".time");
const cover = document.querySelector(".img-thumbnail");

// Song Title
const songs = ["bensound-adventure", "bensound-clearday", "bensound-moose"];

// Track index song.
let songIndex = 1;

// Initialy load song.
loadsong(songs[songIndex]);

// Update song title
function loadsong(song) {
  title.innerHTML = `Track ${songIndex + 1} - ${song}`;
  audio.src = `./audios/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
}

audio.onloadedmetadata = () => {
  const m = parseInt(audio.duration / 60);
  const s = parseInt(audio.duration % 60);

  time.innerHTML = `Time ${m}:${s} minutes`;
};

// play song
function playSong() {
  musicBox.classList.add("play");
  btnPlay.querySelector(".fas").classList.remove("fa-play");
  btnPlay.querySelector(".fas").classList.add("fa-pause");
  btnPlay.style.paddingLeft = 0;

  audio.play();
}

// Pause Song
function pauseSong() {
  musicBox.classList.remove("play");
  btnPlay.querySelector(".fas").classList.remove("fa-pause");
  btnPlay.querySelector(".fas").classList.add("fa-play");
  btnPlay.style.paddingLeft = "5px";

  audio.pause();
}

// Progress Update song.
const updateProgress = (e) => {
  const { currentTime, duration } = e.srcElement;
  const percentaseTime = (currentTime / duration) * 100;
  progress.style.width = `${percentaseTime}%`;
};

// Container progres bar.
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Prev Song
const prevSong = () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadsong(songs[songIndex]);

  playSong();
};

// Next Song
const nextSong = () => {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadsong(songs[songIndex]);

  playSong();
};

// Event listeners
btnPlay.addEventListener("click", () => {
  const isPlaying = musicBox.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song event
btnPrev.addEventListener("click", prevSong);
btnNext.addEventListener("click", () => nextSong());

// Progres Bar
audio.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
