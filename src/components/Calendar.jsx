import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Reservations.css";
import "../styles/Calendar.css";

const Calendar = ({ markedDays = {} }) => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    const prevMonth = () => {
        setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
        if (currentMonth === 0) {
            setCurrentYear((prev) => prev - 1);
        }
    };

    const nextMonth = () => {
        setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
        if (currentMonth === 11) {
            setCurrentYear((prev) => prev + 1);
        }
    };

    const generateCalendar = () => {
        const weeks = [];
        let day = 1 - firstDayOfMonth;

        for (let i = 0; i < 6; i++) {
            const week = [];

            for (let j = 0; j < 7; j++, day++) {
                if (day < 1 || day > daysInMonth) {
                    week.push(<td key={j}></td>);
                } else {
                    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const mark = markedDays[dateKey];

                    week.push(
                        <td
                            key={j}
                            className="align-top"
                            style={{
                                verticalAlign: 'top',
                                width: '14.28%',  // 100% / 7 días
                                maxWidth: '14.28%',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                className="p-1 border rounded d-flex flex-column"
                                style={{
                                    minHeight: '60px',
                                    height: '80px',
                                    backgroundColor: mark ? '#e7f1ff' : 'transparent',
                                    overflow: 'hidden',
                                }}
                            >
                                <strong>{day}</strong>
                                {mark && (
                                    <div
                                        className="small text-muted mt-1"
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                        title={mark}
                                    >
                                        {mark}
                                    </div>
                                )}
                            </div>
                        </td>
                    );
                }
            }

            weeks.push(<tr key={i}>{week}</tr>);
        }

        return weeks;
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <button className="btn btn-outline-primary btn-sm" onClick={prevMonth}>←</button>
                <h4 className="calendar-title">{monthNames[currentMonth]} {currentYear}</h4>
                <button className="btn btn-outline-primary btn-sm" onClick={nextMonth}>→</button>
            </div>
            <table className="table table-bordered text-center">
                <thead className="table-light">
                    <tr>
                        {daysOfWeek.map((day, idx) => (
                            <th className="calendar-day" key={idx}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {generateCalendar()}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
