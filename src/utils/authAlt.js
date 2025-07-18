/* Diese Datei existiert, um den Prozess der Authentifizierung noch mal mit Hilfe der CodeBeispiele
von Spotify for Developers neu aufzubauen, ohne den bereits vorhandenen
Code immer weiter zu verändern. */

// Code Verifier erstellen. Das ist ein string, der zwischen 43 und 128 characters haben soll und Buchstaben, Zahlen sowie gewisse Sonderzeichen haben kann

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}



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

export const redirectToSpotifyLogin = async () => {
  const codeVerifier  = generateRandomString(64);
  // codeVerifier wird gesetzt und im sessionStorage gespeichert
  // hier soll er bleiben, denn der Browser wird beim Redirect nach dem Login neu geladen
  window.sessionStorage.setItem('code_verifier', codeVerifier);
  // hier wird nun die Code Challenge erstellt:
  const hashed = await sha256(codeVerifier)
  const codeChallenge = base64encode(hashed);

  // User Authorizationm wird mit einer GET REquest an https://accounts.spotify.com/authorize angefragt.

  // Die clientId darf nicht öffentlich gemacht werden. Deswegen liegt sie in einer .env-Datei und wird von dort aufgerufen.
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

  const scope = 'playlist-modify-private playlist-modify-public';
  const authUrl = new URL("https://accounts.spotify.com/authorize");



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





}



// Access Token anfragen

export const getToken = async code => {

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

  // der gespeicherte Code Verifier wird mitgeschickt und von Spotify
  // gehasht und mit der Code Challenge verglichen. 
  // Um ein Access Token zu erhalten, muss das Ergebnis mit der Code Challenge übereinstimmen.
  const codeVerifier = sessionStorage.getItem('code_verifier');

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  }

  const res = await fetch(url, payload);
  // Error handling
  if (!res.ok) {
    throw new Error (`Token-Request fehlgeschlagen: ${res.status} ${res.statusText}`);
  }
  const response = await res.json();

  localStorage.setItem('access_token', response.access_token);
  if (response.refresh_token) {
    localStorage.setItem('refresh_token', response.refresh_token);
  }

}

// das Token läuft nach einer Stunde ab, also wird ein Refresh Token angefordert

export const getRefreshToken = async () => {

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

  // Refresh-Token wurde in getToken() gespeichert
  const refreshToken = localStorage.getItem('refresh_token');
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId
    }),
  }
  const res = await fetch(url, payload);
  // Error Handling
  if (!res.ok) {
    throw new Error (`Token-Refresh fehlgeschlagen: ${res.status} ${res.statusText}`);
  }
  const response = await res.json();

  localStorage.setItem('access_token', response.access_token);
  if (response.refresh_token) {
    localStorage.setItem('refresh_token', response.refresh_token);
  }
}


