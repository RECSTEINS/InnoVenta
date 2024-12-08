import React, { useState, useEffect } from 'react';
import './css_Ordenes/cardplatillo.css';

function CardPlatillo({ platillo, onAddToCart }) {
    const [showModal, setShowModal] = useState(false);
    const [extras, setExtras] = useState([]);
    const [precioAdicional, setPrecioAdicional] = useState(0);
    const precioExtraFijo = 5; // Precio fijo por cada extra seleccionado

    // Alternar el modal
    const toggleModal = () => setShowModal(!showModal);

    // Cerrar modal con tecla Escape y desactivar scroll
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setShowModal(false);
        };

        if (showModal) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        }

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [showModal]);

    // Manejar la selección de extras
    const handleExtraChange = (extra, isChecked) => {
        if (isChecked) {
            setExtras([...extras, extra]);
            setPrecioAdicional(precioAdicional + precioExtraFijo);
        } else {
            setExtras(extras.filter(e => e.nombre !== extra.nombre));
            setPrecioAdicional(precioAdicional - precioExtraFijo);
        }
    };

    // Agregar el platillo con extras al carrito
    const handleAddCustomPlatillo = () => {
        const customPlatillo = {
            ...platillo,
            extras,
            precio: platillo.precio + precioAdicional,
        };
        onAddToCart(customPlatillo);
        toggleModal();
    };

    return (
        <>
            {/* Card del Platillo */}
            <div className="card-platillo">
                <img src={platillo.imagen} alt={platillo.nombre} className="platillo-img" />
                <h4 className="platillo-nombre">{platillo.nombre}</h4>
                <p className="platillo-productos">
                    {platillo.productos.map(prod => prod.nombre_producto).join(', ')}
                </p>
                <div className="platillo-opciones">
                    <button className="btn-info-platillo" onClick={toggleModal}>
                        <i className="bi bi-sliders"></i>
                    </button>
                    <p className="platillo-precio">${platillo.precio.toFixed(2)}</p>
                    <button className="btn-agregar-carrito" onClick={() => onAddToCart(platillo)}>
                        <i className="bi bi-cart-plus-fill icono-carrito"></i>
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-container">
                    <div className="modal-content">
                        <h4>Personalizar {platillo.nombre}</h4>
                        <p>Selecciona los extras:</p>
                        <ul>
                            {platillo.productos.map((prod, index) => (
                                <li key={index}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleExtraChange(prod, e.target.checked)}
                                        />
                                        {prod.nombre_producto} (+${precioExtraFijo.toFixed(2)})
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <p>
                            Precio adicional: <strong>${precioAdicional.toFixed(2)}</strong>
                        </p>
                        <div className="modal-buttons">
                            <button className="btn btn-success" onClick={handleAddCustomPlatillo}>
                                Agregar al carrito
                            </button>
                            <button className="btn btn-secondary" onClick={toggleModal}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CardPlatillo;