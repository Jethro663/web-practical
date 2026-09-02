import { useState } from "react";
import TrackForm from "./components/TrackForm";
import TrackTable from "./components/TrackTable";
import TrackDetail from "./components/TrackDetail";

const GENRES = ["All", "Pop", "Rock", "Indie", "Jazz"];

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState("form"); // dynamic conditional view: "form" | "registry"
  const [genreFilter, setGenreFilter] = useState("All"); // filter control (Phase 3)

  function handleAddTrack(newTrack) {
    setTracks((prev) => [...prev, newTrack]);
    setView("registry"); // jump to table view right after submitting
  }

  const visibleTracks =
    genreFilter === "All" ? tracks : tracks.filter((t) => t.genre === genreFilter);

  return (
    <div className="min-h-screen bg-neutral-100 py-10 px-4">
      <h1 className="text-2xl font-bold text-center text-neutral-800 mb-6">
        Super Spotify Track Playlist Manager
      </h1>

      {/* Conditional view toggle */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setView("form")}
          className={`px-4 py-2 rounded text-sm font-medium ${
            view === "form" ? "bg-green-600 text-white" : "bg-white text-neutral-600 border"
          }`}
        >
          Add Track
        </button>
        <button
          onClick={() => setView("registry")}
          className={`px-4 py-2 rounded text-sm font-medium ${
            view === "registry" ? "bg-green-600 text-white" : "bg-white text-neutral-600 border"
          }`}
        >
          Registry ({tracks.length})
        </button>
      </div>

      {view === "form" && <TrackForm onAddTrack={handleAddTrack} />}

      {view === "registry" && (
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Filter control */}
          <div className="flex items-center gap-2 text-sm">
            <label className="text-neutral-600 font-medium">Filter by genre:</label>
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <TrackTable tracks={visibleTracks} selectedId={selectedId} onSelectRow={setSelectedId} />
          <TrackDetail tracks={tracks} selectedId={selectedId} />
        </div>
      )}
    </div>
  );
}