// Services.js
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ServiceDetail from "./ServiceDetail";

function Services() {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: "Consultoría",
      text: "Asesoría personalizada para optimizar tu agenda y servicios.",
      imgSrc: "https://via.placeholder.com/400x250?text=Consultoria",
    },
    {
      title: "Agendamiento",
      text: "Sistema inteligente para agendar citas de manera rápida y sencilla.",
      imgSrc: "https://via.placeholder.com/400x250?text=Agendamiento",
    },
    {
      title: "Notificaciones",
      text: "Mantén informados a tus clientes con recordatorios automáticos.",
      imgSrc: "https://via.placeholder.com/400x250?text=Notificaciones",
    },
    {
      title: "Reportes",
      text: "Visualiza métricas y reportes claros sobre tus servicios.",
      imgSrc: "https://via.placeholder.com/400x250?text=Reportes",
    },
  ];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold text-primary">
        {t("services", { defaultValue: "Servicios disponibles" })}
      </h1>
      <div className="row g-4">
        {services.map((service, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div
              className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden service-card"
              style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0, 0, 0, 0.08)";
              }}
            >
              <img
                src={service.imgSrc}
                className="card-img-top"
                alt={service.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-dark">
                  {service.title}
                </h5>
                <p className="card-text text-muted">{service.text}</p>
              </div>
              <div className="card-footer bg-white text-center border-0">
                <button
                  className="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#serviceModal"
                  onClick={() => setSelectedService(service)}
                >
                  {t("viewDetails", { defaultValue: "Ver detalles" })}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal único que se actualiza con el servicio seleccionado */}
      <ServiceDetail service={selectedService} />
    </div>
  );
}

export default Services;
