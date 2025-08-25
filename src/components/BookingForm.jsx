import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BookingForm.css";

const BookingForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  bookingType, 
  selectedService,
  initialData = {} 
}) => {
  const { t } = useTranslation();
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cedula: "",
    address: "",
    city: "",
    notes: "",
    preferredContact: "email",
    urgency: "normal"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Función simple para manejar cambios en los campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Campo ${name} cambiado a: ${value}`); // Debug
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error si existe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Función para manejar campos especiales (teléfono y cédula)
  const handleSpecialInputChange = (e, formatter) => {
    const { name, value } = e.target;
    const formatted = formatter(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: formatted
    }));
    
    // Limpiar error si existe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Formatear teléfono
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  // Formatear cédula
  const formatCedula = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}`;
  };

  // Validar campos
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "El nombre es obligatorio";
        if (value.length < 2) return "El nombre debe tener al menos 2 caracteres";
        break;
      case "lastName":
        if (!value.trim()) return "El apellido es obligatorio";
        if (value.length < 2) return "El apellido debe tener al menos 2 caracteres";
        break;
      case "email":
        if (!value.trim()) return "El email es obligatorio";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido";
        break;
      case "phone":
        if (!value.trim()) return "El teléfono es obligatorio";
        if (value.replace(/\D/g, "").length < 10) return "Teléfono inválido";
        break;
      case "cedula":
        if (!value.trim()) return "La cédula es obligatoria";
        if (value.replace(/\D/g, "").length < 8) return "Cédula inválida";
        break;
      case "city":
        if (!value.trim()) return "La ciudad es obligatoria";
        break;
    }
    return "";
  };

  // Validar paso actual
  const validateCurrentStep = () => {
    const currentErrors = {};
    
    if (currentStep === 1) {
      ["firstName", "lastName", "email"].forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) currentErrors[field] = error;
      });
    } else if (currentStep === 2) {
      ["phone", "cedula", "city"].forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) currentErrors[field] = error;
      });
    }
    
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  // Siguiente paso
  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Paso anterior
  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Llamar función de callback
      onSubmit({
        ...formData,
        bookingType,
        selectedService,
        submittedAt: new Date().toISOString()
      });
      
      // Cerrar modal y resetear
      handleClose();
    } catch (error) {
      console.error("Error al enviar formulario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cerrar modal
  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      cedula: "",
      address: "",
      city: "",
      notes: "",
      preferredContact: "email",
      urgency: "normal"
    });
    setErrors({});
    setCurrentStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content booking-form-modal">
          {/* Header */}
          <div className="modal-header bg-gradient-primary text-white border-0 rounded-top-4">
            <div className="d-flex align-items-center">
              <div className="booking-icon me-3">
                <i className={`fas ${bookingType === 'ai' ? 'fa-robot' : 'fa-calendar-alt'} fa-2x`}></i>
              </div>
              <div>
                <h4 className="modal-title fw-bold mb-0">
                  {bookingType === 'ai' ? 'Agendamiento con IA' : 'Agendamiento Manual'}
                </h4>
                <small className="text-light opacity-75">
                  {selectedService?.title} • Paso {currentStep} de {totalSteps}
                </small>
              </div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Progress Bar */}
          <div className="progress-container p-3 bg-light">
            <div className="progress" style={{ height: '8px' }}>
              <div 
                className="progress-bar bg-primary" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <small className="text-muted">Datos Personales</small>
              <small className="text-muted">Contacto</small>
              <small className="text-muted">Confirmación</small>
            </div>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              {/* Paso 1: Datos Personales */}
              {currentStep === 1 && (
                <div className="step-content">
                  <h5 className="mb-4 text-primary">
                    <i className="fas fa-user me-2"></i>
                    Información Personal
                  </h5>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Nombre *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Ingresa tu nombre"
                        autoComplete="given-name"
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Apellido *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Ingresa tu apellido"
                        autoComplete="family-name"
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-bold">Email *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        autoComplete="email"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 2: Información de Contacto */}
              {currentStep === 2 && (
                <div className="step-content">
                  <h5 className="mb-4 text-primary">
                    <i className="fas fa-phone me-2"></i>
                    Información de Contacto
                  </h5>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Teléfono *</label>
                      <input
                        type="tel"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => handleSpecialInputChange(e, formatPhone)}
                        placeholder="300-123-4567"
                        autoComplete="tel"
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Cédula *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.cedula ? 'is-invalid' : ''}`}
                        name="cedula"
                        value={formData.cedula}
                        onChange={(e) => handleSpecialInputChange(e, formatCedula)}
                        placeholder="123.456.789"
                        autoComplete="off"
                      />
                      {errors.cedula && <div className="invalid-feedback">{errors.cedula}</div>}
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Ciudad *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Tu ciudad"
                        autoComplete="address-level2"
                      />
                      {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Dirección</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Dirección completa"
                        autoComplete="street-address"
                      />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-bold">Método de Contacto Preferido</label>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === "email"}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label">
                            <i className="fas fa-envelope me-2"></i>Email
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === "phone"}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label">
                            <i className="fas fa-phone me-2"></i>Teléfono
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 3: Confirmación */}
              {currentStep === 3 && (
                <div className="step-content">
                  <h5 className="mb-4 text-primary">
                    <i className="fas fa-check-circle me-2"></i>
                    Confirmación de Datos
                  </h5>
                  
                  <div className="confirmation-card bg-light p-4 rounded">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="fw-bold text-primary mb-3">Información Personal</h6>
                        <p><strong>Nombre:</strong> {formData.firstName} {formData.lastName}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Teléfono:</strong> {formData.phone}</p>
                        <p><strong>Cédula:</strong> {formData.cedula}</p>
                      </div>
                      <div className="col-md-6">
                        <h6 className="fw-bold text-primary mb-3">Información Adicional</h6>
                        <p><strong>Ciudad:</strong> {formData.city}</p>
                        <p><strong>Dirección:</strong> {formData.address || "No especificada"}</p>
                        <p><strong>Contacto Preferido:</strong> {formData.preferredContact === "email" ? "Email" : "Teléfono"}</p>
                        <p><strong>Servicio:</strong> {selectedService?.title}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="form-label fw-bold">Notas Adicionales</label>
                      <textarea
                        className="form-control"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Agrega cualquier información adicional que consideres importante..."
                      ></textarea>
                    </div>
                    
                    <div className="mt-3">
                      <label className="form-label fw-bold">Nivel de Urgencia</label>
                      <select
                        className="form-select"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                      >
                        <option value="low">Baja - Puede esperar</option>
                        <option value="normal">Normal - En los próximos días</option>
                        <option value="high">Alta - Esta semana</option>
                        <option value="urgent">Urgente - Inmediato</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Footer */}
          <div className="modal-footer bg-light border-0 rounded-bottom-4">
            <div className="d-flex justify-content-between w-100">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={prevStep}
                    disabled={isSubmitting}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Anterior
                  </button>
                )}
              </div>
              
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  <i className="fas fa-times me-2"></i>
                  Cancelar
                </button>
                
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={nextStep}
                    disabled={isSubmitting}
                  >
                    Siguiente
                    <i className="fas fa-arrow-right ms-2"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-success btn-lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check me-2"></i>
                        Confirmar Agendamiento
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
