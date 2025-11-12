# Jammming

**Nicht-kommerzielles Lernprojekt, powered by Spotify**

Jammming ist einReact-Projekt aus dem Skill Path "Create a Frond-End App with React" auf codecademy. Bei dieser App geht es darum, das User Playlists aus der Spotify Library erstellen und in ihren Spotify account speichern können.

## Tech-Stack
- React, Javascript, CSS
- Versionierung mit Git/ GitHub
- Integration der Spotify-API
- Deployment


## Features
- Benutzer*innen können nach Songs anhand des Titels suchen
- Benutzer*innen bekommen Infoormationen über den Song angezeigt (Titel, Artist, Album etc.)
- Benutzer*innen können ihre erstellte Playlist zu ihrem persönlichen Spotify-Account exportieren

## Hinweis zur Nutzung der Spotify API

Dieses Projekt verwendet die offizielle Spotify Web API im Rahmen der Spotify Developer Terms (Version 10, Mai 2025).

Die App dient ausschließlich zu Lern- und Demonstrationszwecken und ist nicht für den kommerziellen Gebrauch bestimmt.

"Powered by Spotify" – Spotify ist eine eingetragene Marke von Spotify AB.



##  Setup mit React + Vite

Mein bisheriger Weg, ein React-Projekt aufzusetzen führte über create-react-app, was ich zunächst tat. Es funktionierte auch, doch mit der Warnung, dass create-react-app veraltet sei und nicht mehr geupdatet werde. Nach ein bisschen recherche bin ich auf React + Vite gekommen und habe das Projekt noch mal neu aufgesetzt.

Folgender Text war schon im Readme vorhanden. Ich kann einiges verstehen, einiges nicht, und lasse ihn drin, vielleicht wird er noch mal nützlich.

### Originaltext aus dem Readme

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Erstellung der Komponenten

### App.jsx
... ist die Hauptkomponente. Sie hat per default einiges vorgegeben.

### SearchBar.jsx
Hier erstelle ich zunächst das Formular mit Suchfeld und Button.

### Track.jsx
Zunächst sollen nur der Titel, Artist und Album eines Tracks dargestellt werden. Kann später noch erweitert werden.

### Tracklist.jsx 
Dient als Grundlage für sämtliche Aufzählungen von Tracks, wie hier bei den SearchResults und bei der Playlist.

### SearchResults.jsx
Nachdem per Titel gesucht worden ist, werden die Ergebnisse angezeigt.

### Playlist.jsx
Verbindet den Playlistnamen mit der Tracklist-Komponente und der SaveToSpotify-Komponente, die die Logik enthält, um die Playlist bei Spotify zu speichern.

### PlaylistNameInput.jsx
Sorgt dafür, dass man der Playlist einen Namen geben kann.

### SaveToSpotify.jsx
Enthält den Event-Handler für den Submit-Button und fängt Fehler beim Speichern ab. Führt die Informationen so zusammen, dass sie an die API gesendet werden können. Kommuniziert mit SpotifyAPI.js.

### ThemeToggle
Stellt einen Button zur Verfügung, mit dem von Light- in den Darkmode gewechselt werden kann. Emojis können direkt im Code verwendet werden. Bei https://emojipedia.org kann man sie zum Beispiel finden und kopieren.

## Styling
Zu jeder Komponente kommt eine extra CSS-Datei. Zunächst habe ich Ordner für die Kompnenten angelegt, in die einmal die jsx-Datei und eine css-Datei kommen. 

### CSS-Module
Ich habe gelernt, dass es besser ist, module.css bei den Komponenten zu verwenden, um so Verwirrungen mit Namensgebungen zu vermeiden, wenn ich lokal in den Komponenten etwas ändern möchte. 

### index.css
Bleibt eine "normale" CSS-Datei und legt globale Angaben fest, wie Hintergrund und Aussehen im Light- und Darkmode etwa.


## API-Anbindung
### OAuth 2.0-Flows
Mit diesem Protokoll zur Autorisierung kann eine App im Namen eines Nutzers auf bestimmte Ressource zurückgreifen, wie in diesem Fall, eine Playlist im Account des Nutzers zu speichern. Dafür stimmt der Nutzer zu, indem er sich authentifiziert.

### Authorization Code Flow mit PKCE
Es gibt zwei Verfahren, mit denen die App Nutzern Zugriff auf ihre Spotify-Daten gewähren lassen kann, ohne deren Daten speichern zu müssen.

Der **Implicit Grant Flow** fordert ein Zugriffstoken an, das direkt im Teil einer URL zurückgesand wird und dann von der Anwendung aus der URL entnommen werden kann. Hier entsteht eine Sicherheitslücke, da der Token sichtbar ist und ausgelesen, d. h. gestohlen werden kann. Der Usertoken läuft nach kurzer Zeit ab und es gibt keinen Refreshtoken, weshalb Nutzer sich nach Ablauf des Zugriffstoken erneut einloggen müssen. 
Primär wegen der Sicherheitsrisiken wird durch Spotify von diesem Verfahren abgeraten und empfohlen, für neue Projekte den **Authorization Flow mit PKCE** zu nutzen.
PKCE (Proof Key for Code Exchange) schützt vor "authorization code interception attacks", also dem Abfangen des Authorization Codes während der Umleitung. 

#### Code Verifier und Code Challenge
Dieser Teil des Flows dient zur Sicherheit: Eine Zeichenkette (Code Verifier) wird erstellt und lokal gespeichert. Spotify bekommt eine gehashte Version davon, die mittels Code Challenge erstellt wird. Diese dient dazu, sicherzustellen, dass nur diese eine App das Zugriffstoken bekommt, auch wenn der Redirect abgefangen wird. 

#### Nutzer-Autorisierung anfordern
Nutzer werden nun von der App zu Spotify (/authorize Endpoint) weitergeleitet, um sich anzumelden. Dabei werden die client_id, code_challenge, der scope (optional, bezieht sich auf die Funktion, die die Nutzer ausführen dürfen) und redirect_uri übergeben. 

#### Rückgabe von Spotify nach Nutzer-Autorisierung
Nutzer akzeptiert die Berechtigungen und wird an die redirect_uri der App zurückgeleitet. Spotify hängt vorher Parameter an die URL an, die mitgeschickt werden:
- code: einmaliger Authorization code, der wird dann gegen das Access Token ausgetauscht
- state: Ein weiterer Parameter zur Sicherheit, der vor CSRF-Angriffen schützt, aber für den Flow optional ist, d.h. er muss extra implementiert werden

#### Access Token anfordern
HTTP-POST-Anfrage wird an Spotify (Endpoint /token) gesendet, mit Parametern wie dem grant_type (in dem Fall "authorization_code"), dem erstellten code, noch einmal redirect URI, Client ID und Code Verifier.
**Ja, richtig, diesmal den originalen Verifier!** Spotfy wird ihn selbst hashen und mit der Challenge aus dem vorherigen Schritt vergleichen. Nur wenn beides übereinstimmt, wird das Token übermittelt.

#### Client-ID und Redirect-URI nicht öffentlich machen
Auf Spotify habe ich meine App angemeldet und eine Client-ID erhalten. Die darf nicht öffentlich preisgegeben werden. Besser ist es auch, die Redirect-URI nicht öffentlich zu zeigen.
Im Root-Verzeichnis erstelle ich eine .env-Datei und speichere dort beides unter VITE_SPOTIFY_CLIENT_ID und VITE_SPOTIFY_REDIRECT_URI ab. Die .env-Datei trage ich in der Datei .gitignore ein.

#### Probleme beim Login!!!
... die mich seit Wochen wahnsinnig machen! Der Code Verifier wird zunächst im local Storage gespeichert, doch nach der Weiterleitung ist der localStorage leer und die Konsole meckert, dass kein Code Verifier da ist. (Der Suchbegriff geht ebenfalls verloren) Mit einem zweiten Login funktioniert es allerdings. Nach mehreren Versuchen, z. B. das mit Session Storage zu umgehen und Funktionen umzustellen, bleibt es dasselbe Problem.

#### authAlt.js und Komponente SpotifyLogin zum Testen
Um noch mal ganz genau die Schritte nachzuvollziehen, die der Auth Flow mit PKCE beinhaltet, habe ich noch einmal das Modul neu aufgesetzt. Außerdem wollte ich an der bereits vorhandenen Logik  "vorbei arbeiten" und daran nicht weiter herumfummeln. Ein Neustart sozusagen. In SpotifyLogin.jsx habe ich daher nur eine Minimallösung für einen Button gebaut. Übersichtlich, aber ... wieder dasselbe Problem! Ich lasse beide Dateien mit entsprechenden Kommentaren drin.

#### Mit einem Tunnel doppelten Login umgehen
Die Probleme entstehen vermutlich dadurch, dass man auf dem lokalen Server mit http arbeitet und Spotify den Zugang beschränkt. Um das zu umgehen, gibt es eine (zugegebenermaßen etwas aufwendige) Lösung über einen Tunnel mit ngrok. Dazu führe ich folgende Schritte aus.


1. Server starten mit: npm run dev (wie immer)
2. Anderes Terminalfenster öffnen, ngrok starten mit: ngrok http 5173
3.  Die URL, die ngrok ausgibt, zeigt nun dasselbe wie http://localhost:5173, aber mit https. Dadurch akzeptiert Spotify die Adresse für den Auth-Flow. Diese Adresse + /callback wird als Callback-Uri sowohl bei Spotify dev eingetragen (Speichern nicht vergessen zur Vermeidung von Nervenzusammenbrüchen), sowie in der eigenen .env
4. Die ngrok-Adresse (ohne /callback und ohne https://) in der vite.config.js bei allowedHosts eintragen, damit Vite Zugriffe von ngrok erlaubt.
5. Das Ganze wiederhole ich jedes Mal, wenn ich Jammming benutzen oder daran weiterbasteln will, weil sich die ngrok-Adresse im Free-Plan bei jedem Start ändert.

### spotifyAPI.js
Kommuniziert mit der API und ruft über das Token die UserId ab, um eine POST-Anfrage an das Konto zu stellen. Die Playlist wird an das User-Konto gesendet.

## Datenschutzerklärung

Diese App läuft nur lokal (localhost) und speichert keine persönlichen Daten.

Sie nutzt die Spotify Web API mit deinem eigenen Account. Zugangsdaten werden nicht gespeichert oder weitergegeben.

Bitte verwende die App verantwortungsvoll und beachte die [Spotify Developer Terms](https://developer.spotify.com/terms/) sowie die [Spotify Datenschutzrichtlinie](https://www.spotify.com/de/legal/privacy-policy/).

Der Quellcode ist ein Lernprojekt ohne Garantie für Datenschutz oder Sicherheit.

### Nutzung und Datenschutz

- Du kannst jederzeit in deinem Spotify-Konto den Zugriff der App widerrufen und deine Daten verwalten.
- Diese App nutzt Spotify-Markenzeichen nur gemäß den Spotify Branding Guidelines.
- Die App ist ausschließlich für persönliche, nicht-kommerzielle Lernzwecke bestimmt.