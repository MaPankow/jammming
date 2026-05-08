
import { useState } from 'react';



function SearchBar ({ searchSpotify }) {

    const[title, setTitle] = useState("");
    const[error, setError] = useState(false);

    const handleTitle = (e) => {
        setTitle(e.target.value);
        if (error) setError(false); //für den Fall, dass schon einmal mit leerem Input gesucht wurde und error auf "true" steht
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError(true);
            return;
        }

        setError(false);
        localStorage.setItem("last_search_term", title);
        searchSpotify(title);
    }

    return (
        <div>
            <h2>
                Find your favourite tracks and add them to the playlist
            </h2>
            <form className="form" onSubmit={handleSearch}>
                <div className="inputField">
                    <label htmlFor="tracksearch">Browse tracks: </label>
                    <input type="text" id="tracksearch" value={title} onChange={handleTitle} />
                </div>
                {error && (
                    <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>
                        Bitte gib einen Suchbegriff ein.
                    </div>
                )}
                <div>
                    <button type="submit">Search</button>
                </div>

            </form>
        </div>
    );
}

export default SearchBar;