import './css_Pago/pagos.css'
import React, { useEffect, useState } from 'react';
import Logo from '../../../../Assets/Logo/logo-login.png'

import './css_Pago/pagos.css'

function PagosPanel(){
    
    const [total, setTotal] = useState(594.4);
    const [pago, setPago] = useState(0);
    const [cambio, setCambio] = useState(0);

    const productos = [
        { nombre: "Tostada de Aguacate con Huevo", cantidad: 1, precio: 120.0 },
        { nombre: "Tazón de Frutas y Almendras", cantidad: 1, precio: 274.1 },
        { nombre: "Hamburguesa Clásica con Papas", cantidad: 1, precio: 200.3 },
    ];

  
    const handlePago = (monto) => {
        const nuevoPago = pago + monto;
        setPago(nuevoPago);
        setCambio(nuevoPago - total);
    };

    return(
        <div className="pagos-container">
            {/* Sección izquierda: Calculadora y opciones */}
            <div className="pagos-calculadora">
                {/* Encabezado con Opciones */}
                <div className="pagos-header">
                    <p className='pagos-caja'>Caja: 2</p>
                    <button className="btn-gerenciales">Opciones Gerenciales</button>
                </div>

                {/* Opciones de pago */}
                <div className="pagos-opciones">
                    <button className="btn-opcion-pago">Efectivo</button>
                    <button className="btn-opcion-pago">Tarjeta</button>
                    <button className="btn-opcion-pago">Vales</button>
                </div>

                {/* Totales */ }
                <div className="pagos-totales">
                    <div className="totales-item">
                        <p className='totales-item-encabezados'>Total:</p>
                        <p className='totales-item-total'>${total.toFixed(2)}</p>
                    </div>
                    <div className="totales-item">
                        <p className='totales-item-encabezados'>Pago:</p>
                        <p className='totales-item-pago-cambio'>${pago.toFixed(2)}</p>
                    </div>
                    <div className="totales-item">
                        <p className='totales-item-encabezados'>Cambio:</p>
                        <p className='totales-item-pago-cambio'>${cambio.toFixed(2)}</p>
                    </div>
                </div>

                {/* Botones rápidos */}
                <div className="pagos-rapidos">
                    <button onClick={() => handlePago(20)}>+20</button>
                    <button onClick={() => handlePago(50)}>+50</button>
                    <button onClick={() => handlePago(100)}>+100</button>
                    <button onClick={() => handlePago(500)}>+500</button>
                </div>

                {/* Teclado Numérico */}
                <div className="pagos-teclado">
                    <button class="teclado-btn">1</button>
                    <button class="teclado-btn">2</button>
                    <button class="teclado-btn">3</button>
                    <button class="teclado-btn borrar">X</button>
                    <button class="teclado-btn borrar"><i class="bi bi-backspace-fill"></i></button>

                    <button class="teclado-btn">4</button>
                    <button class="teclado-btn">5</button>
                    <button class="teclado-btn">6</button>
                    <button class="teclado-btn"><i class="bi bi-chevron-left"></i></button>
                    <button class="teclado-btn"><i class="bi bi-chevron-right"></i></button>

                    <button class="teclado-btn">7</button>
                    <button class="teclado-btn">8</button>
                    <button class="teclado-btn">9</button>
                    <button class="teclado-btn">.</button>
                    <button class="teclado-btn-total">Total <br/>(Enter)</button>

                    <button class="teclado-btn ceros">0</button>
                    <button class="teclado-btn ceros">00</button>
                    <button class="teclado-btn ceros">000</button>
                    <button class="teclado-btn-subtotal">Sub <br/>Total</button>
                </div>
            </div>

            {/* Sección derecha: Recibo */}
            <div>
            <div className="pagos-recibo">
                <div className="recibo-header">
                    <img src={Logo} className='recibo-logo'/>
                    <p className='recibo-slogan'>“Gestión que se adapta, resultados que crecen”.</p>
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
                        {productos.map((producto, index) => (
                            <tr key={index}>
                                <td>{producto.nombre}</td>
                                <td>{producto.cantidad}</td>
                                <td>${producto.precio.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="recibo-total">
                    <p>${total.toFixed(2)}</p>
                </div>
            </div>
                <button className="btn-imprimir">Imprimir</button>
        </div>        
    </div>
    )
}

export default PagosPanel;