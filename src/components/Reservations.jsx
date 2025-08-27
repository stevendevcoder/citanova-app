import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Reservations.css";

import Calendar from './Calendar';


const userReservations = [
    {
        title: "Consultoría Empresarial",
        profesional: "Carlos Pérez",
        place: "Calle 123 #45-67, Barrio El Prado, Localidad de Suba",
        startDate: "27/08/2025",
        endDate: "27/08/2025",
        rating: 4.9,
        priceRange: "$120.000 COP"
    },
    {
        title: "Agendamiento Inteligente",
        profesional: "Juana Gómez",
        place: "Carrera 15 #98-23, Barrio Santa Bibiana, Localidad de Chapinero",
        startDate: "30/08/2025",
        endDate: "30/08/2025",
        rating: 4.8,
        priceRange: "$150.000 COP"
    },
    {
        title: "Notificaciones Automáticas",
        profesional: "Julian Martínez",
        place: "Carrera 15 #98-23, Barrio Santa Bibiana, Localidad de Chapinero",
        startDate: "01/09/2025",
        endDate: "01/09/20255",
        rating: 4.7,
        priceRange: "$180.000 COP"
    },

];

const markedDays = {
    "2025-08-27": "Consultoría",
    "2025-08-30": "Notificaciones",
    "2025-09-01": "Reportes"
};

const Reservations = ({ userReservation }) => {
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Mis Reservas</h2>
            <div className="App">
                <Calendar markedDays={markedDays} />
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Servicio</th>
                            <th>Profesional</th>
                            <th>Lugar</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Final</th>
                            <th>Rating</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userReservations.map((reserva, index) => (
                            <tr key={index}>

                                <td>{reserva.title}</td>
                                <td>{reserva.profesional}</td>
                                <td>{reserva.place}</td>
                                <td>{reserva.startDate}</td>
                                <td>{reserva.endDate}</td>
                                <td>{reserva.rating} ⭐</td>
                                <td>{reserva.priceRange}</td>
                                {/* <td>
                                    <ul className="mb-0">
                                        {reserva.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reservations;