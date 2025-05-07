import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults ({ tracks, onAdd }) {

    const handleSearch = (e) => {
        e.preventDefault();
    }
    
    return (
        <div className="searchResults">
            <h2 className={styles.redText}>Search Results</h2>            
            <Tracklist 
                tracks={tracks} 
                onAction={onAdd} 
                actionLabel="+" 
            />                       
        </div>
    );
}

export default SearchResults;