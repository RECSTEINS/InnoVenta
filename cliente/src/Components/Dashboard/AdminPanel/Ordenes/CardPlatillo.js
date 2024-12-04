import React from 'react';
import './css_Ordenes/cardplatillo.css';

function CardPlatillo({ platillo, onAddToCart }) {
    return (
        <div className="card-platillo">
            <img src={platillo.imagen} alt={platillo.nombre} className="platillo-img" />
            <h4 className="platillo-nombre">{platillo.nombre}</h4>
            <p className="platillo-productos">
                {platillo.productos.map(prod => prod.nombre_producto).join(', ')}
            </p>
            <div className='platillo-opciones'>
                <button className='btn-info-platillo'>
                    <i class="bi bi-sliders"></i>
                </button>
                <p className="platillo-precio">${platillo.precio.toFixed(2)}</p>
                <button className="btn-agregar-carritoa" onClick={() => onAddToCart(platillo)}>
                    <i class="bi bi-cart-plus-fill icono-carrito"></i>
                </button>
            </div>
        </div>
    );
}

export default CardPlatillo;