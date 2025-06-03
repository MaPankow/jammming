import styles from './Track.module.css';



function Track ({ track, onAction, actionLabel }) {

    const handleClick = () => {
        onAction(track);
    };

    return (
        <div className={styles.songContainer}>
            <div className={styles.column}>
                <img 
                    className={styles.image}
                    src={track.album.images[0]?.url}
                    alt={`Cover of ${track.album.name}`}
                />
            </div>
            <div className={styles.column}>
                <div className="songTitle">
                    <p>Title: {track.name}</p>
                </div>
                <div className="artist">
                    <p>Artist: {track.artists[0].name}</p>
                </div>
                <div className="album">
                    <p>Album: {track.album.name}</p>
                </div>
            </div>
            <div className={styles.column}>
 
                    <button onClick={handleClick} className={styles.actionButton} >
                        {actionLabel}
                    </button>

            </div>
        </div>
    );
}

export default Track;

// jsx:
// <p>{track.name} – {track.artists[0].name} ({track.album.name})</p>