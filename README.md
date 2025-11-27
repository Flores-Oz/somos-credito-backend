# 📘 Somos Crédito – Módulo de Gestión de Sucursales

CRUD | Filtros | Paginación | Exportación a PDF | React + Hooks | Node.js + MySQL

---

## 📄 Descripción del proyecto

Este proyecto implementa un **módulo de gestión de sucursales** para una financiera ficticia llamada *Somos Crédito*.
Permite administrar sucursales a nivel nacional, incluyendo:

* Registro de nuevas sucursales
* Edición y eliminación
* Alta y baja lógica mediante el campo `estado`
* Filtros por texto y estado
* Paginación del listado
* Exportación del listado a PDF (completo o filtrado)
* Resumen estadístico de sucursales (activas, inactivas, pendientes)

El frontend está desarrollado en **React (Hooks)** y el backend en **Node.js + Express + Sequelize + MySQL**.

Este repositorio está organizado en dos carpetas:

```
somos-credito/
 ├─ somos-credito-backend/   → API REST
 └─ somos-credito-frontend/  → Cliente (React)
```

---

## 🚀 Tecnologías utilizadas

### **Frontend**

* React + Hooks
* Vite
* Axios
* SweetAlert2 (mensajes de éxito/error)
* jsPDF + jspdf-autotable (PDF)
* CSS personalizado (diseño moderno y limpio)

### **Backend**

* Node.js
* Express
* Sequelize ORM
* MySQL
* CORS

---

# 📦 Instalación y ejecución

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/usuario/somos-credito.git
cd somos-credito
```

---

# 🗄️ Configuración de Base de Datos (MySQL)

1. Crear la base de datos:

```sql
CREATE DATABASE somos_credito CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Crear la tabla `sucursales`:

```sql
CREATE TABLE `sucursales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `calle_numero` varchar(100) NOT NULL,
  `colonia` varchar(100) DEFAULT NULL,
  `municipio` varchar(50) NOT NULL,
  `departamento` varchar(50) NOT NULL,
  `codigo_postal` varchar(10) DEFAULT NULL,
  `telefono` varchar(30) NOT NULL,
  `estado` enum('ACTIVA','INACTIVA','PENDIENTE') DEFAULT 'ACTIVA',
  PRIMARY KEY (`id`)
);
```

---

# 🖥️ Backend – Instalación y despliegue

```bash
cd somos-credito-backend
npm install
```

### Configurar `db.js`

El proyecto usa configuración directa para esta prueba:

```js
const sequelize = new Sequelize("somos_credito", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
```

> ⚠️ En un entorno real se usaría `.env`, pero para la prueba se mantuvo simple.

### Iniciar backend:

```bash
node server.js
```

📌 API disponible en:
➡️ [http://localhost:3001/api/sucursales](http://localhost:3001/api/sucursales)

---

# 🧭 Frontend – Instalación y despliegue

```bash
cd somos-credito-frontend
npm install
npm run dev
```

Abrir navegador:
➡️ [http://localhost:5173](http://localhost:5173)

---

# 📂 Estructura del Proyecto

```
somos-credito/
 ├── somos-credito-backend/
 │   ├── models/
 │   │   └── sucursal.js
 │   ├── routes/
 │   │   └── sucursales.js
 │   ├── db.js
 │   └── server.js
 │
 └── somos-credito-frontend/
     ├── src/
     │   ├── components/
     │   │   ├── SucursalForm.jsx
     │   │   ├── SucursalTable.jsx
     │   │   └── SucursalFilters.jsx
     │   ├── hooks/
     │   │   └── useSucursales.js
     │   ├── services/
     │   │   └── sucursalesApi.js
     │   ├── utils/
     │   │   ├── exportPDF.js
     │   │   └── alerts.js
     │   └── App.jsx
```

---

# 📚 Arquitectura y flujo de datos

El frontend usa un **patrón basado en Flux**, usando hooks como store central.

```
React Component (UI)
       ↓ dispara acciones
useSucursales (Store / lógica / estado)
       ↓ llama servicio REST
Servicios (Axios)
       ↓ consume API
Backend (Express + Sequelize)
```

Beneficios:

* Código desacoplado
* Mejor mantenibilidad
* Flujo unidireccional (como pide el inciso)
* Fácil de extender para módulos futuros

---

# 📊 Funcionalidades completas

### ✔ CRUD de sucursales

### ✔ Alta / baja lógica

### ✔ Filtros por texto y estado

### ✔ Paginación manual

### ✔ Orden descendente (últimos ingresados primero)

### ✔ Exportación a PDF

* Lista completa
* Lista filtrada

### ✔ Contadores (badges):

* Activas
* Inactivas
* Pendientes
* Total


---

# 📤 Exportación a PDF

El PDF se genera usando:

```js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
```

---

# 🛡️ Buenas prácticas implementadas

* Separación Backend/Frontend
* Servicios REST desacoplados
* Componentes reutilizables
* SweetAlert2 para UX clara
* Código comentado
* Estructura ordenada por modulos

---

# ⚠️ Sobre el .env

Para simplificar la prueba técnica, el proyecto **no usa `.env`**, pero sí se debería usar en proyectos reales. 

# 🧪 Endpoints principales (API REST)

| Método | Endpoint              | Descripción              |
| ------ | --------------------- | ------------------------ |
| GET    | `/api/sucursales`     | Lista ordenada (id DESC) |
| POST   | `/api/sucursales`     | Crear                    |
| PUT    | `/api/sucursales/:id` | Editar                   |
| DELETE | `/api/sucursales/:id` | Eliminar                 |


*Proyecto entregado como prueba técnica.*
