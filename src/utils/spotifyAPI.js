function getStoredToken() {
    return localStorage.getItem('access_token');
}

export async function getUserId() {
    const token = getStoredToken();
    if (!token) throw new Error("SpotifyAPI.js, getUserId: kein gespeichertes Token gefunden!");

    const result = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${token}`}
    });

    if (!result.ok) throw new Error(`Fehler beim Laden des Profils: ${result.status}`);
    const userData = await result.json();
    const userId = userData.id;

    return userId;
}   

export async function createPlaylist(userId, playlistName) {
    const token = getStoredToken();
    if (!token) throw new Error("SpotifyAPI.js, createPlaylist: kein gespeichertes Token gefunden!");

    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            name: playlistName,
            description: 'Erstellt mit Jammming',
            public: false,
         }),
    });

    if (!response.ok) throw new Error(`Fehler beim Erstellen der Playlist (SpotifyAPI.js, createPlaylist): ${response.status}`);
    const playlistData = await response.json();
    return playlistData;
}