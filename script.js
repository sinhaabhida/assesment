const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const musicList = document.getElementById('music-items');

// Song titles
const songs = ['anewbeginning', 'creativeminds', 'littleidea', 'ukulele'];

// Render all the elements from the song list
songs.forEach(song => {
  const listItem = document.createElement('li');
  const aTag = document.createElement('a');
  aTag.setAttribute('class', 'music-item');
  aTag.setAttribute('draggable', 'true');
  aTag.appendChild(document.createTextNode(song));
  listItem.appendChild(aTag);
  musicList.appendChild(listItem);
});

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// handles start of drag
function handleDragStart(e) {
  e.dataTransfer.setData('text/html', this.innerHTML);
  return true;
}

function handleDragEnter(e) {
  e.preventDefault();
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');
}

function handleDragOver(e) {
  e.preventDefault();
  return false;
}

// Handle drop
function handleDrop(e) {
  e.stopPropagation();
  const songName = e.dataTransfer.getData('text/html')
  const index = songs.findIndex(name => name === songName);
  if(index !== -1){
    songIndex = index;
    loadSong(songs[songIndex]);

    playSong();
  }
  this.classList.remove('over');
  return false;
}



musicContainer.addEventListener('dragenter', handleDragEnter);
musicContainer.addEventListener('dragleave', handleDragLeave);
musicContainer.addEventListener('dragover', handleDragOver);
musicContainer.addEventListener("drop", handleDrop)

let items = document.querySelectorAll('.music-item');
items.forEach(function(item) {
  item.addEventListener('dragstart', handleDragStart);
});

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
