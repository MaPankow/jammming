import SearchBar from './components/SearchBar/SearchBar';
import styles from './App.module.css';
import SearchResults from './components/SearchResults/SearchResults';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Playlist from './components/Playlist/Playlist';
import SaveToSpotify from './components/SaveToSpotify/SaveToSpotify';

import { useState } from 'react';

const tracks = [
  { id: 1, title: "Uprising", artist: "Muse", album: "The Resistance" },
  { id: 2, title: "Hysteria", artist: "Muse", album: "Absolution" },
  { id: 3, title: "Starlight", artist: "Muse", album: "Black Holes & Revelations" },
  { id: 4, title: "Time Is Running Out", artist: "Muse", album: "Absolution" },
  { id: 5, title: "Supermassive Black Hole", artist: "Muse", album: "Black Holes & Revelations" },
  { id: 6, title: "Knights of Cydonia", artist: "Muse", album: "Black Holes & Revelations" },
  { id: 7, title: "Madness", artist: "Muse", album: "The 2nd Law" },
  { id: 8, title: "Plug In Baby", artist: "Muse", album: "Origin of Symmetry" },
  { id: 9, title: "New Born", artist: "Muse", album: "Origin of Symmetry" },
  { id: 10, title: "The Handler", artist: "Muse", album: "Drones" },
];


function App() {
  const [playlistTracks, setPlaylistTracks] = useState([]);


  const searchSpotify = (title) => {
    console.log(`Searching Spotify with ${title}`);
  }

  const saveToSpotify = (playlist) => {
    playlist = "My Playlist";
    console.log(`Saved ${playlist} to Spotify`);
  }

  const handleAddToPlaylist = (track) => {
    console.log("Track hinzugefügt:", track);
  }

  return (
    <div className={styles.appWrapper}>
      <div >
        {/* Logos, Hintergründe etc */}
      </div>
      <h1>Ja<span className={styles.redText}>mmm</span>ing</h1>
      <ThemeToggle />
      <div>
        <SearchBar searchSpotify={searchSpotify} />
        <div className={styles.container}>
          <div className={styles.column}>
          <SearchResults 
            tracks={tracks} 
            onAdd={handleAddToPlaylist}
          />
          </div>
          <div className={styles.column}>
            <Playlist 
              tracks={playlistTracks}
            />
           
          </div>
        </div>
      </div>

    </div>
  )
}

export default App;
