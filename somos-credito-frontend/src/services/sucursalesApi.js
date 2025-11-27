// src/services/sucursalesApi.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/sucursales";

export const getSucursales = () => {
  return axios.get(API_URL);
};

export const createSucursal = (data) => {
  return axios.post(API_URL, data);
};

export const updateSucursal = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteSucursal = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// cambiar solo estado (alta / baja lógica)
export const updateEstadoSucursal = (sucursal, nuevoEstado) => {
  return axios.put(`${API_URL}/${sucursal.id}`, {
    ...sucursal,
    estado: nuevoEstado,
  });
};
