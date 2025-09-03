// Services.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ServiceDetail from "./ServiceDetail";
import "../styles/Services.css";

function Services() {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const services = [
    {
      id: 1,
      title: "Consultoría Empresarial",
      text: "Asesoría personalizada para optimizar tu agenda y servicios empresariales con estrategias probadas.",
      imgSrc: "https://www.emprenderalia.com/wp-content/uploads/Consultoria-empresarial.jpg",
      profesional: "Carlos Pérez",
      role: "Ingeniero de Sistemas",
      experience: "8+ años",
      rating: 4.9,
      priceRange: "Desde $120.000 COP",
      features: ["Análisis de procesos", "Optimización de flujos", "Implementación de soluciones"]
    },
    {
      id: 2,
      title: "Agendamiento Inteligente",
      text: "Sistema inteligente para agendar citas de manera rápida y eficiente con IA avanzada.",
      imgSrc: "https://www.emprenderalia.com/wp-content/uploads/consultor-empresarial-576x384.jpg",
      profesional: "Juana Gómez",
      role: "Administradora de Empresas",
      experience: "5+ años",
      rating: 4.8,
      priceRange: "Desde $150.000 COP",
      features: ["IA predictiva", "Sincronización automática", "Recordatorios inteligentes"]
    },
    {
      id: 3,
      title: "Notificaciones Automáticas",
      text: "Mantén informados a tus clientes con recordatorios automáticos y personalizados.",
      imgSrc: "https://www.emprenderalia.com/wp-content/uploads/Consultoria-empresarial-que-es-576x384.jpg",
      profesional: "Julian Martínez",
      role: "Especialista en Marketing",
      experience: "6+ años",
      rating: 4.7,
      priceRange: "Desde $180.000 COP",
      features: ["Multi-canal", "Personalización", "Analytics avanzado"]
    },
    {
      id: 4,
      title: "Reportes y Analytics",
      text: "Visualiza métricas y reportes claros sobre tus servicios con dashboards interactivos.",
      imgSrc: "https://www.emagister.com/blog/wp-content/uploads/2020/10/nathon-oski-EW_rqoSdDes-unsplash-462x308.jpg",
      profesional: "Andrea Arias",
      role: "Analista de Datos",
      experience: "7+ años",
      rating: 4.9,
      priceRange: "Desde $200.000 COP",
      features: ["Dashboards en tiempo real", "Exportación de datos", "Insights automáticos"]
    },
  ];

  useEffect(() => {
    // Simular carga de servicios
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
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
                    <small className="text-muted">Experiencia: {service.experience}</small>
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
