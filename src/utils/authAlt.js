/* Diese Datei existiert, um den Prozess der Authentifizierung noch mal mit Hilfe der CodeBeispiele
von Spotify for Developers neu aufzubauen, ohne den bereits vorhandenen
Code immer weiter zu verändern. */

// Code Verifier erstellen. Das ist ein string, der zwischen 43 und 128 characters haben soll und Buchstaben, Zahlen sowie gewisse Sonderzeichen haben kann

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const codeVerifier  = generateRandomString(64);

//Code Challenge, sorgt dafür, dass der Code Verifier nach dem SHA256-Algorithmus hehasht wird

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

// Die Code Challenge enthält noch problematische Zeichen. Da sie in einer URL zurückgesendet wird, werden diese Zeichen entfernt

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// hier wird nun die Code Challenge erstellt:
const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed);

// User Authorizationm wird mit einer GET REquest an https://accounts.spotify.com/authorize angefragt.

// Die clientId darf nicht öffentlich gemacht werden. Deswegen liegt sie in einer .env-Datei und wird von dort aufgerufen.
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const scope = 'playlist-modify-private playlist-modify-public';
const authUrl = new URL("https://accounts.spotify.com/authorize");

// codeVerifier wird gesetzt und im localStorage gespeichert
// hier soll er bleiben, denn der Browser wird beim Redirect nach dem Login neu geladen
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString(); //Objekt params wird in URL-String umgewandelt und an authSearch angehängt
window.location.href = authUrl.toString(); // Weiterleitung an die Spotify-Login/Consent-Seite

// User wird zu Spotify-Login weitergeleitet, (wenn kein "eingeloggt bleiben" existiert), nach erfolgreichem
// Login zu einer Seite, auf der User Jammming den Zugriff auf deren Spotify-Konto erlaubt

// die Redirect-Uri wird dafür genutzt
// außerdem wird in der URL ein Code mitgeschickt, der geparst wird:

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

