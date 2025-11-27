// src/components/SucursalTable.jsx
function SucursalTable({
  sucursales,
  loading,
  onEditar,
  onEliminar,
  onCambiarEstado,
}) {
  if (loading) return <p>Cargando...</p>;

  if (sucursales.length === 0) {
    return <p>No hay sucursales registradas.</p>;
  }

  return (
    <table
      border="1"
      cellPadding="5"
      cellSpacing="0"
      width="100%"
      style={{ borderCollapse: "collapse", fontSize: "0.9rem" }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f3f3f3" }}>
          <th>ID</th>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Municipio / Depto.</th>
          <th>Teléfono</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {sucursales.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.nombre}</td>
            <td>
              {s.calle_numero}
              {s.colonia ? `, ${s.colonia}` : ""}
              {s.codigo_postal ? `, CP ${s.codigo_postal}` : ""}
            </td>
            <td>
              {s.municipio}, {s.departamento}
            </td>
            <td>{s.telefono}</td>
            <td>{s.estado}</td>
            <td>
              <button onClick={() => onEditar(s)}>Editar</button>
              <button
                onClick={() => onEliminar(s.id)}
                style={{ marginLeft: "5px" }}
              >
                Eliminar
              </button>
              {s.estado !== "ACTIVA" && (
                <button
                  onClick={() => onCambiarEstado(s, "ACTIVA")}
                  style={{ marginLeft: "5px" }}
                >
                  Dar de alta
                </button>
              )}
              {s.estado === "ACTIVA" && (
                <button
                  onClick={() => onCambiarEstado(s, "INACTIVA")}
                  style={{ marginLeft: "5px" }}
                >
                  Dar de baja
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SucursalTable;
