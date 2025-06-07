import SearchBar from './components/SearchBar/SearchBar';
import styles from './App.module.css';
import SearchResults from './components/SearchResults/SearchResults';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Playlist from './components/Playlist/Playlist';
import SaveToSpotify from './components/SaveToSpotify/SaveToSpotify';
import { getToken, redirectToSpotifyLogin, refreshAccessToken } from './utils/spotifyAuth';
import { useState, useEffect, useCallback } from 'react';



function App() {

  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [token, setToken] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

   const searchSpotify = useCallback (async (term, explicitToken) => {
    let accessToken = explicitToken || token;


    console.log("➡️ searchSpotify aufgerufen mit:", term);
    console.log("🔑 Token verwendet:", accessToken);

    if (!accessToken) {
      localStorage.setItem("last_search_term", term);
      redirectToSpotifyLogin();
      return;
    }

    const refreshedToken = await refreshAccessToken();
    if (refreshedToken) {
      accessToken = refreshedToken;
      setToken(refreshedToken);
    }
    
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (data.error && data.error.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        setToken(newToken);
        return searchSpotify(term);
      } else {
        redirectToSpotifyLogin();
        return;
      }
    }

    console.log("Spotify-Ergebnisse:", data);

    if (data.tracks && data.tracks.items) {
      setSearchResults(data.tracks.items);
    }
  }, [token]);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const tokenAlreadySet = localStorage.getItem('access_token');
    
    if (code && !tokenAlreadySet) {
      getToken(code).then(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          console.log("Access-Token aus getToken:", accessToken);
          setToken(accessToken);        
        }      
        window.history.replaceState({}, document.title, window.location.pathname);
      });
    } else if (tokenAlreadySet) {
      console.log("Token bereits vorhanden:", tokenAlreadySet);
      setToken(tokenAlreadySet)
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log("Token wurde gesetzt:", token);
      const savedTerm = localStorage.getItem("last_search_term");
      if (savedTerm) {
        console.log("Gefundener Suchbegriff:", savedTerm);
        searchSpotify(savedTerm, token);
        localStorage.removeItem("last_search_term");
      }
    }
  }, [token, searchSpotify]);


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
