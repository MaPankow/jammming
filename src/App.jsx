import SearchBar from './components/SearchBar/SearchBar';
import styles from './App.module.css';
import SearchResults from './components/SearchResults/SearchResults';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';



const tracks = [
  { id: 1, title: "Uprising", artist: "Muse", album: "The Resistance" },
  { id: 2, title: "Hysteria", artist: "Muse", album: "Absolution" },
  { id: 3, title: "Starlight", artist: "Muse", album: "Black Holes & Revelations" },
  { id: 4, title: "Time Is Running Out", artist: "Muse", album: "Absolution" },
  { id: 5, title: "Supermassive Black Hole", artist: "Muse", album: "Black Holes & Revelations" },
  { id: 6, title: "Knights of Cydonia", artist: "Muse", album: "Black Holes & Revelations" },
  { id: 7, title: "Madness", artist: "Muse", album: "The 2nd Law" },
  { id: 8, title: "Plug In Baby", artist: "Muse", album: "Origin of Symmetry" },
  { id: 9, title: "New Born", artist: "Muse", album: "Origin of Symmetry" },
  { id: 10, title: "The Handler", artist: "Muse", album: "Drones" },
];


function App() {
  const searchSpotify = (title) => {
    console.log(`Searching Spotify with ${title}`);
  }

  return (
    <>
      <div >
        {/* Logos, Hintergründe etc */}
      </div>
      <h1>Jammming</h1>
      <ThemeToggle />
      <div>
        <SearchBar searchSpotify={searchSpotify} />
        <SearchResults tracks={tracks} />
      </div>

    </>
  )
}

export default App;
