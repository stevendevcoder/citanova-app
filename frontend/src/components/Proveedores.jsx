import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/Services.css";
import Mapa from "./Mapa";
import { createServicio } from "../api/servicios";

function Proveedores() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    imgSrc: [""], // lista de imágenes
    rating: 0,
    priceRange: 1,
    features: [""],
    coordinates: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, value, field) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeField = (index, field) => {
    setFormData((prev) => {
      const updated = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: updated };
    });
  };

  const handleCoordenadasChange = (coords) => {
    setFormData((prev) => ({
      ...prev,
      coordinates: [coords.lng, coords.lat],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.coordinates) {
      setMessage("⚠️ Debes seleccionar una ubicación en el mapa");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const nuevoServicio = {
        title: formData.title,
        text: formData.text,
        imgSrc: formData.imgSrc.filter((url) => url.trim() !== ""),
        priceRange: parseInt(formData.priceRange, 10),
        features: formData.features.filter((f) => f.trim() !== ""),
        ubicacion: {
          type: "Point",
          coordinates: formData.coordinates,
        },
      };

      const data = await createServicio(nuevoServicio);
      console.log("✅ Servicio creado:", data);

      setMessage("✅ Servicio guardado con éxito");
      setFormData({
        title: "",
        text: "",
        imgSrc: [""],
        priceRange: 1,
        features: [""],
        coordinates: null,
      });
    } catch (error) {
      console.error("❌ Error al crear servicio:", error);
      setMessage("❌ Error al guardar el servicio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="services-section">
      <div className="container py-5">
        <h1 className="services-title mb-4">Crear Servicio como Proveedor</h1>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          {/* Título */}
          <div className="mb-3">
            <label className="form-label">Título del servicio</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Descripción */}
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              name="text"
              className="form-control"
              rows="3"
              value={formData.text}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Imágenes */}
          <div className="mb-3">
            <label className="form-label">Imágenes</label>
            {formData.imgSrc.map((url, i) => (
              <div key={i} className="d-flex mb-2">
                <input
                  type="url"
                  className="form-control me-2"
                  value={url}
                  onChange={(e) => handleArrayChange(i, e.target.value, "imgSrc")}
                  placeholder="https://example.com/imagen.jpg"
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeField(i, "imgSrc")}
                  disabled={formData.imgSrc.length === 1}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => addField("imgSrc")}
            >
              + Agregar imagen
            </button>
          </div>


          {/* PriceRange */}
          <div className="mb-3">
            <label className="form-label">Precio por hora:</label>
            <input
              type="number"
              name="priceRange"
              className="form-control"
              min="1"
              value={formData.priceRange}
              onChange={handleChange}
            />
          </div>

          {/* Features */}
          <div className="mb-3">
            <label className="form-label">Características</label>
            {formData.features.map((feature, i) => (
              <div key={i} className="d-flex mb-2">
                <input
                  type="text"
                  className="form-control me-2"
                  value={feature}
                  onChange={(e) =>
                    handleArrayChange(i, e.target.value, "features")
                  }
                  placeholder="Ej: Fácil de usar"
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeField(i, "features")}
                  disabled={formData.features.length === 1}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => addField("features")}
            >
              + Agregar característica
            </button>
          </div>

          {/* Ubicación con Mapbox */}
          <div className="mb-3">
            <label className="form-label">Ubicación del servicio</label>
            <Mapa
              coordenadas={
                formData.coordinates
                  ? { lng: formData.coordinates[0], lat: formData.coordinates[1] }
                  : null
              }
              onCoordenadasChange={handleCoordenadasChange}
            />
            {formData.coordinates && (
              <small className="text-muted">
                Coordenadas: {formData.coordinates[1].toFixed(4)},{" "}
                {formData.coordinates[0].toFixed(4)}
              </small>
            )}
          </div>

          {/* Botón submit */}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Servicio"}
          </button>
        </form>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
}

export default Proveedores;
