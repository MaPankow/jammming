import { useEffect, useState } from 'react';
import React from 'react';

const ThemeToggle = () => {
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('light', isLight);
    }, [isLight]);

    return (
        <button onClick={() => setIsLight(prev => !prev)}>
            {isLight ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
};

export default ThemeToggle;