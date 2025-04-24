import styles from './Track.module.css';



function Track ({ track }) {
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
                    <p>Title: {track.title}</p>
                </div>
                <div className="artist">
                    <p>Artist: {track.artist}</p>
                </div>
                <div className="album">
                    <p>Album: {track.album}</p>
                </div>
            </div>
        </div>
    );
}

export default Track;