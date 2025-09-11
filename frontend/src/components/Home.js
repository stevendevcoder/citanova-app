import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
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

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h1 className="text-primary mb-3">{t("homeTitle", { defaultValue: "🏠 Inicio" })}</h1>
        {user ? (
          <>
            <p className="fs-5 fw-bold mb-4">
              {t("hello", { defaultValue: "Hola" })} {name}
            </p>

            <div className="row g-4">
              <div className="col-12 col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <div className="fs-2 mb-2">📋</div>
                    <h5 className="card-title">{t("homeCards.services.title", { defaultValue: "Servicios disponibles" })}</h5>
                    <p className="card-text text-muted flex-grow-1">{t("homeCards.services.desc", { defaultValue: "Explora y gestiona los servicios disponibles" })}</p>
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => navigate("/services")}
                    >
                      {t("homeCards.services.cta", { defaultValue: "Ir a servicios" })}
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <div className="fs-2 mb-2">🤝</div>
                    <h5 className="card-title">{t("homeCards.providers.title", { defaultValue: "Crear servicio proveedor" })}</h5>
                    <p className="card-text text-muted flex-grow-1">{t("homeCards.providers.desc", { defaultValue: "Agrega o gestiona proveedores" })}</p>
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => navigate("/proveedores")}
                    >
                      {t("homeCards.providers.cta", { defaultValue: "Crear proveedor" })}
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <div className="fs-2 mb-2">⚙️</div>
                    <h5 className="card-title">{t("homeCards.settings.title", { defaultValue: "Configuraciones" })}</h5>
                    <p className="card-text text-muted flex-grow-1">{t("homeCards.settings.desc", { defaultValue: "Configura preferencias y ajustes de la aplicación" })}</p>
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => navigate("/settings")}
                    >
                      {t("homeCards.settings.cta", { defaultValue: "Abrir configuraciones" })}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button className="btn btn-outline-danger" onClick={() => logout()}>
                {t("logout", { defaultValue: "Cerrar sesión" })}
              </button>
            </div>
          </>
        ) : (
          <p className="fs-5 text-muted">{t("loading", { defaultValue: "Cargando..." })}</p>
        )}
      </div>
    </div>
  );
};

export default Home;
