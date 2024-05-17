// Created by Neil344
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // Ensure context isolation is enabled
      enableRemoteModule: false, // Disable remote module
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('open-file', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg'] }],
  });
  if (canceled) {
    return null;
  } else {
    return filePaths;
  }
});

ipcMain.handle('save-playlist', (event, playlist) => {
  try {
    fs.writeFileSync('playlist.json', JSON.stringify(playlist, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving playlist:', error);
    return false;
  }
});

ipcMain.handle('load-playlist', () => {
  try {
    if (fs.existsSync('playlist.json')) {
      const data = fs.readFileSync('playlist.json', 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading playlist:', error);
    return [];
  }
});
