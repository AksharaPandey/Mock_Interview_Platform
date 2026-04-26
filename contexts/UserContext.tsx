"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserState {
  name: string;
  email: string;
  image: string | null;
}

interface UserContextType {
  user: UserState | null;
  updateUser: (newData: Partial<UserState>) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, initialUser }: { children: React.ReactNode, initialUser: any }) => {
  const [user, setUser] = useState<UserState | null>(initialUser);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("app_user_profile");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage when user changes
  const updateUser = (newData: Partial<UserState>) => {
    setUser((prev) => {
      const updated = prev ? { ...prev, ...newData } : (newData as UserState);
      localStorage.setItem("app_user_profile", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
