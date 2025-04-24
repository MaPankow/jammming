import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults ({ tracks }) {

    const handleSearch = (e) => {
        e.preventDefault();
    }
    
    return (
        <div className="searchResults">
            <h2 className={styles.redText}>Search Results</h2>
            <Tracklist tracks={tracks} />

            
        </div>
    );
}

export default SearchResults;