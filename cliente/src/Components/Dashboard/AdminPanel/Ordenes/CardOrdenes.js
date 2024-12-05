import React, { useRef } from 'react';
import './css_Ordenes/cardordenes.css';

const CardOrdenes = ({ ordenes }) => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="slider-container">
            <i onClick={scrollLeft} className="bi bi-arrow-left-circle-fill slider-button left"></i>
            <div className="ordenes-2 ordenes-scrollable" ref={scrollRef}>
                {ordenes.length === 0 ? (
                    <p></p>
                ) : (
                    ordenes.map((orden, index) => (
                        <div key={index} className={`orden-status-2 ${orden.estado.toLowerCase()}`}>
                            <p className='orden-name'>Orden: {orden.numero}</p>
                            <div className='row orden-info-inferior'>
                                <p className='orden-table col-'>Mesa: {orden.mesa}</p>
                                <button className='btn-state-orden'><p className='orden-state col-12'>{orden.estado}</p></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <i onClick={scrollRight} class="bi bi-arrow-right-circle-fill slider-button right"></i>'
        </div>
    );

};

export default CardOrdenes;

<i class="bi bi-arrow-left-circle-fill"></i>