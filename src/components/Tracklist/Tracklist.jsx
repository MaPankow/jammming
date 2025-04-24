import Track from '../Track/Track';
import styles from './Tracklist.module.css';

function Tracklist ( {tracks}) {


    return (
        <div className={styles.tracklistContainer}>
            {tracks.map((track) => (
                <Track track={track} key={track.id} />
            ))}
        </div>
    );
}

export default Tracklist;