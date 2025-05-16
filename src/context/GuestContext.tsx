import React, { createContext, useContext, useEffect, useState } from "react";
import data from "../data/data.json";

interface Table {
  table_no: string;
  available_seats: number;
}

export interface Guest {
  name: string;
  member_count: number;
  phone_number: string;
  assigned_table_no: string;
}

interface GuestContextType {
  tables: Table[];
  registeredGuests: Guest[];
  walkinGuests: Guest[];
  currentGuest: Guest | null;
  setCurrentGuest: (guest: Guest | null) => void;
  findRegisteredGuest: (name: string) => Guest | null;
  getAvailableTables: (size: number) => Table[];
  searchGuests: (query: string) => Guest[];
  registerWalkinGuest: (
    guest: Omit<Guest, "assigned_table_no">,
    table_no: string
  ) => boolean;
}

const GuestContext = createContext<GuestContextType | null>(null);
export const useGuestContext = () => useContext(GuestContext)!;

const LOCAL_STORAGE_KEYS = {
  tables: "weddingApp_tables",
  walkinGuests: "weddingApp_walkinGuests",
};

export const GuestProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tables, setTables] = useState<Table[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.tables);
    return saved ? JSON.parse(saved) : data.tables;
  });

  const [registeredGuests] = useState<Guest[]>(data.registeredGuests);

  const [walkinGuests, setWalkinGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.walkinGuests);
    return saved ? JSON.parse(saved) : [];
  });

  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.tables, JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.walkinGuests,
      JSON.stringify(walkinGuests)
    );
  }, [walkinGuests]);

  const findRegisteredGuest = (name: string): Guest | null => {
    const lowerName = name.toLowerCase();
    return (
      registeredGuests.find((g) => g.name.toLowerCase() === lowerName) ||
      walkinGuests.find((g) => g.name.toLowerCase() === lowerName) ||
      null
    );
  };

  const getAvailableTables = (size: number): Table[] => {
    return tables.filter((t) => t.available_seats >= size);
  };

  const searchGuests = (query: string): Guest[] => {
    const lowerQuery = query.toLowerCase();
    return [...registeredGuests, ...walkinGuests].filter((guest) =>
      guest.name.toLowerCase().includes(lowerQuery)
    );
  };

  const registerWalkinGuest = (
    guest: Omit<Guest, "assigned_table_no">,
    table_no: string
  ): boolean => {
    const tableIndex = tables.findIndex((t) => t.table_no === table_no);

    if (
      tableIndex === -1 ||
      tables[tableIndex].available_seats < guest.member_count
    ) {
      return false;
    }

    const updatedTables = [...tables];
    updatedTables[tableIndex].available_seats -= guest.member_count;
    setTables(updatedTables);

    const newGuest: Guest = {
      ...guest,
      assigned_table_no: table_no,
    };
    setWalkinGuests((prev) => [...prev, newGuest]);

    return true;
  };

  return (
    <GuestContext.Provider
      value={{
        tables,
        registeredGuests,
        walkinGuests,
        currentGuest,
        setCurrentGuest,
        findRegisteredGuest,
        getAvailableTables,
        searchGuests,
        registerWalkinGuest,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};
