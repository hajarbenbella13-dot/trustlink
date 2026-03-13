import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const USERS = {
  "0661234567": { password: "demo123", role: "client", name: "Nadia Chraibi" },
  "0679876543": { password: "demo123", role: "artisan", name: "Hassan Benali" },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (phone, password) => {
    const found = USERS[phone];
    if (found && found.password === password) {
      setUser({ phone, ...found });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}