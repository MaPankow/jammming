import Track from '../Track/Track';
import styles from './Tracklist.module.css';

function Tracklist ({ tracks, onAction, actionLabel }) {


    return (
        <div className={styles.tracklistContainer}>
            {tracks.map((track) => (
                <Track 
                    key={track.id} 
                    track={track} 
                    onAction={onAction}
                    actionLabel={actionLabel}
                />
            ))}
        </div>
    );
}

export default Tracklist;