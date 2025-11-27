// src/components/SucursalFilters.jsx
function SucursalFilters({ filters, onChange }) {
  const handleChange = (e) => {
    onChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="filters-bar">
      <input
        type="text"
        name="texto"
        placeholder="Buscar por nombre, municipio o departamento..."
        value={filters.texto}
        onChange={handleChange}
      />
      <select
        name="estado"
        value={filters.estado}
        onChange={handleChange}
      >
        <option value="TODOS">Todos los estados</option>
        <option value="ACTIVA">Activas</option>
        <option value="INACTIVA">Inactivas</option>
        <option value="PENDIENTE">Pendientes</option>
      </select>
    </div>
  );
}

export default SucursalFilters;
