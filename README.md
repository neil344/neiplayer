## Neiplayer

neiplayer is a modern music player application built using Electron, HTML, CSS, and JavaScript. It provides a sleek interface for playing audio files, managing playlists, and controlling playback.

![Screenshot 2024-05-17 114702](https://github.com/neil344/neiplayer/assets/51335950/3d1862c3-ef5c-43cf-9bee-a3ecf857e143)



Features

    Play Audio: Load and play audio files in various formats such as MP3, WAV, and OGG.
    Seek Bar: Control playback progress using the seek bar.
    Playlist Management: Add audio files to a playlist, save the playlist to a file, and load a saved playlist.
    Responsive Design: Designed with responsiveness in mind, ensuring a seamless experience across different devices and screen sizes.

# Usage

    Getting Started
        Clone the repository or download the project files to your local machine.
        Navigate to the project directory.

    Installation
        Run npm install to install the required dependencies.

    Running the Application
        Run npm start to start the Electron application.

     Using the Player
        Click on the "Pick Music" button to select audio files from your device.
        Use the playback controls (Play, Pause, Stop) to control audio playback.
        Adjust the seek bar to navigate through the audio track.
        Add selected audio files to the playlist using the "Add to Playlist" button.
        Save the current playlist by clicking the "Save Playlist" button.
        Load a saved playlist by launching the application and allowing it to load the playlist automatically.

File Structure

    index.html: Main HTML file containing the UI structure of the application.
    renderer.js: JavaScript file handling user interactions and playlist functionality.
    main.js: Main Electron file defining window configurations and IPC communication.
    preload.js: Preload script for Electron, exposing IPC functions to the renderer process.
    playlist.json: JSON file containing the saved playlist data.

Dependencies

    Electron: Used for building cross-platform desktop applications using web technologies.
    fs: Node.js built-in module for file system operations.
    path: Node.js built-in module for handling file paths.
    music-metadata-browser: Library for reading metadata from audio files.

Author

  #  Neil344

License

    MIT
