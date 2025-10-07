"use client";

import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

export type SearchHandle = {
  openPopup: () => void;
};

const Search = forwardRef<SearchHandle>((_, ref) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (q: string) => {
    setQuery(q);
    setResults(
      q
        ? [
            "TRX001 - Beli Besi",
            "TRX002 - Jual Kayu",
            "TRX003 - Beli Kayu",
          ].filter((r) => r.toLowerCase().includes(q.toLowerCase()))
        : []
    );
  };

  // exposed method untuk dibuka dari parent
  useImperativeHandle(ref, () => ({
    openPopup: () => setOpen(true),
  }));

  // tutup saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" />

      {/* Popup */}
      <div className="fixed inset-0 flex items-start justify-center z-50 pt-20">
        <div
          ref={containerRef}
          className="bg-white w-full max-w-xl rounded-lg p-6 shadow-lg"
        >
          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />

          {/* Hasil Search */}
          <ul className="mt-4 max-h-60 overflow-y-auto">
            {results.length === 0 && query && (
              <li className="p-2 text-gray-500">No results found</li>
            )}
            {results.map((r) => (
              <li
                key={r}
                className="p-2 cursor-pointer hover:bg-indigo-100 rounded"
                onClick={() => {
                  setQuery(r);
                  setOpen(false);
                }}
              >
                {r}
              </li>
            ))}
          </ul>

          {/* Close Button */}
          <button
            className="mt-4 text-sm text-gray-500 hover:text-gray-800"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
});

Search.displayName = "Search";

export default Search;
