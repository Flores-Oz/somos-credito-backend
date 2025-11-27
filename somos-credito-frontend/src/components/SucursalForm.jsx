// src/components/SucursalForm.jsx
function SucursalForm({ form, modoEdicion, onChange, onSubmit, onCancel }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "4px",
        marginBottom: "20px",
      }}
    >
      <h2>{modoEdicion ? "Editar sucursal" : "Registrar nueva sucursal"}</h2>

      <form onSubmit={onSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <label>Nombre de la sucursal</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={onChange}
              required
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label>Calle y número</label>
            <input
              type="text"
              name="calle_numero"
              value={form.calle_numero}
              onChange={onChange}
              required
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label>Colonia / Barrio</label>
            <input
              type="text"
              name="colonia"
              value={form.colonia}
              onChange={onChange}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label>Municipio</label>
            <input
              type="text"
              name="municipio"
              value={form.municipio}
              onChange={onChange}
              required
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label>Departamento</label>
            <input
              type="text"
              name="departamento"
              value={form.departamento}
              onChange={onChange}
              required
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label>Código Postal</label>
            <input
              type="text"
              name="codigo_postal"
              value={form.codigo_postal}
              onChange={onChange}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={onChange}
              required
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label>Estado</label>
            <select
              name="estado"
              value={form.estado}
              onChange={onChange}
              style={{ width: "100%" }}
            >
              <option value="ACTIVA">ACTIVA</option>
              <option value="INACTIVA">INACTIVA</option>
              <option value="PENDIENTE">PENDIENTE</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <button type="submit">
            {modoEdicion ? "Actualizar sucursal" : "Guardar sucursal"}
          </button>
          {modoEdicion && (
            <button
              type="button"
              onClick={onCancel}
              style={{ marginLeft: "10px" }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SucursalForm;
