"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginClick = () => {

    router.push("/inicio");
  };

  const handleUsersClick = () => {
    if (!isAuthenticated) {
      setShowModal(true);
    } else {
      router.push("/users");
    }
  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/inicio");
  };

  return (
    <>
      <nav className="bg-purple-100 border-purple-300 dark:bg-purple-400">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >

          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleLogout}
                  className="relative px-4 py-2 font-semibold text-white bg-purple-500 rounded-lg shadow-md group transition-transform duration-300 ease-in-out hover:translate-y-1 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <span className="relative z-10">Cerrar Sesión</span>
                </button>


              </>
            ) : (
              <button
                onClick={handleLoginClick}
                className="relative px-4 py-2 font-semibold text-white bg-purple-600 rounded-lg shadow-md group transition-transform duration-300 ease-in-out hover:translate-y-1 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <span className="relative z-10">Iniciar Sesión</span>
              </button>
            )}
            <a
              href="/registro"
              className="relative px-4 py-2 font-semibold text-white bg-purple-600 rounded-lg shadow-md group transition-transform duration-300 ease-in-out hover:translate-y-1 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <span className="relative z-10">Registrate</span>
            </a>
          </div>
        </div>
      </nav>
      <nav className="bg-purple-200 dark:bg-green-200">
        <div className="max-w-screen-xl px-6 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm text-purple-600 dark:text-purple-800">
              <li>
                <a
                  href="#"
                  className="hover:underline"
                  onClick={handleUsersClick}
                >
                  Usuarios que se encuentran Registrados
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-purple-900 bg-opacity-50">
          <div className="bg-purple-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-purple-800">
              Atención
            </h2>
            <p className="mt-2 text-purple-700">
              Debes iniciar sesión para ver los usuarios.
            </p>
            <br />
            <button
              className="relative px-4 py-2 font-semibold text-white bg-purple-500 rounded-lg shadow-md transition-transform transform duration-300 ease-in-out hover:translate-y-1 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {isAuthenticated && (
        <div className="flex items-center justify-center h-screen">
        </div>
      )}
    </>
  );
};

export default Home;
