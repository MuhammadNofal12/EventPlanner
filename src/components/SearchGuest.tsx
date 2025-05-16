import React, { useState, useEffect } from "react";
import { useGuestContext } from "../context/GuestContext";
import { useNavigate } from "react-router-dom";

interface SearchGuestProps {
  onGuestFound: (guest: { name: string; assigned_table_no: string }) => void;
  onGuestNotFound: (query: string) => void;
}

const SearchGuest: React.FC<SearchGuestProps> = ({
  onGuestFound,
  onGuestNotFound,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { name: string; assigned_table_no: string }[]
  >([]);
  const { searchGuests, findRegisteredGuest, setCurrentGuest } =
    useGuestContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    const matches = searchGuests(query.trim());
    setSuggestions(matches);
  }, [query, searchGuests]);

  const handleSelect = (guest: { name: string; assigned_table_no: string }) => {
    const fullGuest = findRegisteredGuest(guest.name);
    if (fullGuest) {
      setQuery(fullGuest.name);
      setSuggestions([]);
      onGuestFound(fullGuest);
      setCurrentGuest(fullGuest);
      navigate("/seating");
    } else {
      onGuestNotFound(guest.name);
    }
  };

  const handleSearch = () => {
    if (suggestions.length === 1) {
      const fullGuest = findRegisteredGuest(suggestions[0].name);
      if (fullGuest) {
        onGuestFound(fullGuest);
        setCurrentGuest(fullGuest);
        navigate("/seating");
      } else {
        onGuestNotFound(suggestions[0].name);
      }
    } else if (suggestions.length === 0) {
      const foundGuest = findRegisteredGuest(query.trim());
      if (foundGuest) {
        onGuestFound(foundGuest);
        setCurrentGuest(foundGuest);
        navigate("/seating");
      } else {
        onGuestNotFound(query.trim());
      }
    }
  };

  return (
    <div className="mb-8 relative flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Enter guest full name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow rounded-lg border border-gray-300 px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
        autoComplete="off"
      />
      <button
        onClick={handleSearch}
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg shadow-md transition"
      >
        Search
      </button>

      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-52 overflow-auto z-20 shadow-lg">
          {suggestions.map((guest) => (
            <li
              key={guest.name}
              onClick={() => handleSelect(guest)}
              className="px-4 py-3 hover:bg-pink-100 cursor-pointer rounded-lg"
            >
              {guest.name}{" "}
              <span className="text-pink-600 font-semibold">
                (Table {guest.assigned_table_no})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchGuest;
