import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";

const ServiceDetail = ({ service }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  if (!service) return null;

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
              {service.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label={t("close", { defaultValue: "Cerrar" })}
            ></button>
          </div>
          <div className="modal-body text-center">
            <img
              src={service.imgSrc}
              alt={service.title}
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "250px", objectFit: "cover" }}
            />
            <p className="text-muted">{service.text}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
   
            </button>
            <button type="button" className="btn btn-primary">
  
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;

