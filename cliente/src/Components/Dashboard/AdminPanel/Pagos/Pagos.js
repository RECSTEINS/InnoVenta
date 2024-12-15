import './css_Pago/pagos.css';
import React, { useEffect, useState, useRef } from 'react';
import Logo from '../../../../Assets/Logo/logo-login.png';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import Swal from 'sweetalert2';

import CardOrdenes from '../Ordenes/CardOrdenes';
function PagosPanel() {

    const [ordenesListas, setOrdenesListas] = useState([]);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
    const [pago, setPago] = useState("0.00");
    const [cambio, setCambio] = useState(0);
    const [cursorPos, setCursorPos] = useState(null);

    const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
    
    const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState("");

    useEffect(() => {
        if (ordenSeleccionada) {
            const totalSinIVA = parseFloat(ordenSeleccionada.total).toFixed(2);
            const iva = (totalSinIVA * 0.16).toFixed(2);
            const montoTotal = (parseFloat(totalSinIVA) + parseFloat(iva)).toFixed(2);
    
            actualizarRecibo({
                tipoPago: metodoPagoSeleccionado || "N/A",
                montoSinIVA: totalSinIVA,
                iva: iva,
                montoTotal: montoTotal,
            });
        }
    }, [metodoPagoSeleccionado, ordenSeleccionada]);


    const reciboRef = useRef();

    const handleImprimir = () => {
        const element = reciboRef.current;
        
        const options = {
            margin: [5, 10, 5, 10],
            filename: 'recibo.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'px', format: [400, 1000], orientation: 'portrait' },
        };

        html2pdf().set(options).from(element).save();
    };



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
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar las órdenes listas.',
            });
        }
    };

    useEffect(() => {
        fetchOrdenesListas();
    }, []);

    const handleShow = (orden) => {
        setOrdenSeleccionada({ ...orden, pk_pedido: orden.numero });
        setVentaSeleccionada({ id: orden.idPlatillo });
        setPago("0.00");
        setCambio(0);
        setCursorPos(null);
    
        const totalSinIVA = parseFloat(orden.total).toFixed(2);
        const iva = (totalSinIVA * 0.16).toFixed(2);
        const montoTotal = (parseFloat(totalSinIVA) + parseFloat(iva)).toFixed(2);
    
        actualizarRecibo({
            tipoPago: metodoPagoSeleccionado || "N/A",
            montoSinIVA: totalSinIVA,
            iva: iva,
            montoTotal: montoTotal,
        });
    };

    const handleTeclado = (tecla) => {
        if (typeof tecla === "number") {
            
            setPago((prevPago) => {
                const prevPagoNum = parseFloat(prevPago) || 0; 
                return (prevPagoNum + tecla).toFixed(2); 
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
                setPago((prevPago) => `${prevPago}.`);
                setCursorPos(pago.length + 1);
            }
        } else {
            let newPago = pago;
            if (cursorPos !== null) {
               
                newPago =
                    pago.slice(0, cursorPos) +
                    tecla +
                    pago.slice(cursorPos);
                setCursorPos((prev) => prev + 1);
            } else {
                newPago = pago === "0.00" ? tecla : `${pago}${tecla}`;
            }
            setPago(newPago);
        }
    };

    const montoConIva = ordenSeleccionada ? (parseFloat(ordenSeleccionada.total) * 1.16).toFixed(2) : "0.00";

    useEffect(() => {
        if (ordenSeleccionada) {
            const totalConIva = parseFloat(montoConIva);
            const pagoNumerico = parseFloat(pago) || 0;
            setCambio((pagoNumerico - totalConIva).toFixed(2));
        }
    }, [pago, ordenSeleccionada, montoConIva]);

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

    const handleProcesarPago = async () => {
        if (!ventaSeleccionada || !metodoPagoSeleccionado) {
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Selecciona un pedido y un método de pago.',
            });
            return;
        }
    
        const payload = {
            tipo: metodoPagoSeleccionado.toUpperCase(),
            pk_pedido: ordenSeleccionada.pk_pedido,
        };
    
        console.log("Payload enviado:", payload);
    
        try {
            const response = await axios.post('http://localhost:7777/realizar-pago', payload);
    
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Pago registrado!',
                    text: `El monto pagado es de $${response.data.montoConIVA}.`,
                });
                console.log("Pago exitoso:", response.data);
    
                
                await fetchOrdenesListas(); 
                setOrdenSeleccionada(null);
                setPago("0.00");
                setCambio(0);
                setMetodoPagoSeleccionado("");
            }
        } catch (error) {
            console.error("Error al procesar el pago:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al registrar el pago.',
            });
        }
    };

    const [recibo, setRecibo] = useState({
        tipoPago: "",
        montoSinIVA: 0,
        iva: 0,
        montoTotal: 0
    });
    
    const actualizarRecibo = ({ tipoPago, montoSinIVA, iva, montoTotal }) => {
        setRecibo({
            tipoPago,
            montoSinIVA,
            iva,
            montoTotal
        });
    };

    return (
        <div className="pagos-container">
            <div className="pagos-calculadora">
                <div className="pagos-header">
                    <p className="pagos-caja">Caja: 2</p>
                    <div className="pagos-panel">
                    <p className='panel-ordenes-title'>Órdenes Listas</p>
                   
                        <div className="panel-ordenes-listo-pago">
                            <CardOrdenes
                                ordenes={ordenesListas}
                                onShowDetalle={handleShow}
                                className="ordenes-scrollable"
                            />
                        </div>
                    </div>
                </div>

                <div className="pagos-opciones">
                    {["Efectivo"].map((metodo) => (
                        <button
                            key={metodo}
                            className={`btn-opcion-pago ${metodoPagoSeleccionado === metodo ? "metodo-seleccionado" : ""}`}
                            onClick={() => setMetodoPagoSeleccionado(metodo)}
                        >
                            {metodo}
                        </button>
                    ))}
                    {["Tarjeta"].map((metodo) => (
                        <button
                            key={metodo}
                            className={`btn-opcion-pago ${metodoPagoSeleccionado === metodo ? "metodo-seleccionado" : ""}`}
                            onClick={() => setMetodoPagoSeleccionado(metodo)}
                        >
                            {metodo}
                        </button>
                    ))}
                    {["Vales"].map((metodo) => (
                        <button
                            key={metodo}
                            className={`btn-opcion-pago ${metodoPagoSeleccionado === metodo ? "metodo-seleccionado" : ""}`}
                            onClick={() => setMetodoPagoSeleccionado(metodo)}
                        >
                            {metodo}
                        </button>
                    ))}
                   
                </div>

                <div className="pagos-totales">
                    <div className="totales-item">
                        <p className="totales-item-encabezados">Total:</p>
                        <p className="totales-item-total">${montoConIva}</p>
                    </div>
                    <div className="totales-item">
                        <p className="totales-item-encabezados">Pago:</p>
                        <p className="totales-item-pago-cambio">{renderPagoHighlight()}</p>
                    </div>
                    <div className="totales-item">
                        <p className="totales-item-encabezados">Cambio:</p>
                        <p className="totales-item-pago-cambio">${cambio}</p>
                    </div>
                </div>
                <div>
                    <p className='pagos-linea'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
                </div>

                <div className="pagos-rapidos">
                    {[20, 50, 100, 500].map((amount) => (
                        <button key={amount} onClick={() => handleTeclado(amount)}>+{amount}</button>
                    ))}
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
                    <button 
                        className="teclado-btn-total" 
                        onClick={() => {
                            if (!metodoPagoSeleccionado) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Método de Pago',
                                    text: 'Por favor, selecciona un método de pago.',
                                });
                                return;
                            }
                            if (parseFloat(pago) < parseFloat(montoConIva)) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Monto insuficiente',
                                    text: 'El monto pagado no cubre el total requerido.',
                                });
                                return;
                            }
                            handleProcesarPago();
                        }} 
                    >
                        Total<br/>(Enter)
                    </button>
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
            <div ref={reciboRef}  className="pagos-recibo">
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
                                    <td className='recibo-tabla-cantidad'>{platillo.cantidad}</td>
                                    <td>${platillo.precio.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="recibo-total">
                    <p>${montoConIva}</p>
                </div>
                <div className="resumen-pago">
                    <p className='resumen-linea'>- - - - - - - - - - - - - - - - - - - -</p>
                    <p className='resumen-total'>Importe Total: <a className='resumen-total-numero'>${recibo.montoTotal}</a></p>
                    <p className='resumen-total'>Tasa: <a className='resumen-total-numero-2'>16%</a></p>
                    <p className='resumen-total'>IVA: <a className='resumen-total-numero-4'>${recibo.iva}</a></p>
                    <p className='resumen-total'>Tipo de Pago: <a className='resumen-total-numero-3'>{recibo.tipoPago}</a></p>
                    <p>- - - - - - - - - - - - - - - - - - - -</p>
                    <p className='resumen-gracias'>¡Gracias por su compra!</p>
                </div>
            </div>
            <button className="btn-imprimir" onClick={handleImprimir}>Imprimir</button>
        </div>
    );
}

export default PagosPanel;