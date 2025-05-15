import styles from './Track.module.css';



function Track ({ track, onAction, actionLabel }) {

    const handleClick = () => {
        onAction(track);
    };

    return (
        <div className={styles.songContainer}>
            <div className={styles.column}>
                <img 
                    src='src/assets/muse-logo-png_seeklogo-96193.png' 
                    alt='band logo'
                    className={styles.image}
                    >
                </img>
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