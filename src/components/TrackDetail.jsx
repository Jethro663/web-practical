import { useState, useEffect } from "react";

export default function TrackDetail({ tracks, selectedId }) {
  const [activeTrack, setActiveTrack] = useState(null);

  // Sync effect: whenever the selected row (or the tracks list) changes,
  // look up the matching track and store it as the "active" one.
  useEffect(() => {
    const found = tracks.find((t) => t.id === selectedId) || null;
    setActiveTrack(found);

    // Small visible side-effect so useEffect's role is obvious when demoing.
    document.title = found ? `Now Viewing: ${found.title}` : "Spotify Track Manager";
  }, [selectedId, tracks]);

  if (!activeTrack) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-neutral-400 text-sm">
        Select a row in the table to view its details.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-neutral-800">{activeTrack.title}</h3>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            activeTrack.role === "Creator"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {activeTrack.role}
        </span>
      </div>
      <p className="text-sm text-neutral-600">Artist: {activeTrack.artist}</p>
      <p className="text-sm text-neutral-600">Genre: {activeTrack.genre}</p>
      <p className="text-sm text-neutral-600">Rating / BPM: {activeTrack.bpm}</p>
      <p className="text-sm text-neutral-600">Label: {activeTrack.label}</p>
    </div>
  );
}
