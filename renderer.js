const audioPlayer = document.getElementById('audio-player');
const musicTitle = document.querySelector('.music-title');
const seekBar = document.getElementById('seek-bar');
const pickMusicButton = document.getElementById('pick-music');
const addToPlaylistButton = document.getElementById('add-to-playlist');
const playlistElement = document.getElementById('playlist');

let currentFilePath = ''; // Track the current file path for adding to playlist
let playlist = [];
let currentTrackIndex = -1; // Track the current index in the playlist

async function loadPlaylistFromFile() {
  try {
    playlist = await window.electron.loadPlaylist();
    renderPlaylist();
    console.log('Playlist loaded successfully.');
  } catch (error) {
    console.error('Error loading playlist from file:', error);
  }
}

console.log('window.electron:', window.electron);

if (window.electron) {
  pickMusicButton.addEventListener('click', async () => {
    console.log('Pick Music button clicked');
    const filePaths = await window.electron.openFile();
    console.log('Selected file paths:', filePaths);
    if (filePaths && filePaths.length > 0) {
      currentFilePath = filePaths[0];
      loadAudio(currentFilePath);
    }
  });

  addToPlaylistButton.addEventListener('click', () => {
    if (currentFilePath) {
      addToPlaylist(currentFilePath);
    } else {
      console.error('No file selected to add to playlist');
    }
  });
} else {
  console.error('window.electron is undefined');
}

function loadAudio(filePath) {
  const objectURL = `file://${filePath}`;
  audioPlayer.src = objectURL;
  const fileName = filePath.split('/').pop().split('\\').pop();
  musicTitle.textContent = fileName.replace(/\.[^/.]+$/, "");
  setupSeekBar();
  play(); // Auto-play the loaded audio
}

function setupSeekBar() {
  seekBar.addEventListener('input', function() {
    const seekTime = audioPlayer.duration * (seekBar.value / 100);
    audioPlayer.currentTime = seekTime;
  });

  audioPlayer.addEventListener('timeupdate', function() {
    const newPosition = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    seekBar.value = newPosition;
  });
}

function play() {
  if (audioPlayer.src) {
    audioPlayer.play().catch(error => console.error('Error playing audio:', error));
  } else {
    console.error('No audio source available');
  }
}

function pause() {
  audioPlayer.pause();
}

function stop() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
}

function addToPlaylist(filePath) {
  const fileName = filePath.split('/').pop().split('\\').pop();
  playlist.push({ filePath, fileName });
  renderPlaylist();
  savePlaylistToFile(); // Call savePlaylistToFile after adding to playlist
}

function renderPlaylist() {
  playlistElement.innerHTML = '';
  playlist.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item.fileName.replace(/\.[^/.]+$/, "");
    li.addEventListener('click', () => {
      loadAudio(item.filePath);
      play();
      currentTrackIndex = index;
    });
    playlistElement.appendChild(li);
  });
}

audioPlayer.addEventListener('ended', playNextSong);

function playNextSong() {
  if (currentTrackIndex < playlist.length - 1) {
    currentTrackIndex++;
    const nextSong = playlist[currentTrackIndex];
    loadAudio(nextSong.filePath);
  }
}

async function savePlaylistToFile() {
  try {
    const success = await window.electron.savePlaylist(playlist);
    if (success) {
      console.log('Playlist saved successfully.');
    } else {
      console.error('Error saving playlist.');
    }
  } catch (error) {
    console.error('Error saving playlist to file:', error);
  }
}

// Load the playlist when the app starts
loadPlaylistFromFile();
