import { useState, useEffect, useRef } from 'react';
import styles from './PlaylistNameInput.module.css'

function PlaylistNameInput({ initialPlaylistName = "Click to edit title", onChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playlistName, setPlaylistName] = useState(initialPlaylistName);

    const inputRef = useRef(null);

    useEffect(() => {
        setPlaylistName(initialPlaylistName);
    }, [initialPlaylistName]);

    const handleClick = () => setIsEditing(true);

    

    const handleChange = (event) => {
        const newName = event.target.value
        setPlaylistName(newName);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onChange?.(playlistName);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setIsEditing(false);
            onChange?.(playlistName);
        };
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.select();
        }
    }, [isEditing]);

    return isEditing ? (
        <input 
            ref={inputRef}
            type="text"
            value={playlistName}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
        />
    ) : (
        <h2 className={styles.redText} onClick={handleClick} style={{ cursor: "pointer" }}>
            {playlistName || initialPlaylistName}
        </h2>
    )

}

export default PlaylistNameInput;