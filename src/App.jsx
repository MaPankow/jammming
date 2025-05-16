import SearchBar from './components/SearchBar/SearchBar';
import styles from './App.module.css';
import SearchResults from './components/SearchResults/SearchResults';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Playlist from './components/Playlist/Playlist';
import SaveToSpotify from './components/SaveToSpotify/SaveToSpotify';

import { useState } from 'react';

const tracks = [
  { id: "4VqPOruhp5EdPBeR92t6lQ", 
    name: "Uprising", 
    artists: [{name: "Muse"}], //artists ist ein Objektarray, jeder aufgeführte Artist ist ein eigenes Objekt mit name etc.
    album: {name: "The Resistance"}, // album ist nochmal als Objekt verschachtelt, es hat eigene Informationen
    uri: "spotify:track:4VqPOruhp5EdPBeR92t6lQ"
  },
  { id: "7xyYsOvq5Ec3P4fr6mM9fD", 
    name: "Hysteria", 
    artists: [{name: "Muse"}], 
    album: {name: "Absolution"},
    uri: "spotify:track:7xyYsOvq5Ec3P4fr6mM9fD"
  },
  { id: "3skn2lauGk7Dx6bVIt5DVj", 
    name: "Starlight", 
    artists: [{name: "Muse"}], 
    album: {name: "Balck Holes & Revelatuons"},
    uri: "spotify:track:3skn2lauGk7Dx6bVIt5DVj" 
  },
  { id: "5tG5a0s0gBz7eFZ0u0V1hD", 
    name: "New Born", 
    artists: [{name: "Muse"}], 
    album: {name: "Origin Of Symmetry"},
    uri: "spotify:track:5tG5a0s0gBz7eFZ0u0V1hD" 
  },
  { id: "2cQTVGXSf6JelS23kwuuFV", 
    name: "The Handler", 
    artists: [{name: "Muse"}], 
    album: {name: "Drones"},
    uri: "spotify:track:2cQTVGXSf6JelS23kwuuFV"
  },
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
    const alreadyInPlaylist = playlistTracks.some(t => t.id === track.id);
    
    if (alreadyInPlaylist) return;
      
    setPlaylistTracks(prev => [...prev, track ]);
    console.log("Track hinzugefügt:", track);
  }

  const handleRemoveTrack = (track) => {
    const isInPlaylist = playlistTracks.some(t => t.id === track.id);

    if(isInPlaylist) {
      setPlaylistTracks(prev => prev.filter(t => t.id !== track.id));
      console.log("Track removed", track);
    }

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
              onRemove={handleRemoveTrack}

            />
           
          </div>
        </div>
      </div>

    </div>
  )
}

export default App;
