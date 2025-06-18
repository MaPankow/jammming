
// Code Verifier
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}



// Code Challenge (hash den Code Verifier mit dem SHA256-Algorithmus)

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}


const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}




// Anfrage Nutzer-Authetifizierung

export const redirectToSpotifyLogin = async () => {
    const codeVerifier  = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    

    localStorage.setItem('code_verifier', codeVerifier);

    

    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const scope = 'playlist-modify-private playlist-modify-public';

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
        show_dialog: 'true',
    });

    const authUrl = "https://accounts.spotify.com/authorize?" + params.toString();
    window.location.href = authUrl;
};

export const getToken = async (code) => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const codeVerifier = localStorage.getItem('code_verifier');


    if (!codeVerifier) {
    console.error("Kein Code Verifier gefunden! Token kann nicht geholt werden.");
    return;
    }

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
        };
     
    const response = await fetch("https://accounts.spotify.com/api/token", payload);
    const data = await response.json();

    if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
            localStorage.setItem('refresh_token', data.refresh_token);
            console.log("Refresh Token gespeichert!");
        }
        console.log("Access Token gespeichert!");

        localStorage.removeItem('code_verifier');
        window.history.replaceState({}, document.title, window.location.pathname);
        return data.access_token;
    } else {
        console.error("Token error:", data);
    }   
};


export const refreshAccessToken = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    console.warn("Kein Refresh Token gefunden.");
    return null;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId
    }),
  });

  const data = await response.json();

  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
    console.log("Access Token aktualisiert.");

    // Falls ein neuer Refresh Token kommt (kann vorkommen)
    if (data.refresh_token) {
      localStorage.setItem('refresh_token', data.refresh_token);
      console.log("Refresh Token aktualisiert.");
    }

    return data.access_token;
  } else {
    throw new Error("Fehler beim Token-Refresh:", data);    
  }
};


