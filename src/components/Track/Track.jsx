import './Track.css';



function Track ({ track }) {
    return (
        <div className="songContainer">
            <div className="songTitle">
                <p>{track.title}</p>
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