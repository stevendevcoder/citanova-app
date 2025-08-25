import React from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BookingForm.css";

const BookingConfirmation = ({ 
  isOpen, 
  onClose, 
  bookingData,
  onContinue 
}) => {
  const { t } = useTranslation();

  if (!isOpen || !bookingData) return null;

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'low': return 'Baja - Puede esperar';
      case 'normal': return 'Normal - En los próximos días';
      case 'high': return 'Alta - Esta semana';
      case 'urgent': return 'Urgente - Inmediato';
      default: return 'Normal';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'low': return 'success';
      case 'normal': return 'primary';
      case 'high': return 'warning';
      case 'urgent': return 'danger';
      default: return 'primary';
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content booking-form-modal">
          {/* Header */}
          <div className="modal-header bg-gradient-success text-white border-0 rounded-top-4">
            <div className="d-flex align-items-center">
              <div className="booking-icon me-3">
                <i className="fas fa-check-circle fa-2x"></i>
              </div>
              <div>
                <h4 className="modal-title fw-bold mb-0">
                  ¡Agendamiento Exitoso!
                </h4>
                <small className="text-light opacity-75">
                  Tu solicitud ha sido procesada correctamente
                </small>
              </div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            <div className="text-center mb-4">
              <div className="success-animation mb-3">
                <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
              </div>
              <h5 className="text-success fw-bold">
                ¡Gracias por tu solicitud!
              </h5>
              <p className="text-muted">
                Hemos recibido tu solicitud de agendamiento y nos pondremos en contacto contigo pronto.
              </p>
            </div>

            {/* Resumen del agendamiento */}
            <div className="confirmation-summary bg-light p-4 rounded mb-4">
              <h6 className="fw-bold text-primary mb-3">
                <i className="fas fa-clipboard-list me-2"></i>
                Resumen de tu Solicitud
              </h6>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="summary-item mb-3">
                    <strong className="text-primary">Servicio:</strong>
                    <p className="mb-1">{bookingData.selectedService?.title}</p>
                  </div>
                  
                  <div className="summary-item mb-3">
                    <strong className="text-primary">Tipo de Agendamiento:</strong>
                    <p className="mb-1">
                      {bookingData.bookingType === 'ai' ? (
                        <span className="badge bg-dark">
                          <i className="fas fa-robot me-1"></i>
                          Agendamiento con IA
                        </span>
                      ) : (
                        <span className="badge bg-primary">
                          <i className="fas fa-calendar-alt me-1"></i>
                          Agendamiento Manual
                        </span>
                      )}
                    </p>
                  </div>
                  
                  <div className="summary-item mb-3">
                    <strong className="text-primary">Cliente:</strong>
                    <p className="mb-1">{bookingData.firstName} {bookingData.lastName}</p>
                  </div>
                  
                  <div className="summary-item mb-3">
                    <strong className="text-primary">Contacto:</strong>
                    <p className="mb-1">
                      <i className="fas fa-envelope me-2 text-primary"></i>
                      {bookingData.email}
                    </p>
                    <p className="mb-1">
                      <i className="fas fa-phone me-2 text-primary"></i>
                      {bookingData.phone}
                    </p>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="summary-item mb-3">
                    <strong className="text-primary">Ubicación:</strong>
                    <p className="mb-1">
                      <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                      {bookingData.city}
                    </p>
                    {bookingData.address && (
                      <p className="mb-1 text-muted small">
                        {bookingData.address}
                      </p>
                    )}
                  </div>
                  
                  <div className="summary-item mb-3">
                    <strong className="text-primary">Nivel de Urgencia:</strong>
                    <p className="mb-1">
                      <span className={`badge bg-${getUrgencyColor(bookingData.urgency)}`}>
                        {getUrgencyText(bookingData.urgency)}
                      </span>
                    </p>
                  </div>
                  
                  <div className="summary-item mb-3">
                    <strong className="text-primary">Método de Contacto Preferido:</strong>
                    <p className="mb-1">
                      {bookingData.preferredContact === 'email' ? (
                        <span className="badge bg-info">
                          <i className="fas fa-envelope me-1"></i>
                          Email
                        </span>
                      ) : (
                        <span className="badge bg-info">
                          <i className="fas fa-phone me-1"></i>
                          Teléfono
                        </span>
                      )}
                    </p>
                  </div>
                  
                  <div className="summary-item mb-3">
                    <strong className="text-primary">Fecha de Solicitud:</strong>
                    <p className="mb-1">
                      {new Date(bookingData.submittedAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              {bookingData.notes && (
                <div className="summary-item mt-3">
                  <strong className="text-primary">Notas Adicionales:</strong>
                  <p className="mb-1 text-muted">{bookingData.notes}</p>
                </div>
              )}
            </div>

            {/* Información de próximos pasos */}
            <div className="next-steps bg-primary bg-opacity-10 p-4 rounded border border-primary">
              <h6 className="fw-bold text-primary mb-3">
                <i className="fas fa-arrow-right me-2"></i>
                Próximos Pasos
              </h6>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="step-item d-flex align-items-start mb-3">
                    <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>
                      1
                    </div>
                    <div>
                      <strong>Confirmación Inmediata</strong>
                      <p className="text-muted small mb-0">
                        Recibirás un email de confirmación en los próximos minutos.
                      </p>
                    </div>
                  </div>
                  
                  <div className="step-item d-flex align-items-start mb-3">
                    <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>
                      2
                    </div>
                    <div>
                      <strong>Revisión del Equipo</strong>
                      <p className="text-muted small mb-0">
                        Nuestro equipo revisará tu solicitud en las próximas 24 horas.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="step-item d-flex align-items-start mb-3">
                    <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>
                      3
                    </div>
                    <div>
                      <strong>Contacto Directo</strong>
                      <p className="text-muted small mb-0">
                        Te contactaremos por tu método preferido para coordinar detalles.
                      </p>
                    </div>
                  </div>
                  
                  <div className="step-item d-flex align-items-start mb-3">
                    <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>
                      4
                    </div>
                    <div>
                      <strong>Confirmación Final</strong>
                      <p className="text-muted small mb-0">
                        Recibirás la confirmación final de fecha y hora de tu cita.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Información de contacto de soporte */}
            <div className="support-info bg-light p-3 rounded text-center">
              <p className="text-muted mb-2">
                <i className="fas fa-info-circle me-2 text-primary"></i>
                ¿Tienes alguna pregunta o necesitas hacer cambios?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <span className="badge bg-secondary">
                  <i className="fas fa-envelope me-1"></i>
                  soporte@citanova.com
                </span>
                <span className="badge bg-secondary">
                  <i className="fas fa-phone me-1"></i>
                  +57 300 123 4567
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer bg-light border-0 rounded-bottom-4">
            <div className="d-flex justify-content-between w-100">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                <i className="fas fa-times me-2"></i>
                Cerrar
              </button>
              
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    // Aquí se puede implementar la funcionalidad para:
                    // - Descargar comprobante en PDF
                    // - Enviar por email
                    // - Compartir en redes sociales
                    alert('Funcionalidad de descarga/compración en desarrollo');
                  }}
                >
                  <i className="fas fa-download me-2"></i>
                  Descargar Comprobante
                </button>
                
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onContinue}
                >
                  <i className="fas fa-home me-2"></i>
                  Volver al Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
