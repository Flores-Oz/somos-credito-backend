// models/sucursal.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Sucursal = sequelize.define(
  "Sucursal",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    calle_numero: { type: DataTypes.STRING(100), allowNull: false },
    colonia: { type: DataTypes.STRING(100), allowNull: true },
    municipio: { type: DataTypes.STRING(50), allowNull: false },
    departamento: { type: DataTypes.STRING(50), allowNull: false },
    codigo_postal: { type: DataTypes.STRING(10), allowNull: true },
    telefono: { type: DataTypes.STRING(30), allowNull: false },
    estado: {
      type: DataTypes.ENUM("ACTIVA", "INACTIVA", "PENDIENTE"),
      allowNull: false,
      defaultValue: "ACTIVA",
    },
    fecha_creacion: { type: DataTypes.DATE, allowNull: true },
    fecha_modificacion: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "sucursales",
    timestamps: false,
  }
);

module.exports = Sucursal;
