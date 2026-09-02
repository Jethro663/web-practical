import { useState } from "react";

const GENRES = ["Pop", "Rock", "Indie", "Jazz"];

// reusable form
const emptyForm = {
  title: "",
  genre: GENRES[0],
  artist: "",
  bpm: "",
  label: "",
  role: "Creator",
};

export default function TrackForm({ onAddTrack }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // change handler
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // validation
  function validate(values) {
    const newErrors = {};

    if (values.title.trim().length < 3) {
      newErrors.title = "Track title must be at least 3 characters.";
    }
    if (values.artist.trim().length === 0) {
      newErrors.artist = "Artist name is required.";
    }
    if (values.label.trim().length === 0) {
      newErrors.label = "Record label name is required.";
    }

    const bpmNum = Number(values.bpm);
    if (values.bpm === "" || Number.isNaN(bpmNum)) {
      newErrors.bpm = "Rating/BPM is required.";
    } else if (bpmNum < 1 || bpmNum > 100) {
      newErrors.bpm = "Rating/BPM must be between 1 and 100.";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    // Block submission if any errors exist.
    if (Object.keys(validationErrors).length > 0) return;

    onAddTrack({
      id: crypto.randomUUID(),
      title: form.title.trim(),
      genre: form.genre,
      artist: form.artist.trim(),
      bpm: Number(form.bpm),
      label: form.label.trim(),
      role: form.role,
    });

    setForm(emptyForm);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-neutral-800">Register Track</h2>

      {/* Track Title */}
      <div>
        <label className="block text-sm font-medium text-neutral-700">Track Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2 text-sm"
          placeholder="e.g. Blinding Lights"
        />
        {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
      </div>

      {/* Genre */}
      <div>
        <label className="block text-sm font-medium text-neutral-700">Genre</label>
        <select
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2 text-sm"
        >
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Artist Name */}
      <div>
        <label className="block text-sm font-medium text-neutral-700">Artist Name</label>
        <input
          name="artist"
          value={form.artist}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2 text-sm"
          placeholder="e.g. The Weeknd"
        />
        {errors.artist && <p className="text-red-600 text-xs mt-1">{errors.artist}</p>}
      </div>

      {/* Rating / BPM */}
      <div>
        <label className="block text-sm font-medium text-neutral-700">Rating / BPM (1–100)</label>
        <input
          type="number"
          name="bpm"
          value={form.bpm}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2 text-sm"
          placeholder="e.g. 87"
        />
        {errors.bpm && <p className="text-red-600 text-xs mt-1">{errors.bpm}</p>}
      </div>

      {/* Record Label */}
      <div>
        <label className="block text-sm font-medium text-neutral-700">Record Label Name</label>
        <input
          name="label"
          value={form.label}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2 text-sm"
          placeholder="e.g. XO / Republic Records"
        />
        {errors.label && <p className="text-red-600 text-xs mt-1">{errors.label}</p>}
      </div>

      {/* User Role */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">User Role</label>
        <div className="flex gap-4">
          {["Creator", "Listener"].map((r) => (
            <label key={r} className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="role"
                value={r}
                checked={form.role === r}
                onChange={handleChange}
              />
              {r}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded py-2 text-sm"
      >
        Add Track
      </button>
    </form>
  );
}
