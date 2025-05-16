

function SaveToSpotify ({ playlistData, playlistName }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const trackUris = playlistData.map(track => track.uri);
        if (trackUris && trackUris.length > 0) {
            console.log("saved to Spotify: ", playlistName, playlistData);
        } else {
            console.log("No data received");
        }
    };

    
    return (
        <form className="form" onSubmit={handleSubmit}>

                <div>
                    <button type="submit">Save to Spotify</button>
                </div>
        </form>
    );
}

export default SaveToSpotify;