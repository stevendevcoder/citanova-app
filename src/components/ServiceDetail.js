import React from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";

const ServiceDetail = ({ service }) => {
  const { t, i18n } = useTranslation();

  // El modal SIEMPRE está en el DOM
  return (
    <div
      className="modal fade"
      id="serviceModal"
      tabIndex="-1"
      aria-labelledby="serviceModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header">
            <h5 className="modal-title fw-bold" id="serviceModalLabel">
              {service ? service.title : ""}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label={t("close", { defaultValue: "Cerrar" })}
            ></button>
          </div>
          <div className="modal-body text-center">
            {service ? (
              <>
                <h6 className="fw-bold">{service.title}</h6>
                <p>{service.profesional}</p>
                <img
                  src={service.imgSrc}
                  alt={service.title}
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: "250px", objectFit: "cover" }}
                />
                <p className="text-muted">{service.text}</p>
                <h6 className="fw-bold">
                  {t("priceList", { defaultValue: "Lista de precios" })}
                </h6>
                <p>Ejemplo 1 : 120.000 $COP</p>
                <p>Ejemplo 2 : 150.000 $COP</p>
                <p>Ejemplo 3 : 180.000 $COP</p>
              </>
            ) : (
              <p className="text-muted">{t("noService", { defaultValue: "Selecciona un servicio para ver detalles." })}</p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-dark"
              data-bs-dismiss="modal"
            >
              {t("aiBtn", { defaultValue: "Agendar con IA" })}
            </button>
            <button type="button" className="btn btn-primary">
              {t("calendarBtn", { defaultValue: "Agendar con calendario" })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;