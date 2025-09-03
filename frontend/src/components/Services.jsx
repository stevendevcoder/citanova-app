// Services.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ServiceDetail from "./ServiceDetail";
import { getServicios } from "../api/servicios";
import "../styles/Services.css";

function Services() {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const data = await getServicios();
        setServices(data.reverse());
      } catch (error) {
        console.error("❌ Error al obtener servicios:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServicios();
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="services-section">
      <div className="container py-5">
        <h1 className="services-title">
          {t("services", { defaultValue: "Servicios Disponibles" })}
        </h1>
        
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-3" key={service.id}>
              <div 
                className={`service-card ${isLoading ? 'loading' : ''}`}
                onClick={() => handleServiceClick(service)}
              >
                {/* Barra superior decorativa */}
                <div className="service-image-container">
                  <img
                    src={service.imgSrc}
                    className="service-image"
                    alt={service.title}
                    loading="lazy"
                  />
                  <div className="service-overlay">
                    <div className="service-overlay-text">
                      Ver Detalles
                    </div>
                  </div>
                </div>

                <div className="service-card-body">
                  <h5 className="service-title">
                    {service.title}
                  </h5>
                  <p className="service-description">
                    {service.text}
                  </p>
                  
                  <div className="service-professional">
                    <p className="professional-name">{service.profesional}</p>
                    <p className="professional-role">{service.role}</p>
                    <small className="text-muted">{service.features.join(',')}</small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <span className="text-warning me-1">★</span>
                      <span className="text-muted small">{service.rating}</span>
                    </div>
                    <span className="badge bg-primary rounded-pill">{service.priceRange}</span>
                  </div>
                </div>

                <div className="service-card-footer">
                  <button
                    className="service-button w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#serviceModal"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(service);
                    }}
                  >
                    {t("ModalServiceDetailTitle", { defaultValue: "Ver Detalles" })}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal único que se actualiza con el servicio seleccionado */}
        <ServiceDetail service={selectedService} />
      </div>
    </div>
  );
}

export default Services;
