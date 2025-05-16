import React from "react";
import { useGuestContext } from "../context/GuestContext";
import { FaChair } from "react-icons/fa";

const AvailableTables: React.FC = () => {
  const { tables } = useGuestContext();

  return (
    <div className="mt-10 max-w-4xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        Available Tables
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tables.map((table) => (
          <div
            key={table.table_no}
            className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                Table {table.table_no}
              </h3>
              <FaChair className="text-pink-500 w-6 h-6" />
            </div>

            <p className="mt-2 text-gray-600">
              <span className="font-medium">{table.available_seats}</span> seats
              available
            </p>

            {table.available_seats === 0 && (
              <p className="mt-1 text-sm text-red-500 font-semibold">Full</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableTables;
