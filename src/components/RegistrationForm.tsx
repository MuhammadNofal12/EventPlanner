import React, { useState } from "react";
import { useGuestContext } from "../context/GuestContext";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const RegistrationForm: React.FC = () => {
  const { getAvailableTables, registerWalkinGuest, setCurrentGuest } =
    useGuestContext();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [memberCount, setMemberCount] = useState(1);
  const [phone, setPhone] = useState("");
  const [selectedTable, setSelectedTable] = useState("");

  const availableTables = getAvailableTables(memberCount);

  const handleRegister = () => {
    if (!name || !phone || !selectedTable) {
      alert("Please fill all fields and select a table");
      return;
    }
    const success = registerWalkinGuest(
      {
        name,
        member_count: memberCount,
        phone_number: phone,
      },
      selectedTable
    );
    if (success) {
      toast.success("Guest successfully registered!");

      setCurrentGuest({
        name,
        member_count: memberCount,
        phone_number: phone,
        assigned_table_no: selectedTable,
      });

      navigate("/seating");

      setName("");
      setMemberCount(1);
      setPhone("");
      setSelectedTable("");
    } else {
      toast.error("Not enough seats at selected table.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg ring-1 ring-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        Register Walk-in Guest
      </h2>

      <label className="block mb-6">
        <span className="block text-gray-700 font-semibold mb-1">
          Guest Name
        </span>
        <input
          type="text"
          placeholder="Enter guest name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
        />
      </label>

      <label className="block mb-6">
        <span className="block text-gray-700 font-semibold mb-1">
          Members Count
        </span>
        <input
          type="number"
          min={1}
          value={memberCount}
          onChange={(e) => setMemberCount(parseInt(e.target.value) || 1)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
        />
      </label>

      <label className="block mb-6">
        <span className="block text-gray-700 font-semibold mb-1">
          Phone Number
        </span>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
        />
      </label>

      <label className="block mb-8">
        <span className="block text-gray-700 font-semibold mb-1">
          Select Table
        </span>
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
        >
          <option value="">Select Table</option>
          {availableTables.map((t) => (
            <option key={t.table_no} value={t.table_no}>
              Table {t.table_no} (Seats: {t.available_seats})
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={handleRegister}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
      >
        Register Guest
      </button>
    </div>
  );
};

export default RegistrationForm;
