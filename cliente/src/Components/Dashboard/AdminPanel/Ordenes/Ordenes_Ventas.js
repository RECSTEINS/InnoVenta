import './css_Ordenes/ordenes_ventas.css';
import React, { useEffect, useState} from 'react';
import CardPlatillo from './CardPlatillo';
import CardOrdenes from './CardOrdenes';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function OrdenesVentasPanel(){

    const [ordenes, setOrdenes] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [platillos, setPlatillos] = useState([]); 
    const [cliente, setCliente] = useState('');
    const [mesa, setMesa] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Comida');
    
    const colores = ["color-1", "color-2", "color-3"];

    //MODAL, NO OLVIDAR
    const [showModal, setShowModal] = useState(false);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

    const handleClose = () => setShowModal(false);
    const handleShow = (orden) => {
        setOrdenSeleccionada(orden);
        setShowModal(true);
    };



    const handleCategoriaChange = (categoria) => {
        setCategoriaSeleccionada(categoria);
    };

    const handleAddToCart = (platillo) => {
        setCarrito((prevCarrito) => {
            const existe = prevCarrito.find(item => item.id === platillo.id);
            if(existe) {
                return prevCarrito.map(item =>
                    item.id === platillo.id
                        ? {...item, cantidad: item.cantidad + 1}
                        : item
                );
            }
            return [...prevCarrito, {...platillo, cantidad: 1}];
        });
    };

    const handleRemoveFromCart = (id) => {
        setCarrito((prevCarrito) => {
            return prevCarrito
                .map(item => (item.id === id ? {...item, cantidad: item.cantidad - 1} : item))
                .filter(item => item.cantidad > 0);
        });
    };

    useEffect(() => {
        const fetchPlatillos = async () => {
            try {
                const response = await axios.get('http://localhost:7777/getPlatillos');
                
                const datos = response.data.map((platillo) => ({
                    ...platillo,
                    imagen: `http://localhost:7777${platillo.img}`, 
                }));
                setPlatillos(datos);
            } catch (error) {
                console.error('Error al obtener los platillos', error);
            }
        };
        fetchPlatillos();
    }, []);

    useEffect(() => {
        const nuevoTotal = carrito.reduce((acum, item) => acum + item.precio * item.cantidad, 0);
        setTotal(nuevoTotal);
    }, [carrito]);


    //OBTENER PEDIDOS EN PROCESO
    useEffect(() => {
        const fetchOrdenesEnProceso = async () => {
            try {
                const response = await axios.get('http://localhost:7777/getPedidosEnProceso');
                const datos = response.data.map((orden) => ({
                    numero: orden.id,
                    mesa: orden.numeroMesa,
                    estado: orden.estado,
                    colorClase: orden.colorClase, 
                    platillos: orden.platillos || [], 
                    total: orden.monto || 0,
                    clientet: orden.cliente,
                }));
                setOrdenes(datos);
            } catch (error) {
                console.error('Error al obtener las órdenes:', error);
            }
        };
    
        fetchOrdenesEnProceso();
    }, []);

    //CREAR ORDEN
    const handleOrderSubmit = async () => {
        if(!cliente || !mesa || carrito.length === 0){
            alert("Todos los campos son obligatorios y el carrito no puede estar vacío.");
            return;
        }

        const nuevoIndiceColor = ordenes.length % colores.length;

        const nuevoOrden ={
            numero: ordenes.length + 1,
            mesa: mesa,
            estado: 'En proceso',
            platillos: carrito,
            total: total.toFixed(2),
            colorClase: colores[nuevoIndiceColor],
        };

        const pedidoData = {
            cliente,
            mesa,
            total,
            carrito,
            usuarioId: 1,
        }

        try{
            const response = await axios.post('http://localhost:7777/crear-pedido', pedidoData);

            if(response.status === 200){
                alert("Pedido creado correctamente.");
                setOrdenes([...ordenes, nuevoOrden]);
                setCarrito([]);
                setCliente('');
                setMesa('');
            }else{
                alert("Hubo un problema al crear el pedido. Intenta nuevamente.");
            }
        }catch(error){
            console.error("Error al enviar el pedido al servidor: ", error);
            alert("No se pudo crear el pedido. :(");
        }
    };


    const fetchOrdenesEnProceso = async () => {
        try {
            const response = await axios.get('http://localhost:7777/getPedidosEnProceso');
            const datos = response.data.map((orden) => ({
                numero: orden.id,
                mesa: orden.numeroMesa,
                estado: orden.estado,
                colorClase: orden.colorClase,
                platillos: orden.platillos || [],
                total: orden.monto || 0,
                clientet: orden.cliente,
            }));
            setOrdenes(datos);
        } catch (error) {
            console.error('Error al obtener las órdenes:', error);
        }
    };

    const handleChangeEstado = async (idPedido, nuevoEstado) => {
        try {
            // Verifica que los datos sean correctos antes de enviar la solicitud
            console.log('ID Pedido:', idPedido);
            console.log('Nuevo Estado:', nuevoEstado);
    
            const url = `http://localhost:7777/pedidos/${idPedido}/estado`;
    
            // Realiza la solicitud PUT para actualizar el estado del pedido
            const response = await axios.put(url, { estado: nuevoEstado });
            
            // Verifica si la respuesta es exitosa
            if (response.status === 200) {
                alert('Estado del pedido actualizado correctamente.');
    
                await fetchOrdenesEnProceso();
            } else {
                alert('Error al actualizar el estado del pedido.');
            }
        } catch (error) {
            // Maneja cualquier error en la solicitud
            console.error('Error al actualizar el estado del pedido:', error);
            alert('No se pudo actualizar el estado del pedido.');
        }
    };

    return(
        <div className='row panel-ordenes-principal'>
            
            <div className='ordenes-ventas-panel col-9'>
                <div className='row'>
                    <div className='panel-ordenes-statu col-12'>
                        <CardOrdenes ordenes={ordenes} onShowDetalle={handleShow} className="ordemes-scrollable"/>
                    </div>

                    <div className="ordenes-contenido">
                        {/* Categorías */}
                        <div className="categorias">
                            <button onClick={() => handleCategoriaChange('Comida')}>Comida<i class="bi bi-piggy-bank-fill icono-categoria"></i></button>
                            <button onClick={() => handleCategoriaChange('Bebida')}>Bebida<i class="bi bi-cup-straw icono-categoria"></i></button>
                            <button onClick={() => handleCategoriaChange('Postres')}>Postres<i class="bi bi-cake2-fill icono-categoria"></i></button>
                        </div>

                        {/* Lista de platillos */}
                        <div className="lista-platillos">
                            {platillos.map((platillo) =>(
                                <CardPlatillo
                                    key={platillo.id}
                                    platillo={platillo}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    </div>  
                </div>        
            </div>

            <div className="col-3">
                <div className='carrito'>
                    <div className='formulario-carrito'>
                        <input
                            className=''
                            type='text'
                            placeholder='Cliente'
                            value={cliente}
                            onChange={(e) => setCliente(e.target.value)}
                            required
                        />
                        <input
                            type='text'
                            placeholder='N# Mesa'
                            value={mesa}
                            onChange={(e) => setMesa(e.target.value)}
                            required
                        />
                    </div>

                    <div className="carrito-lista">
                        {carrito.map(item => (
                            <div key={item.id} className='carrito-item row'>
                                <div className='col-1'>
                                    <img src={item.imagen} alt={item.nombre} className='carrito-item-img'/>
                                </div>
                                <div className='col-8 carrito-item-name-price mt-4'>
                                    <p className='carrito-item-name'>{item.nombre}</p>
                                    <p className='carrito-item-price'>${item.precio}</p>                    
                                </div>
                                <div className='carrito-options'>
                                    <i onClick={() => handleRemoveFromCart(item.id)}  class="bi bi-dash-circle-fill carrito-btn-minus"></i>
                                    <span className='carrito-item-number'>{item.cantidad}</span>
                                    <i onClick={() => handleAddToCart(item)} class="bi bi-plus-circle-fill carrito-btn-plus"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="carrito-total">
                    <div className="ticket">
                        <a>ㅤ</a>
                        <br/>
                        <a>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</a>
                        <p>Total:</p>
                        <h4>${total.toFixed(2)}</h4>
                    </div>
                    
                </div>

                <div>
                    <button className='carrito-btn-agregar' onClick={handleOrderSubmit}>Continuar</button>
                </div>
            </div> 


            {/*MODAL, AQUI YA LO USAMOS*/}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {ordenSeleccionada ? (
                        <div>
                            <p><strong>Orden N°: </strong>{ordenSeleccionada.numero}</p>
                            <p><strong>Mesa: </strong>{ordenSeleccionada.mesa}</p>
                            <p><strong>Cliente: </strong>{ordenSeleccionada.clientet}</p>
                            <p><strong>Estado: </strong>{ordenSeleccionada.estado}</p>
                            <p><strong>Total: </strong>${ordenSeleccionada.total}</p>
                            <p><strong>Platillos:</strong></p>
                            <ul>
                                {ordenSeleccionada.platillos.map((platillo, index) =>(
                                    <li key={index}>
                                        {platillo.nombre} - Cantidad: {platillo.cantidad}
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Cambiar estado: </strong></p>
                            <select
                                value={ordenSeleccionada.estado}
                                onChange={(e) => handleChangeEstado(ordenSeleccionada.numero ,e.target.value)}
                                className="form-select"
                            >
                                <option value="EN PROCESO">EN PROCESO</option>
                                <option value="LISTO">LISTO</option>
                                <option value="CANCELADO">CANCELADO</option>
                            </select>
                        </div>
                    ) : (
                        <p>No hay información disponible</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    )
}

export default OrdenesVentasPanel;