import { useState } from "react";
import { savePlaylistToSpotify } from "../../utils/spotifyAPI";

function SaveToSpotify ({ playlistData, playlistName }) {
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trackUris = playlistData.map(track => track.uri);

        if (!playlistName) {
            setMessage("Please enter a name for your playlist!");
            return;
        }

        if (!trackUris || trackUris.length === 0) {
            setMessage("There are no tracks in the playlist.");
            return;
        }

        try {
            setIsSaving(true);
            setMessage("Saving ...");

            const newPlaylist = await savePlaylistToSpotify(playlistName, trackUris);

            setMessage(`Playlist ${playlistName} has been saved to Spotify!`);
            console.log("Spotify Playlist: ", newPlaylist);
        } catch (error) {
            console.error(error);
            setMessage("Error: Playlist couldn't be saved.")
        } finally {
            setIsSaving(false);
        }
    };

    
    return (
        <form className="form" onSubmit={handleSubmit}>

                <div>
                    <button type="submit" disabled={isSaving}>
                        {isSaving ? "Saving ..." : "Save to Spotify"}
                    </button>
                    {message && <p>{message}</p>}
                </div>
        </form>
    );
}

export default SaveToSpotify;