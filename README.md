# Jammming

Ein weiteres React-Projekt aus dem Skill Path "Create a Frond-End App with React" auf codecademy. Bei dieser App geht es darum, das User Playlists aus der Spotify Library erstellen und in ihren Spotify account speichern können.

## Tech-Stack
- React, Javascript, CSS
- Versionierung mit Git/ GitHub
- Integration der Spotify-API
- Deployment


## Features
- Benutzer*innen können nach Songs anhand des Titels suchen
- Benutzer*innen bekommen Infoormationen über den Song angezeigt (Titel, Artist, Album etc.)
- Benutzer*innen können ihre erstellte Playlist zu ihrem persönlichen Spotify-Account exportieren



##  Setup mit React + Vite

Mein bisheriger Weg, ein React-Projekt aufzusetzen führte über create-react-app, was ich zunächst tat. Es funktionierte auch, doch mit der Warnung, dass create-react-app veraltet sei und nicht mehr geeupdatet werde. Da ich erfahren habe, dass so etwas Sicherheitslücken birgt, habe ich die Installation gelöscht und recherchiert, was man aktuell benutzt. Hier bin ich auf React + Vite gekommen und habe das Projekt noch mal neu aufgesetzt.

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