import SearchBar from './components/SearchBar/SearchBar';
import styles from './App.module.css';
import SearchResults from './components/SearchResults/SearchResults';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Playlist from './components/Playlist/Playlist';
import SaveToSpotify from './components/SaveToSpotify/SaveToSpotify';
import { getToken, redirectToSpotifyLogin } from './utils/spotifyAuth';
import { useState, useEffect } from 'react';



function App() {

  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [token, setToken] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      getToken(code).then(() => {
        setToken(localStorage.getItem('access_token'));
        window.history.replaceState({}, document.title, '/');
      });
    } else {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) setToken(accessToken)
    }
  }, []);


  const searchSpotify = async (term) => {
    if (!token) {
      redirectToSpotifyLogin();
      return;
    }
    // console.log(`Searching Spotify with ${term}`);

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("Spotify-Ergebnisse:", data);

    if (data.tracks && data.tracks.items) {
      setSearchResults(data.tracks.items);
    }
  };

  const saveToSpotify = (playlist) => {
    playlist = "My Playlist";
    console.log(`Saved ${playlist} to Spotify`);
  };

  const handleAddToPlaylist = (track) => {
    const alreadyInPlaylist = playlistTracks.some(t => t.id === track.id);
    
    if (alreadyInPlaylist) return;
      
    setPlaylistTracks(prev => [...prev, track ]);
    console.log("Track hinzugefügt:", track);
  };

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
            tracks={searchResults} 
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
