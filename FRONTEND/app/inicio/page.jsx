"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Iniciar() {
  const [formData, setFormData] = useState({ correo: "", contraseña: "" });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);
      setMensaje("Inicio de sesión exitoso");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setMensaje(error.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-purple-100 p-12 mt-36 rounded-lg shadow-2xl border border-purple-600"
      >
        <h1 className="text-center text-2xl font-semibold text-purple-500 mb-6">Iniciar Sesión</h1>
        <div className="mb-10">
          <label htmlFor="correo" className="block mb-4 text-sm font-medium text-purple-500">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="w-full p-2 border border-purple-600 rounded-lg text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-100"
            required
          />
        </div>
        <div className="mb-10">
          <label htmlFor="contraseña" className="block mb-4 text-sm font-medium text-purple-500">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className="w-full p-2 border border-purple-600 rounded-lg text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-100"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out "
        >
          Iniciar Sesión
        </button>
        <div className="mt-6 text-center">
          {mensaje && <p className="text-sm text-purple-400 mt-4">{mensaje}</p>}
          <a href="/" className="text-sm text-purple-500 hover:underline mt-2 block">Volver a Inicio</a>
          <a href="/recover-password" className="text-sm text-purple-500 hover:underline mt-2 block">¿Olvidaste tu contraseña?</a>
        </div>
      </form>
    </>
  );
}
