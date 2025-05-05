import styles from './Playlist.module.css';
import { useState } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import SaveToSpotify from '../SaveToSpotify/SaveToSpotify';


function Playlist () {
    const [playlistTracks, setPlaylistTracks] = useState([
        { id: 8, title: "Plug In Baby", artist: "Muse", album: "Origin of Symmetry" },
        { id: 9, title: "New Born", artist: "Muse", album: "Origin of Symmetry" },
        { id: 10, title: "The Handler", artist: "Muse", album: "Drones" },
    ]);


    return (
        <div>
            <h2 className={styles.redText}>My Playlist</h2>
            <Tracklist tracks={playlistTracks} />
            <SaveToSpotify playlistData={playlistTracks}/>
        </div>
    )
    
};

// // in eine extra Komponente auslagern
// function SaveToSpotify ({saveToSpotify}) {
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (saveToSpotify) saveToSpotify();
//     };

    
//     return (
//         <form className="form" onSubmit={handleSubmit}>

//                 <div>
//                     <button type="submit">Save to Spotify</button>
//                 </div>
//         </form>
//     );
// }

export default Playlist;