import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/productos");
  return response.data;
};
