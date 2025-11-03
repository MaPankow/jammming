
import { useState } from 'react';



function SearchBar ({ searchSpotify }) {

    const[title, setTitle] = useState("");

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Bitte gib einen Suchbegriff ein.");
            return;
        }
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
                <div>
                    <button type="submit">Search</button>
                </div>

            </form>
        </div>
    );
}

export default SearchBar;