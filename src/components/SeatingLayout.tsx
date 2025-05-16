import React from "react";
import { useGuestContext } from "../context/GuestContext";
import { FaMapMarkerAlt } from "react-icons/fa";

const SeatingLayout: React.FC = () => {
  const { tables, currentGuest } = useGuestContext();

  //   useEffect(() => {
  //     if (currentGuest) {
  //       const timer = setTimeout(() => {
  //         setCurrentGuest(null);
  //       }, 3500); // Show pin for 3 seconds

  //       return () => clearTimeout(timer); // Cleanup
  //     }
  //   }, [currentGuest]);

  return (
    <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
      {tables.map((table) => {
        const isHighlighted =
          currentGuest?.assigned_table_no === table.table_no;
        return (
          <div
            key={table.table_no}
            className={`relative rounded-xl p-6 shadow-lg text-center transition-colors duration-300 ${
              isHighlighted ? "bg-pink-100 ring-4 ring-pink-300" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Table {table.table_no}
            </h3>
            <p className="text-gray-600 text-sm">
              {table.available_seats} seats available
            </p>
            {isHighlighted && (
              <FaMapMarkerAlt
                className="absolute -top-5 right-4 text-pink-600 text-3xl drop-shadow-md animate-bounce"
                title="Your Table"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SeatingLayout;
