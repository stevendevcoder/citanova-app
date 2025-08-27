import React, { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { auth, logout } from "../firebase";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (u?.displayName) setName(u.displayName);
      else if (u?.email) setName(u.email.split("@")[0]);
      else setName("");
      if (!u) navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">Citanova App</span>
          <div className="d-flex align-items-center">
            {user && (
              <span className="text-white me-3">
                {t("hello", { defaultValue: "Hola" })}, {name}
              </span>
            )}
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              {t("logout", { defaultValue: "Cerrar sesión" })}
            </button>
          </div>
        </div>
      </nav>

      {/* Layout */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="bg-light border-end p-3" style={{ width: "220px" }}>
          <h5 className="fw-bold mb-4">{t("menu", { defaultValue: "Menú" })}</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link className="nav-link text-dark" to="">
                🏠 {t("dashboard", { defaultValue: "Inicio" })}
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-dark" to="services">
                📋 {t("services", { defaultValue: "Servicios" })}
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-dark" to="reservations">
                📆 {t("reservations", { defaultValue: "Reservaciones" })}
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-dark" to="settings">
                ⚙️ {t("settings", { defaultValue: "Ajustes" })}
              </Link>
            </li>
          </ul>
        </div>

        {/* Content dinámico */}
        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
