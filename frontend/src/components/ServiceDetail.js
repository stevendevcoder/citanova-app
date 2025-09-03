import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Services.css";
import BookingForm from "./BookingForm";
import BookingConfirmation from "./BookingConfirmation";

const ServiceDetail = ({ service }) => {
  const { t, i18n } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingType, setBookingType] = useState(null);
  const [submittedBookingData, setSubmittedBookingData] = useState(null);

  // Generar imágenes adicionales para la galería (simulando múltiples imágenes)
  const generateGalleryImages = (service) => {
    if (!service) return [];
    
    const baseImages = [
      service.imgSrc,
      // Simular imágenes adicionales del servicio
      `https://via.placeholder.com/600x400/0d6efd/ffffff?text=${encodeURIComponent(service.title)}`,
      `https://via.placeholder.com/600x400/0056b3/ffffff?text=${encodeURIComponent('Detalle 2')}`,
      `https://via.placeholder.com/600x400/6c757d/ffffff?text=${encodeURIComponent('Detalle 3')}`
    ];
    
    return baseImages;
  };

  const galleryImages = generateGalleryImages(service);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Manejar apertura del formulario de agendamiento
  const handleBookingOpen = (type) => {
    setBookingType(type);
    setShowBookingForm(true);
  };

  // Manejar cierre del formulario
  const handleBookingClose = () => {
    setShowBookingForm(false);
    setBookingType(null);
  };

  // Manejar envío del formulario
  const handleBookingSubmit = (formData) => {
    console.log("Datos del formulario enviados:", formData);
    
    // Guardar los datos del agendamiento para la confirmación
    setSubmittedBookingData(formData);
    
    // Cerrar el formulario
    setShowBookingForm(false);
    setBookingType(null);
    
    // Mostrar la confirmación
    setShowConfirmation(true);
  };

  // Manejar cierre de la confirmación
  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setSubmittedBookingData(null);
  };

  // Manejar continuar después de la confirmación
  const handleConfirmationContinue = () => {
    setShowConfirmation(false);
    setSubmittedBookingData(null);
    
    // Aquí se puede implementar la lógica para:
    // - Redirigir al usuario a la página principal
    // - Cerrar el modal del servicio
    // - Mostrar un mensaje de éxito
  };

  if (!service) {
    return null;
  }

  return (
    <>
      <div
        className="modal fade"
        id="serviceModal"
        tabIndex="-1"
        aria-labelledby="serviceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content rounded-4 shadow-lg border-0">
            {/* Header del modal */}
            <div className="modal-header bg-gradient-primary text-white border-0 rounded-top-4">
              <div className="d-flex align-items-center">
                <div className="service-icon me-3">
                  <i className="fas fa-star fa-2x text-warning"></i>
                </div>
                <div>
                  <h4 className="modal-title fw-bold mb-0" id="serviceModalLabel">
                    {service.title}
                  </h4>
                  <small className="text-light opacity-75">
                    {service.profesional} • {service.role}
                  </small>
                </div>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label={t("close", { defaultValue: "Cerrar" })}
              ></button>
            </div>

            {/* Body del modal */}
            <div className="modal-body p-0">
              <div className="row g-0">
                {/* Galería de imágenes */}
                <div className="col-lg-8">
                  <div className="gallery-container position-relative">
                    <div className="gallery-main-image">
                      <img
                        src={galleryImages[currentImageIndex]}
                        alt={`${service.title} - Imagen ${currentImageIndex + 1}`}
                        className="img-fluid w-100"
                        style={{ height: "400px", objectFit: "cover" }}
                      />
                      
                      {/* Controles de navegación */}
                      <button
                        className="gallery-nav-btn gallery-prev"
                        onClick={prevImage}
                        aria-label="Imagen anterior"
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <button
                        className="gallery-nav-btn gallery-next"
                        onClick={nextImage}
                        aria-label="Siguiente imagen"
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                    
                    {/* Miniaturas */}
                    <div className="gallery-thumbnails d-flex justify-content-center mt-3 pb-3">
                      {galleryImages.map((img, index) => (
                        <div
                          key={index}
                          className={`gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => goToImage(index)}
                        >
                          <img
                            src={img}
                            alt={`Miniatura ${index + 1}`}
                            className="img-fluid"
                            style={{ width: "60px", height: "40px", objectFit: "cover" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Información del servicio */}
                <div className="col-lg-4">
                  <div className="service-info p-4">
                    <div className="service-rating mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="stars me-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`star ${i < Math.floor(service.rating) ? 'filled' : ''}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="rating-text fw-bold">{service.rating}</span>
                        <span className="text-muted ms-2">({service.experience})</span>
                      </div>
                    </div>

                    <div className="service-description mb-4">
                      <h6 className="fw-bold text-primary mb-2">Descripción del Servicio</h6>
                      <p className="text-muted">{service.text}</p>
                    </div>

                    <div className="service-features mb-4">
                      <h6 className="fw-bold text-primary mb-2">Características Principales</h6>
                      <ul className="feature-list">
                        {service.features.map((feature, index) => (
                          <li key={index} className="feature-item">
                            <i className="fas fa-check text-success me-2"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="service-pricing mb-4">
                      <h6 className="fw-bold text-primary mb-2">Precios</h6>
                      <div className="price-card bg-light p-3 rounded">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">{service.priceRange}</span>
                          <span className="badge bg-success">Precio base</span>
                        </div>
                        <small className="text-muted">Precios variables según complejidad</small>
                      </div>
                    </div>

                    <div className="professional-card bg-gradient-light p-3 rounded mb-4">
                      <h6 className="fw-bold text-primary mb-2">Profesional Asignado</h6>
                      <div className="d-flex align-items-center">
                        <div className="professional-avatar me-3">
                          <div className="avatar-placeholder">
                            {service.profesional.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <p className="fw-bold mb-0">{service.profesional}</p>
                          <small className="text-muted">{service.role}</small>
                          <br />
                          <small className="text-success">{service.experience} de experiencia</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer del modal */}
            <div className="modal-footer bg-light border-0 rounded-bottom-4">
              <div className="d-flex justify-content-between w-100">
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    <i className="fas fa-times me-2"></i>
                    Cerrar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-info"
                  >
                    <i className="fas fa-info-circle me-2"></i>
                    Más Información
                  </button>
                </div>
                
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-dark btn-lg"
                    onClick={() => handleBookingOpen('ai')}
                  >
                    <i className="fas fa-robot me-2"></i>
                    {t("aiBtn", { defaultValue: "Agendar con IA" })}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary btn-lg"
                    onClick={() => handleBookingOpen('manual')}
                  >
                    <i className="fas fa-calendar-alt me-2"></i>
                    {t("calendarBtn", { defaultValue: "Agendar con Calendario" })}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de Agendamiento */}
      <BookingForm
        isOpen={showBookingForm}
        onClose={handleBookingClose}
        onSubmit={handleBookingSubmit}
        bookingType={bookingType}
        selectedService={service}
      />

      {/* Confirmación de Agendamiento */}
      <BookingConfirmation
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        onContinue={handleConfirmationContinue}
        bookingData={submittedBookingData}
      />
    </>
  );
};

export default ServiceDetail;