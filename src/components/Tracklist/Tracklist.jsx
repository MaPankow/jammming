import Track from '../Track/Track';
import './Tracklist.css';

function Tracklist ( {tracks}) {


    return (
        <div>
            <div>
                {tracks.map((track) => (
                    <Track track={track} key={track.id} />
                    ))}
                </div>

        </div>
    );
}

export default Tracklist;