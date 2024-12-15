import './css_Ordenes/ordenes_ventas.css';
import React, { useEffect, useState} from 'react';
import CardPlatillo from './CardPlatillo';
import CardOrdenes from './CardOrdenes';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

function OrdenesVentasPanel(){

    const [busqueda, setBusqueda] = useState('');
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

    const platillosFiltrados = platillos
    .filter(platillo => platillo.categoria === categoriaSeleccionada)
    .filter(platillo => platillo.nombre.toLowerCase().includes(busqueda.toLowerCase()));

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
            Swal.fire({
                icon: 'error',
                title: 'Campos obligatorios',
                text: 'Todos los campos son obligatorios y el carrito no puede estar vacío.',
            });
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
                Swal.fire({
                    icon: 'success',
                    title: 'Pedido creado',
                    text: 'El pedido fue creado correctamente.',
                    timer: 2000,
                    showConfirmButton: false,
                });
                setOrdenes([...ordenes, nuevoOrden]);
                setCarrito([]);
                setCliente('');
                setMesa('');
            }else{
                alert("Hubo un problema al crear el pedido. Intenta nuevamente.");
            }
        }catch(error){
            console.error("Error al enviar el pedido al servidor: ", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el pedido',
                text: 'No se pudo crear el pedido. Revise que el stock sea lo suficientemente alto',
            });
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
            
            console.log('ID Pedido:', idPedido);
            console.log('Nuevo Estado:', nuevoEstado);
    
            const url = `http://localhost:7777/pedidos/${idPedido}/estado`;
    
        
            const response = await axios.put(url, { estado: nuevoEstado });
        

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Estado actualizado',
                    text: 'El estado del pedido fue actualizado correctamente.',
                    timer: 2000,
                    showConfirmButton: false,
                });
    
                await fetchOrdenesEnProceso();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al actualizar el estado del pedido.',
                });
            }
        } catch (error) {
            
            console.error('Error al actualizar el estado del pedido:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el estado del pedido.',
            });
        }
    };

    return(
        <div className='row panel-ordenes-principal'>
            
            <div className='ordenes-ventas-panel col-9'>

                <div className='row'>
                <div className="barra-busqueda">
    <input
        type="text"
        placeholder="Buscar platillo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-busqueda"
    />
</div>
                    <div className='panel-ordenes-statu col-12'>
                        <CardOrdenes ordenes={ordenes} onShowDetalle={handleShow} className="ordemes-scrollable"/>
                    </div>

                    <div className="categorias">
                            <button className='categorias-btn' onClick={() => handleCategoriaChange('Comida')}>Comida</button>
                            <button className='categorias-btn' onClick={() => handleCategoriaChange('Bebida')}>Bebidas</button>
                            <button className='categorias-btn' onClick={() => handleCategoriaChange('Postres')}>Postres</button>
                    </div>

                    <div className="ordenes-contenido">
                        {/* Categorías */}

                        {/* Lista de platillos */}
                        <div className="lista-platillos">
                            {platillosFiltrados.map((platillo) =>(
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
            <Modal show={showModal} onHide={handleClose} centered className="custom-modals"
                
    backdrop="true"
            >
            <Modal.Header closeButton className="custom-modal-headers" >
                <Modal.Title>
                    <i className="bi bi-receipt-cutoff"></i> Detalles del Pedido
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-modal-bodys">
                {ordenSeleccionada ? (
                    <div>
                        <p><strong>Orden N°:</strong> {ordenSeleccionada.numero}</p>
                        <p><strong>Mesa:</strong> {ordenSeleccionada.mesa}</p>
                        <p><strong>Cliente:</strong> {ordenSeleccionada.cliente}</p>
                        <p><strong>Estado:</strong> <span className={`estado-${ordenSeleccionada.estado.toLowerCase()}`}>{ordenSeleccionada.estado}</span></p>
                        <p><strong>Total:</strong> <span className="text-success">${ordenSeleccionada.total}</span></p>
                        <hr />
                        <p><strong>Platillos:</strong></p>
                        <ul className="platillos-lista">
                            {ordenSeleccionada.platillos.map((platillo, index) => (
                                <li key={index} className="platillo-item">
                                    {platillo.nombre} - <span className="cantidad">Cantidad: {platillo.cantidad}</span>
                                </li>
                            ))}
                        </ul>
                        <hr />
                        <p><strong>Cambiar Estado:</strong></p>
                        <select
                            value={ordenSeleccionada.estado}
                            onChange={(e) => handleChangeEstado(ordenSeleccionada.numero, e.target.value)}
                            className="form-select estado-select"
                        >
                            <option value="EN PROCESO">EN PROCESO</option>
                            <option value="LISTO">LISTO</option>
                            <option value="CANCELADO">CANCELADO</option>
                        </select>
                    </div>
                ) : (
                    <p className="text-muted">No hay información disponible</p>
                )}
            </Modal.Body>
            <Modal.Footer className="custom-modal-footer">
                <Button variant="secondary" onClick={handleClose} className="btn-close-modal">
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
        
    )
}

export default OrdenesVentasPanel;