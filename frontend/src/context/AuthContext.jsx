import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const updateUser = (patch) => {
    setUser((prev) => {
      const next = { ...(prev || {}), ...patch };
      try {
        localStorage.setItem("user", JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const login = (payload) => {
    const u = typeof payload === "object" ? payload : null;
    if (u) {
      setUser(u);
      try {
        localStorage.setItem("user", JSON.stringify(u));
      } catch (e) {}
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
    } catch (e) {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
