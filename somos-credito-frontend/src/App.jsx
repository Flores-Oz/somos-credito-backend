// src/App.jsx
import { useEffect, useState } from "react";
import "./App.css";

import SucursalForm from "./components/SucursalForm";
import SucursalTable from "./components/SucursalTable";
import SucursalFilters from "./components/SucursalFilters";

import {
  getSucursales,
  createSucursal,
  updateSucursal,
  deleteSucursal,
  updateEstadoSucursal,
} from "./services/sucursalesApi";
import { exportSucursalesPdf } from "./utils/exportPdf";
import { toastSuccess, toastError, confirmDelete } from "./utils/alerts";


const initialForm = {
  id: null,
  nombre: "",
  calle_numero: "",
  colonia: "",
  municipio: "",
  departamento: "",
  codigo_postal: "",
  telefono: "",
  estado: "ACTIVA",
};

const initialFilters = {
  texto: "",
  estado: "TODOS",
};

const ROWS_PER_PAGE = 5;

function App() {
  const [sucursales, setSucursales] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

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
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setForm(initialForm);
    setModoEdicion(false);
  };

const guardarSucursal = async (e) => {
  e.preventDefault();

  try {
    if (modoEdicion && form.id) {
      await updateSucursal(form.id, form);
      await toastSuccess("Sucursal actualizada");
    } else {
      await createSucursal(form);
      await toastSuccess("Sucursal creada");
    }
    await cargarSucursales();
    limpiarFormulario();
  } catch (error) {
    console.error(error);
    setErrorMsg("Ocurrió un error al guardar la sucursal.");
    toastError("Error al guardar la sucursal");
  }
};


  const editarSucursal = (s) => {
    setForm({
      id: s.id,
      nombre: s.nombre,
      calle_numero: s.calle_numero,
      colonia: s.colonia || "",
      municipio: s.municipio,
      departamento: s.departamento,
      codigo_postal: s.codigo_postal || "",
      telefono: s.telefono,
      estado: s.estado,
    });
    setModoEdicion(true);
  };

const eliminarSucursal = async (id) => {
  const result = await confirmDelete("Se eliminará la sucursal seleccionada.");
  if (!result.isConfirmed) return;

  try {
    await deleteSucursal(id);
    await cargarSucursales();
    toastSuccess("Sucursal eliminada");
  } catch (error) {
    console.error(error);
    setErrorMsg("Ocurrió un error al eliminar la sucursal.");
    toastError("Error al eliminar la sucursal");
  }
};

const cambiarEstado = async (sucursal, nuevoEstado) => {
  try {
    await updateEstadoSucursal(sucursal, nuevoEstado);
    await cargarSucursales();
    toastSuccess(
      nuevoEstado === "ACTIVA" ? "Sucursal dada de alta" : "Sucursal dada de baja"
    );
  } catch (error) {
    console.error(error);
    setErrorMsg("Ocurrió un error al actualizar el estado de la sucursal.");
    toastError("Error al cambiar estado");
  }
};


  // ----- Filtros + paginación -----
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // siempre regresar a la página 1 al filtrar
  };

  const filtered = sucursales.filter((s) => {
    const texto = filters.texto.trim().toLowerCase();

    const matchesTexto =
      texto === "" ||
      s.nombre.toLowerCase().includes(texto) ||
      s.municipio.toLowerCase().includes(texto) ||
      s.departamento.toLowerCase().includes(texto);

    const matchesEstado =
      filters.estado === "TODOS" || s.estado === filters.estado;

    return matchesTexto && matchesEstado;
  });

  const totalRows = filtered.length;
  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const pageRows = filtered.slice(startIndex, startIndex + ROWS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // ----- Exportar a PDF -----
 const exportarTodoPdf = () => {
  if (sucursales.length === 0) {
    toastError("No hay sucursales para exportar");
    return;
  }
  exportSucursalesPdf(
    sucursales,
    "Sucursales - Listado completo",
    "sucursales_todas.pdf"
  );
  toastSuccess("PDF generado");
};

const exportarFiltradoPdf = () => {
  if (filtered.length === 0) {
    toastError("No hay resultados filtrados para exportar");
    return;
  }
  exportSucursalesPdf(
    filtered,
    "Sucursales - Resultados filtrados",
    "sucursales_filtradas.pdf"
  );
  toastSuccess("PDF generado");
};


  return (
    <div className="app-container">
      <h1>Somos Crédito - Gestión de Sucursales</h1>
      <p>
        Administración de sucursales a nivel nacional: ubicación física, teléfono y estado
        (alta / baja).
      </p>

      {errorMsg && (
        <div
          style={{
            backgroundColor: "#fee2e2",
            borderRadius: 4,
            padding: 8,
            marginBottom: 10,
            fontSize: "0.85rem",
          }}
        >
          {errorMsg}
        </div>
      )}

      <SucursalForm
        form={form}
        modoEdicion={modoEdicion}
        onChange={handleChange}
        onSubmit={guardarSucursal}
        onCancel={limpiarFormulario}
      />

      <SucursalFilters filters={filters} onChange={handleFiltersChange} />

      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn btn-secondary" onClick={exportarTodoPdf}>
            Exportar listado completo (PDF)
          </button>
          <button className="btn btn-primary" onClick={exportarFiltradoPdf}>
            Exportar resultados filtrados (PDF)
          </button>
        </div>
      </div>

      <SucursalTable
        sucursales={pageRows}
        loading={loading}
        page={page}
        rowsPerPage={ROWS_PER_PAGE}
        totalRows={totalRows}
        onPageChange={handlePageChange}
        onEditar={editarSucursal}
        onEliminar={eliminarSucursal}
        onCambiarEstado={cambiarEstado}
      />
    </div>
  );
}

export default App;
