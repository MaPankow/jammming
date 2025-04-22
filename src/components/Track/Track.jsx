import './Track.css';

const track = {
    songTitle: "Uprising",
    artist: "Muse",
    album: "The Resistance"
    
};

function Track () {
    return (
        <div className="songContainer">
            <div className="songTitle">
                <p>{track.songTitle}</p>
            </div>
            <div className="artist">
                <p>{track.artist}</p>
            </div>
            <div className="album">
                <p>{track.album}</p>
            </div>
        </div>
    );
}

export default Track;