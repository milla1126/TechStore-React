//const API_URL = "http://localhost:3000/api";
const API_URL = "https://backend-techstore-1-b4sj.onrender.com";

export const Integrations = {
  Products: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/productos`);
      if (!response.ok) {
        throw new Error("Error al obtener productos");
      }
      return response.json();
    }
  }
};
