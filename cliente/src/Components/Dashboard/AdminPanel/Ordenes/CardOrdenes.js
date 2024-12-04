import React from 'react';
import './css_Ordenes/cardordenes.css';

const cardOrdenes = ({ ordenes }) => {
    return (
        <div className='ordenes'>
            {ordenes.map((orden, index) => (
                <div key={index} className={`orden-status ${orden.estado.toLowerCase()}`}>
                    <h4>Orden: {orden.numero}</h4>
                    <p>{orden.estado}</p>
                    <p>Mesa: {orden.mesa}</p>
                </div>
            ))}
        </div>
    );
};

export default cardOrdenes;