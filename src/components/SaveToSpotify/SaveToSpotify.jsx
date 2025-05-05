import Playlist from "../Playlist/Playlist";

function SaveToSpotify ({ playlistData }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (playlistData && playlistData.length > 0) {
            console.log("saved to Spotify");
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