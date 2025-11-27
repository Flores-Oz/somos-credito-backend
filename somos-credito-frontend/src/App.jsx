// src/App.jsx
import { useEffect, useState } from "react";
import SucursalForm from "./components/SucursalForm";
import SucursalTable from "./components/SucursalTable";
import {
  getSucursales,
  createSucursal,
  updateSucursal,
  deleteSucursal,
  updateEstadoSucursal,
} from "./services/sucursalesApi";

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
  const [sucursales, setSucursales] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Cargar sucursales al iniciar
  useEffect(() => {
    cargarSucursales();
  }, []);

  const cargarSucursales = async () => {
    try {
      setLoading(true);
      const res = await getSucursales();
      setSucursales(res.data);
      setErrorMsg("");
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
      } else {
        await createSucursal(form);
      }
      await cargarSucursales();
      limpiarFormulario();
    } catch (error) {
      console.error(error);
      setErrorMsg("Ocurrió un error al guardar la sucursal.");
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
    const confirmar = window.confirm("¿Seguro que deseas eliminar esta sucursal?");
    if (!confirmar) return;

    try {
      await deleteSucursal(id);
      await cargarSucursales();
    } catch (error) {
      console.error(error);
      setErrorMsg("Ocurrió un error al eliminar la sucursal.");
    }
  };

  const cambiarEstado = async (sucursal, nuevoEstado) => {
    try {
      await updateEstadoSucursal(sucursal, nuevoEstado);
      await cargarSucursales();
    } catch (error) {
      console.error(error);
      setErrorMsg("Ocurrió un error al actualizar el estado de la sucursal.");
    }
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "20px auto", fontFamily: "system-ui" }}>
      <h1>Somos Crédito - Gestión de Sucursales</h1>
      <p>
        Administración de sucursales a nivel nacional: ubicación física, teléfono y estado
        (alta / baja).
      </p>

      {errorMsg && (
        <div style={{ backgroundColor: "#ffe5e5", padding: "10px", marginBottom: "10px" }}>
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

      <h2>Listado de sucursales</h2>
      <SucursalTable
        sucursales={sucursales}
        loading={loading}
        onEditar={editarSucursal}
        onEliminar={eliminarSucursal}
        onCambiarEstado={cambiarEstado}
      />
    </div>
  );
}

export default App;
