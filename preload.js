const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openFile: () => ipcRenderer.invoke('open-file'),
  savePlaylist: (playlist) => ipcRenderer.invoke('save-playlist', playlist),
  loadPlaylist: () => ipcRenderer.invoke('load-playlist'),
});
