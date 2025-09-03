import api from "./api";

// Crear un servicio
export const createServicio = async (data) => {
  const res = await api.post("/servicios", data);
  return res.data;
};

// Obtener todos los servicios
export const getServicios = async () => {
  const res = await api.get("/servicios");
  return res.data;
};

// Obtener un servicio por ID
export const getServicioById = async (id) => {
  const res = await api.get(`/servicios/${id}`);
  return res.data;
};
