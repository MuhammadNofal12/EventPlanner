import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import RegistrationForm from "./components/RegistrationForm";
import SearchGuest from "./components/SearchGuest";
import AvailableTables from "./components/AvailableTables";
import SeatingLayout from "./components/SeatingLayout";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gradient-to-b from-pink-100 to-pink-200 text-gray-800">
        <ToastContainer
          position="bottom-right"
          toastClassName="rounded-md shadow-lg"
          progressClassName="bg-pink-400"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <nav className="bg-pink-400 shadow-md sticky top-0 z-50 w-full">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6">
            {[
              { path: "/search", label: "Search Guest" },
              { path: "/register", label: "Register Guest" },
              { path: "/tables", label: "Available Tables" },
              { path: "/seating", label: "Seating Layout" },
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold border-b-2 border-white transition"
                    : "text-white/80 hover:text-white transition"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <main className="flex justify-center min-h-[calc(100vh-80px)] w-full px-4 py-10">
          <Routes>
            <Route path="/" element={<Navigate to="/search" replace />} />
            <Route path="/search" element={<SearchGuestWrapper />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/tables" element={<AvailableTables />} />
            <Route path="/seating" element={<SeatingLayout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const SearchGuestWrapper = () => {
  const handleGuestFound = (guest: {
    name: string;
    assigned_table_no: string;
  }) => {
    toast.success(
      `Guest Found: ${guest.name} (Table ${guest.assigned_table_no})`
    );
  };

  const handleGuestNotFound = (query: string) => {
    toast.error(`No guest found with name: "${query}"`);
  };

  return (
    <div className="w-full max-w-xl">
      <SearchGuest
        onGuestFound={handleGuestFound}
        onGuestNotFound={handleGuestNotFound}
      />
    </div>
  );
};

export default App;
