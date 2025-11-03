// Implementiere Login-Button, um zu gucken, ob es an mir oder an Spotify liegt und das Problem mit neuer Auth-Datei und abgespecktem Code wieder auftaucht
// Was ist das Problem? Beim ersten Login wird der Code Verifier im localStorage gespeichert, aber nach dem Redirect ist der Speicher leer.
// Die Redirect-Uri ist schon mehrmals verglichen worden und stimmt überein. Da ich auch mit Hilfe von KI den Fehler nciht finden konnte, noch mal alles von vorn.
// ...mit neuer auth-Datei und anderer Komponente, um die search-Funktionalität erst mal außen vor zu lassen.

import { redirectToSpotifyLogin, getToken, getRefreshToken } from "../../utils/authAlt";
import { useEffect, useState } from "react";

export default function SpotifyLogin() {
    
    const [token, setToken] = useState(null);
    // 'null' zeigt an, dass hier noch ein Objekt gesetzt werden soll und vermeidet Fehler, die durch undefined (z.B. bei useState() ohne Argument) entstehen könnten
    
    const handleButton = async () => {
        await redirectToSpotifyLogin(); //Weiterleitung an Spotify-Login bzw. Consent
    }

    useEffect(() =>
    {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get("code");
        // der Code wird aus der URL geparst und benutzt, um mit getToken() das Token zu holen

        if (code) {
            getToken(code).then(() => {
                const accessToken = localStorage.getItem("access_token");
                setToken(accessToken);
                window.history.replaceState({}, document.title, "/"); // URL bereinigen

                    // Automatischer Refresh nach 55 Minuten (etwas unter 3600 Sekunden)
                    setTimeout(() => {
                        getRefreshToken().then(() => {
                        const newToken = localStorage.getItem("access_token");
                        setToken(newToken);
                        console.log("Access Token automatisch erneuert");
                        });
                    }, 55 * 60 * 1000);
            }).catch((e) => {
                console.error("Fehler beim Abrufen des Tokens", e)
            });
        }
    }, []);

    return (
        <div>
            <button onClick={handleButton}>Spotify Login</button>
            {token && <p>Access Token gespeichert!</p>}
        </div>
    )

    // doppelter Login bleibt weiterhin bestehen, KI schlägt nun Tunnel-Services wie ngrok, localtunnel oder localhost.run vor
}

