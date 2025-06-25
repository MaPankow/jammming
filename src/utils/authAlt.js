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
