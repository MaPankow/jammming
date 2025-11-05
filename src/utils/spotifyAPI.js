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
    return userData.id;

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

export async function addTracksToPlaylist(playlistId, trackUris) {
    const token = getStoredToken();
    if (!token) throw new Error("SpotifyAPI.js, addTracksToPlaylist: kein gespeichertes Token gefunden!");

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: trackUris }),
    });

    if (!response.ok) throw new Error(`Fehler beim Hinzufügen der Tracks (SpotifyAPI.js, addTracksToPlaylist): ${response.status}`);
    const result = await response.json();
    return result;
}

// Hilfsfunktion, um Playlist-Name und Playlist-Tracks zusammenzuführen
export async function savePlaylistToSpotify(playlistName, trackUris) {

    const userId = await getUserId();
    const newPlaylist = await createPlaylist(userId, playlistName);

    if (trackUris && trackUris.length > 0) {
        await addTracksToPlaylist(newPlaylist.id, trackUris);
    }

    return newPlaylist;
}