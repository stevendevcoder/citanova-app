import React from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <> 
    <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
    >Lanzar demo de modal</button>

    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{t("ModalServiceDetailTitle", { defaultValue: "Detalle del servicio" })}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{t("ModalServiceDetailTitle", { defaultValue: "Detalle del servicio" })}</button>
                <button type="button" class="btn btn-primary">{t("ModalServiceDetailTitle", { defaultValue: "Detalle del servicio" })}</button>
            </div>
            </div>
        </div>
    </div>
    </>
    
  );
};

export default LanguageSwitcher;

