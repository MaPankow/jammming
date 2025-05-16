
import { useState } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import SaveToSpotify from '../SaveToSpotify/SaveToSpotify';
import PlaylistNameInput from '../PlaylistNameInput/PlaylistNameInput';


function Playlist ({ tracks, onRemove }) {   
    console.log(tracks);


    const [playlistName, setPlaylistName] = useState();

    return (
        <div>

            <PlaylistNameInput 
                initialPlaylistName={playlistName}
                onChange={setPlaylistName}
            />
            <Tracklist 
                tracks={tracks}
                onAction={onRemove} 
                actionLabel="-"
            />
            <SaveToSpotify playlistData={tracks} playlistName={playlistName} />
        </div>
    )
    
};


export default Playlist;