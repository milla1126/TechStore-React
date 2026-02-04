import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/auth.service";


export const ROLES = {
  ADMIN: "admin",
  USER: "user"
};

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.usuario));

      setUser(data.usuario);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.msg || "Error al iniciar sesión"
      };
    }
  };

  // REGISTER
  const register = async (formData) => {
    try {
      const data = await registerUser(formData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.msg || "Error al registrar"
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, ROLES }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

