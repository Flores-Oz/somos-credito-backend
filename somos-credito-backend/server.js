// server.js
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const sucursalesRouter = require("./routes/sucursales");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Prefijo para las rutas de sucursales
app.use("/api/sucursales", sucursalesRouter);

// Arrancar servidor
async function start() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a MySQL correctamente");

    // Opcional: validar modelo con la BD
    // await require("./models/sucursal").sync({ alter: false });

    app.listen(3001, () => {
      console.log("API escuchando en http://localhost:3001");
    });
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
}

start();
