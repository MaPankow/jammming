import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults ({ tracks }) {

    const handleSearch = (e) => {
        e.preventDefault();
    }
    
    return (
        <div className="searchResults">
            <h2>Search Results</h2>
            <Tracklist tracks={tracks} />

            <form className="form" onSubmit={handleSearch}>
                <div>
                    <button type="submit">Save to Spotify</button>
                </div>
            </form>
        </div>
    );
}

export default SearchResults;