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

    const [playlistName, setPlaylistName] = useState(['My Muse Favourites'])


    return (
        <div>
            <h2 className={styles.redText}>
                {playlistName}
            </h2>
            <Tracklist tracks={playlistTracks} />
            <SaveToSpotify playlistData={playlistTracks}/>
        </div>
    )
    
};


export default Playlist;