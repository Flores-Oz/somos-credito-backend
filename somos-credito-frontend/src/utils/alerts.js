// src/utils/alerts.js
import Swal from "sweetalert2";

export function toastSuccess(title = "Operación exitosa", text = "") {
  return Swal.fire({
    icon: "success",
    title,
    text,
    timer: 1800,
    showConfirmButton: false,
    position: "top-end",
    toast: true,
  });
}

export function toastError(title = "Ocurrió un error", text = "") {
  return Swal.fire({
    icon: "error",
    title,
    text,
    timer: 2200,
    showConfirmButton: false,
    position: "top-end",
    toast: true,
  });
}

export function confirmDelete(text = "Esta acción no se puede deshacer") {
  return Swal.fire({
    title: "¿Estás seguro?",
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });
}
