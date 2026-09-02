import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";

// Column definitions: each key maps directly to a field on a track object.
const columns = [
  { header: "Title", accessorKey: "title" },
  { header: "Genre", accessorKey: "genre" },
  { header: "Artist", accessorKey: "artist" },
  { header: "BPM", accessorKey: "bpm" },
  { header: "Label", accessorKey: "label" },
  { header: "Role", accessorKey: "role" },
];

export default function TrackTable({ tracks, selectedId, onSelectRow }) {
  const table = useReactTable({
    data: tracks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 4 } },
  });

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <table className="w-full text-sm text-left">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b text-neutral-500">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-2 px-2 font-medium">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onSelectRow(row.original.id)}
              className={`cursor-pointer border-b hover:bg-green-50 ${
                selectedId === row.original.id ? "bg-green-100" : ""
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-2 px-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {tracks.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center text-neutral-400">
                No tracks registered yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-3 text-sm">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 rounded border disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-neutral-500">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 rounded border disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
