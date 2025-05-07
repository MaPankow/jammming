import styles from './Playlist.module.css';
import { useState } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import SaveToSpotify from '../SaveToSpotify/SaveToSpotify';


function Playlist ({ tracks, onRemove }) {   
   console.log(tracks);


    const [playlistName, setPlaylistName] = useState('My Muse Favourites');


    return (
        <div>
            <h2 className={styles.redText}>
                {playlistName}
            </h2>
            <Tracklist 
                tracks={tracks}
                onAction={onRemove} 
                actionLabel="-"
            />
            <SaveToSpotify playlistData={tracks}/>
        </div>
    )
    
};


export default Playlist;