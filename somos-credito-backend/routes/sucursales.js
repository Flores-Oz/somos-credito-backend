// routes/sucursales.js
const express = require("express");
const Sucursal = require("../models/sucursal");

const router = express.Router();

// GET /api/sucursales
router.get("/", async (req, res) => {
  try {
    const sucursales = await Sucursal.findAll();
    res.json(sucursales);
  } catch (err) {
    console.error("Error al listar sucursales:", err);
    res.status(500).json({ error: "Error al obtener sucursales" });
  }
});

// POST /api/sucursales
router.post("/", async (req, res) => {
  try {
    const nueva = await Sucursal.create({
      nombre: req.body.nombre,
      calle_numero: req.body.calle_numero,
      colonia: req.body.colonia || null,
      municipio: req.body.municipio,
      departamento: req.body.departamento,
      codigo_postal: req.body.codigo_postal || null,
      telefono: req.body.telefono,
      estado: req.body.estado || "ACTIVA",
    });
    res.json(nueva);
  } catch (err) {
    console.error("Error al crear sucursal:", err);
    res.status(400).json({ error: "Error al crear sucursal" });
  }
});

// PUT /api/sucursales/:id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const [filasAfectadas] = await Sucursal.update(
      {
        nombre: req.body.nombre,
        calle_numero: req.body.calle_numero,
        colonia: req.body.colonia || null,
        municipio: req.body.municipio,
        departamento: req.body.departamento,
        codigo_postal: req.body.codigo_postal || null,
        telefono: req.body.telefono,
        estado: req.body.estado,
      },
      { where: { id } }
    );

    if (filasAfectadas === 0) {
      return res.status(404).json({ error: "Sucursal no encontrada" });
    }

    res.json({ mensaje: "Sucursal actualizada" });
  } catch (err) {
    console.error("Error al actualizar sucursal:", err);
    res.status(400).json({ error: "Error al actualizar sucursal" });
  }
});

// DELETE /api/sucursales/:id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filas = await Sucursal.destroy({ where: { id } });

    if (filas === 0) {
      return res.status(404).json({ error: "Sucursal no encontrada" });
    }

    res.json({ mensaje: "Sucursal eliminada" });
  } catch (err) {
    console.error("Error al eliminar sucursal:", err);
    res.status(400).json({ error: "Error al eliminar sucursal" });
  }
});

module.exports = router;
