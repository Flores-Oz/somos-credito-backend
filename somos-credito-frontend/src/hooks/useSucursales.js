// src/hooks/useSucursales.js
import { useEffect, useMemo, useState } from "react";
import {
  getSucursales,
  createSucursal,
  updateSucursal,
  deleteSucursal,
  updateEstadoSucursal,
} from "../services/sucursalesApi";
import { toastSuccess, toastError, confirmDelete } from "../utils/alerts";

const initialFilters = {
  texto: "",
  estado: "TODOS",
};

const ROWS_PER_PAGE = 5;

export function useSucursales() {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  // Cargar al inicio
  useEffect(() => {
    cargarSucursales();
  }, []);

  const cargarSucursales = async () => {
    try {
      setLoading(true);
      const res = await getSucursales();
      setSucursales(res.data);
      setErrorMsg("");
      setPage(1);
    } catch (error) {
      console.error(error);
      setErrorMsg("Error al cargar las sucursales.");
      toastError("Error al cargar las sucursales");
    } finally {
      setLoading(false);
    }
  };

  // Guardar (crear / actualizar)
  const saveSucursal = async (form, modoEdicion) => {
    try {
      if (modoEdicion && form.id) {
        await updateSucursal(form.id, form);
        toastSuccess("Sucursal actualizada");
      } else {
        await createSucursal(form);
        toastSuccess("Sucursal creada");
      }
      await cargarSucursales();
      return true; // éxito
    } catch (error) {
      console.error(error);
      setErrorMsg("Ocurrió un error al guardar la sucursal.");
      toastError("Error al guardar la sucursal");
      return false;
    }
  };

  // Eliminar
  const removeSucursal = async (id) => {
    const result = await confirmDelete("Se eliminará la sucursal seleccionada.");
    if (!result.isConfirmed) return false;

    try {
      await deleteSucursal(id);
      await cargarSucursales();
      toastSuccess("Sucursal eliminada");
      return true;
    } catch (error) {
      console.error(error);
      setErrorMsg("Ocurrió un error al eliminar la sucursal.");
      toastError("Error al eliminar la sucursal");
      return false;
    }
  };

  // Cambiar estado (alta/baja lógica)
  const changeEstado = async (sucursal, nuevoEstado) => {
    try {
      await updateEstadoSucursal(sucursal, nuevoEstado);
      await cargarSucursales();
      toastSuccess(
        nuevoEstado === "ACTIVA" ? "Sucursal dada de alta" : "Sucursal dada de baja"
      );
      return true;
    } catch (error) {
      console.error(error);
      setErrorMsg("Ocurrió un error al actualizar el estado de la sucursal.");
      toastError("Error al cambiar estado");
      return false;
    }
  };

  // ------ Filtros ------
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const texto = filters.texto.trim().toLowerCase();

    return sucursales.filter((s) => {
      const matchesTexto =
        texto === "" ||
        s.nombre.toLowerCase().includes(texto) ||
        s.municipio.toLowerCase().includes(texto) ||
        s.departamento.toLowerCase().includes(texto);

      const matchesEstado =
        filters.estado === "TODOS" || s.estado === filters.estado;

      return matchesTexto && matchesEstado;
    });
  }, [sucursales, filters]);

  // ------ Paginación ------
  const totalRows = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / ROWS_PER_PAGE));

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const pageRows = useMemo(() => {
    const startIndex = (page - 1) * ROWS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ROWS_PER_PAGE);
  }, [filtered, page]);

  return {
    // datos crudos
    sucursales,
    filtered,

    // estados UI
    loading,
    errorMsg,
    setErrorMsg,

    // filtros y paginación
    filters,
    handleFiltersChange,
    page,
    rowsPerPage: ROWS_PER_PAGE,
    totalRows,
    totalPages,
    pageRows,
    handlePageChange,

    // acciones
    reload: cargarSucursales,
    saveSucursal,
    removeSucursal,
    changeEstado,
  };
}
