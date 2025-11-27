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
import { useSucursales } from "./hooks/useSucursales";


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

function App() {
  const [form, setForm] = useState(initialForm);
  const [modoEdicion, setModoEdicion] = useState(false);

  const {
    sucursales,
    filtered,
    loading,
    errorMsg,
    setErrorMsg,
    filters,
    handleFiltersChange,
    page,
    rowsPerPage,
    totalRows,
    totalPages,
    pageRows,
    handlePageChange,
    saveSucursal,
    removeSucursal,
    changeEstado,
  } = useSucursales();

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
    const ok = await saveSucursal(form, modoEdicion);
    if (ok) {
      limpiarFormulario();
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
    await removeSucursal(id);
  };

  const cambiarEstado = async (sucursal, nuevoEstado) => {
    await changeEstado(sucursal, nuevoEstado);
  };

  // ----- Exportar PDFs -----
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

    {/* Filtros + resumen juntos */}
<div className="card" style={{ marginBottom: 14 }}>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap",
      marginBottom: 10,
    }}
  >
    <h2 className="card-title" style={{ marginBottom: 0 }}>
      Filtros 
    </h2>

    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <span className="badge badge-activa">
        Activas: {sucursales.filter((s) => s.estado === "ACTIVA").length}
      </span>

      <span className="badge badge-inactiva">
        Inactivas: {sucursales.filter((s) => s.estado === "INACTIVA").length}
      </span>

      <span className="badge badge-pendiente">
        Pendientes: {sucursales.filter((s) => s.estado === "PENDIENTE").length}
      </span>

      <span className="badge" style={{ background: "#e0e7ff", color: "#3730a3" }}>
        Total: {sucursales.length}
      </span>
    </div>
  </div>
  <SucursalFilters filters={filters} onChange={handleFiltersChange} />
</div>

      <SucursalTable
        sucursales={pageRows}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        onPageChange={handlePageChange}
        onEditar={editarSucursal}
        onEliminar={eliminarSucursal}
        onCambiarEstado={cambiarEstado}
      />

      <div className="card" style={{ marginTop: 6, marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn btn-secondary" onClick={exportarTodoPdf}>
            Exportar listado completo (PDF)
          </button>
          <button className="btn btn-primary" onClick={exportarFiltradoPdf}>
            Exportar resultados filtrados (PDF)
          </button>
        </div>
        <div style={{ marginTop: 6, fontSize: "0.8rem", color: "#6b7280" }}>
          {totalRows} resultado(s) • Página {page} de {totalPages}
        </div>
      </div>

    </div>
  );
}

export default App;