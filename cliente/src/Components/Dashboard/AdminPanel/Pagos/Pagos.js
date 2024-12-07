import './css_Pago/pagos.css';
import React, { useEffect, useState } from 'react';
import Logo from '../../../../Assets/Logo/logo-login.png';
import axios from 'axios';
import CardOrdenes from '../Ordenes/CardOrdenes';

function PagosPanel() {

    const [ordenesListas, setOrdenesListas] = useState([]);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
    const [pago, setPago] = useState("0.00");
    const [cambio, setCambio] = useState(0);
    const [cursorPos, setCursorPos] = useState(null);

    useEffect(() => {
        const fetchOrdenesListas = async () => {
            try {
                const response = await axios.get('http://localhost:7777/getPedidosListo');
                const datos = response.data.map((orden) => ({
                    numero: orden.id,
                    mesa: orden.numeroMesa,
                    estado: orden.estado,
                    colorClase: orden.colorClase,
                    platillos: orden.platillos || [],
                    total: orden.monto || 0,
                    cliente: orden.cliente,
                }));
                setOrdenesListas(datos);
            } catch (error) {
                console.error('Error al obtener las órdenes "LISTO":', error);
            }
        };

        fetchOrdenesListas();
    }, []);

    const handleShow = (orden) => {
        setOrdenSeleccionada(orden);
        setPago("0.00");
        setCambio(0);
        setCursorPos(null);
    };

    const handleTeclado = (tecla) => {
        if (typeof tecla === "number") {
            // Si la tecla es un número, se trata de un pago rápido
            setPago((prevPago) => {
                const prevPagoNum = parseFloat(prevPago) || 0; // Convertir el valor actual a número
                return (prevPagoNum + tecla).toFixed(2); // Sumar el nuevo monto y mantener dos decimales
            });
        } else if (tecla === "borrarTodo") {
            setPago("0.00");
            setCursorPos(null);
        } else if (tecla === "borrarUno") {
            if (cursorPos !== null && cursorPos > 0) {
                setPago((prevPago) =>
                    prevPago.slice(0, cursorPos - 1) + prevPago.slice(cursorPos)
                );
                setCursorPos((prev) => (prev > 0 ? prev - 1 : prev));
            } else {
                setPago((prevPago) => prevPago.slice(0, -1) || "0.00");
            }
        } else if (tecla === "left") {
            setCursorPos((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
        } else if (tecla === "right") {
            setCursorPos((prev) =>
                prev !== null && prev < pago.length ? prev + 1 : pago.length
            );
        } else if (tecla === ".") {
            if (!pago.includes(".")) {
                if (cursorPos !== null) {
                    // Insertar el punto en la posición del cursor si no existe
                    const newPago =
                        pago.slice(0, cursorPos) + tecla + pago.slice(cursorPos);
                    setPago(newPago);
                    setCursorPos(cursorPos + 1);
                } else {
                    setPago((prevPago) => `${prevPago}.`);
                    setCursorPos(pago.length + 1);
                }
            }
        } else {
            let newPago = pago;
            if (cursorPos !== null) {
                // Insertar en la posición del cursor
                newPago =
                    pago.slice(0, cursorPos) + tecla + pago.slice(cursorPos);
                setCursorPos((prev) => prev + 1);
            } else {
                // Agregar al final
                newPago = pago === "0.00" ? tecla : `${pago}${tecla}`;
            }
            setPago(newPago);
        }
    };
    

    useEffect(() => {
        if (ordenSeleccionada) {
            const total = parseFloat(ordenSeleccionada.total) || 0;
            const pagoNumerico = parseFloat(pago) || 0;
            setCambio(pagoNumerico - total);
        }
    }, [pago, ordenSeleccionada]);

    const renderPagoHighlight = () => {
        const beforeCursor = cursorPos !== null ? pago.slice(0, cursorPos) : pago;
        const activeChar = cursorPos !== null && cursorPos < pago.length ? pago[cursorPos] : "";
        const afterCursor = cursorPos !== null && cursorPos < pago.length ? pago.slice(cursorPos + 1) : "";

        return (
            <span className="pago-highlight">
                <span>{beforeCursor}</span>
                <span className="active-char">{activeChar}</span>
                <span>{afterCursor}</span>
            </span>
        );
    };

    return (
        <div className="pagos-container">
            <div className="pagos-calculadora">
                <div className="pagos-header">
                    <p className="pagos-caja">Caja: 2</p>
                    <div className="pagos-panel">
                        <div className="panel-ordenes-listo-pago">
                            <h4>Órdenes Listas</h4>
                            <CardOrdenes
                                ordenes={ordenesListas}
                                onShowDetalle={handleShow}
                                className="ordenes-scrollable"
                            />
                        </div>
                    </div>
                    <button className="btn-gerenciales">Opciones Gerenciales</button>
                </div>

                <div className="pagos-opciones">
                    <button className="btn-opcion-pago">Efectivo</button>
                    <button className="btn-opcion-pago">Tarjeta</button>
                    <button className="btn-opcion-pago">Vales</button>
                </div>

                <div className="pagos-totales">
                    <div className="totales-item">
                        <p className="totales-item-encabezados">Total:</p>
                        <p className="totales-item-total">
                            ${ordenSeleccionada?.total?.toFixed(2) || "0.00"}
                        </p>
                    </div>
                    <div className="totales-item">
                        <p className="totales-item-encabezados">Pago:</p>
                        <p className="totales-item-pago-cambio">{renderPagoHighlight()}</p>
                    </div>
                    <div className="totales-item">
                        <p className="totales-item-encabezados">Cambio:</p>
                        <p className="totales-item-pago-cambio">${cambio.toFixed(2)}</p>
                    </div>
                </div>

                <div className="pagos-rapidos">
                    <button onClick={() => handleTeclado(20)}>+20</button>
                    <button onClick={() => handleTeclado(50)}>+50</button>
                    <button onClick={() => handleTeclado(100)}>+100</button>
                    <button onClick={() => handleTeclado(500)}>+500</button>
                </div>

                <div className="pagos-teclado">
                    {["1", "2", "3",].map((tecla) => (
                        <button
                            key={tecla}
                            className="teclado-btn"
                            onClick={() => handleTeclado(tecla)}
                        >
                            {tecla}
                        </button>
                    ))}
                    <button
                        className="teclado-btn borrar"
                        onClick={() => handleTeclado("borrarTodo")}
                    >
                        X
                    </button>
                    <button
                        className="teclado-btn borrar"
                        onClick={() => handleTeclado("borrarUno")}
                    >
                        <i className="bi bi-backspace-fill"></i>
                    </button>
                    {["4","5","6",].map((tecla) => (
                        <button
                            key={tecla}
                            className='teclado-btn'
                            onClick={() => handleTeclado(tecla)}
                        >
                            {tecla}
                        </button>
                    ))}
                    <button
                        className="teclado-btn"
                        onClick={() => handleTeclado("left")}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                        className="teclado-btn"
                        onClick={() => handleTeclado("right")}
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>
                    {["7","8","9","."].map((tecla) => (
                        <button
                            key={tecla}
                            className='teclado-btn'
                            onClick={() => handleTeclado(tecla)}
                        >
                            {tecla}
                        </button>
                    ))
                    }
                    <button className="teclado-btn-total">Total<br/>(Enter)</button>
                    {["0","00","000"].map((tecla) => (
                        <button
                            key={tecla}
                            className='teclado-btn ceros'
                            onClick={() => handleTeclado(tecla)}
                        >
                            {tecla}
                        </button>
                    ))
                    }
                    <button className="teclado-btn-subtotal">Sub<br/>Total</button>
                    
                </div>
            </div>
            <div className="pagos-recibo">
                <div className="recibo-header">
                    <img src={Logo} className="recibo-logo" alt="Logo" />
                    <p className="recibo-slogan">“Gestión que se adapta, resultados que crecen”.</p>
                </div>
                <div className="recibo-tabla">
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenSeleccionada?.platillos.map((platillo, index) => (
                                <tr key={index}>
                                    <td>{platillo.nombre}</td>
                                    <td>{platillo.cantidad}</td>
                                    <td>${platillo.precio.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="recibo-total">
                    <p>${ordenSeleccionada?.total?.toFixed(2) || "0.00"}</p>
                </div>
            </div>
            <button className="btn-imprimir">Imprimir</button>
        </div>
    );
}

export default PagosPanel;