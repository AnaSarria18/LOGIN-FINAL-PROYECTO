"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null); // Estado para editar
  const [newName, setNewName] = useState(""); // Estado para nombre nuevo
  const [newEmail, setNewEmail] = useState(""); // Estado para correo nuevo

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setError("No se encontraron usuarios.");
      }
    } catch (error) {
      console.error("Error al cargar los usuarios:", error.message);
      setError(
        `Hubo un error al cargar los usuarios: ${error.response ? error.response.data.error : error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user._id !== userId)); // Eliminar usuario de la lista
      alert("Usuario eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
      alert("Error al eliminar el usuario.");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewName(user.nombre); // Rellenar el campo con el nombre actual
    setNewEmail(user.correo); // Rellenar el campo con el correo actual
  };

  const handleSaveEdit = async () => {
    if (!newName || !newEmail) {
      alert("El nombre y el correo no pueden estar vacíos.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const updatedUser = { nombre: newName, correo: newEmail };
      await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => user._id === editingUser._id ? { ...user, nombre: newName, correo: newEmail } : user)); // Actualizar la lista localmente
      setEditingUser(null); // Cerrar el modal o campo de edición
      setNewName(""); // Limpiar el estado del nombre
      setNewEmail(""); // Limpiar el estado del correo
      alert("Usuario actualizado con éxito.");
    } catch (error) {
      console.error("Error al editar usuario:", error.message);
      alert("Error al actualizar el usuario.");
    }
  };

  if (loading) {
    return <p className="text-center text-xl">Cargando usuarios...</p>;
  }

  return (
    <div className="relative overflow-x-auto shadow-xl rounded-lg bg-purple-100">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-purple-200 rounded-t-lg">
        <h2 className="text-2xl font-semibold text-center text-purple-800">
          Lista de Usuarios Registrados
        </h2>
      </div>

      {error && <p className="text-center text-red-500 font-semibold">{error}</p>}

      <table className="w-full text-sm text-left rtl:text-right text-purple-600">
        <thead className="text-xs text-purple-900 uppercase bg-purple-300">
          <tr>
            <th scope="col" className="px-6 py-3">Nombre</th>
            <th scope="col" className="px-6 py-3">Correo</th>
            <th scope="col" className="px-6 py-3">Acciones</th> {/* Columna de acción */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user._id}
                className="bg-purple-50 border-b hover:bg-purple-100 transition-colors duration-200"
              >
                <td className="px-6 py-4">{user.nombre}</td>
                <td className="px-6 py-4">{user.correo}</td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-purple-700 hover:underline mr-4"
                    onClick={() => handleEditUser(user)}
                  >
                    Editar
                  </button>
                  <button
                    className="font-medium text-red-700 hover:underline"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-purple-500">
                No hay usuarios disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Formulario para editar el usuario */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl mb-4">Editar Usuario</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded mb-4"
              placeholder="Nuevo nombre"
            />
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded mb-4"
              placeholder="Nuevo correo"
            />
            <div className="flex justify-between">
              <button
                className="bg-purple-500 text-white px-6 py-2 rounded"
                onClick={handleSaveEdit}
              >
                Guardar
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded"
                onClick={() => setEditingUser(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
