"use client";

import { useState } from "react";

export default function RecoverPasswordPage() {
  const [correo, setCorreo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/recover-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Correo de recuperación enviado");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error al enviar correo de recuperación:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-purple-100 p-8 rounded-lg shadow-lg border border-purple-300"
      >
        <h2 className="text-center text-2xl font-semibold text-purple-700 mb-6">
          Recuperar Contraseña
        </h2>

        <div className="mb-6">
          <label
            htmlFor="correo"
            className="block text-sm font-medium text-purple-700 mb-2"
          >
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ingresa tu correo"
            className="w-full p-3 border border-purple-300 rounded-lg text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Recuperar Contraseña
        </button>
      </form>
    </div>
  );
}
