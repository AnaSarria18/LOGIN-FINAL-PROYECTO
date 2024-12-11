"use client";

import React, { useState } from "react";
import axios from "axios";

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setTipoMensaje("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      setMensaje(response.data.message || "Registro exitoso");
      setTipoMensaje("success");
    } catch (error) {
      if (error.response?.data?.error === "El correo ya está registrado") {
        setMensaje("Este correo ya está en uso, intenta con otro.");
        setTipoMensaje("error");
      } else {
        setMensaje(
          error.response?.data?.error || "Ocurrió un error inesperado."
        );
        setTipoMensaje("error");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-32 bg-purple-100 p-8 rounded-lg shadow-2xl border border-purple-300"
      >
        <h2 className="text-center text-2xl font-semibold text-purple-500 mb-6">realiza tu registro</h2>

        <div className="mb-6">
          <label
            htmlFor="nombre"
            className="block mb-2 text-sm font-medium text-purple-500"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-3 border border-purple-600 rounded-lg text-purple-500 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="apellido"
            className="block mb-2 text-sm font-medium text-purple-500"
          >
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full p-3 border border-purple-600 rounded-lg text-purple-500 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="correo"
            className="block mb-2 text-sm font-medium text-purple-500"
          >
            Correo:
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="w-full p-3 border border-purple-600 rounded-lg text-purple-500 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="contraseña"
            className="block mb-2 text-sm font-medium text-purple-500"
          >
            Contraseña:
          </label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className="w-full p-3 border border-purple-600 rounded-lg text-purple-500 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-purple-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Registrarse
        </button>

        {mensaje && (
          <p
            className={`text-center text-sm mt-4 ${tipoMensaje === "success" ? "text-purple-500" : "text-red-300"
              }`}
          >
            {mensaje}
          </p>
        )}

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-purple-500 hover:underline block mt-2"
          >
            Volver al Inicio
          </a>
        </div>
      </form>
    </>
  );
}

