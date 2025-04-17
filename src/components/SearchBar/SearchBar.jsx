

function SearchBar () {

    return (
        <div>
            <h2>
                Find your favourite tracks and add them to the playlist
            </h2>
            <form className="form">
                <div className="inpuField">
                    <label htmlFor="tracksearch">Browse tracks: </label>
                    <input type="text" id="tracksearch" />
                </div>
                <div>
                    <button type="submit">Search</button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;