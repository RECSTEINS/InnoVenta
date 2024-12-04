import './css_Ordenes/ordenes_ventas.css';
import React, { useEffect, useState} from 'react';
import CardPlatillo from './CardPlatillo';
import Demon from './comida.jpg'

function OrdenesVentasPanel(){

    const [ordenes, setOrdenes] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [platillos, setPlatillos] = useState([]); 
    const [cliente, setCliente] = useState('');
    const [mesa, setMesa] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Comida');

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
        const datosPlatillos = [
            {
                id: 1,
                nombre: 'Panqueques de Caramelo y Frutas',
                imagen: Demon,
                productos: [
                    { nombre_producto: 'Fresa' },
                    { nombre_producto: 'Tomate' },
                    { nombre_producto: 'Cebolla' },
                ],
                precio: 250.0,
            },
            {
                id: 2,
                nombre: 'Tazón de Frutas y Almendras',
                imagen: 'ruta-imagen-2.jpg',
                productos: [
                    { nombre_producto: 'Mango' },
                    { nombre_producto: 'Almendra' },
                ],
                precio: 204.1,
            },
            {
                id: 3,
                nombre: 'Panqueques de Caramelo y Frutas',
                imagen: Demon,
                productos: [
                    { nombre_producto: 'Fresa' },
                    { nombre_producto: 'Tomate' },
                    { nombre_producto: 'Cebolla' },
                ],
                precio: 250.0,
            },
            {
                id: 4,
                nombre: 'Panqueques de Caramelo y Frutas',
                imagen: Demon,
                productos: [
                    { nombre_producto: 'Fresa' },
                    { nombre_producto: 'Tomate' },
                    { nombre_producto: 'Cebolla' },
                ],
                precio: 250.0,
            }
            // Más platillos...
        ];
        setPlatillos(datosPlatillos);
    }, []);


    useEffect(() => {
        const nuevoTotal = carrito.reduce((acum, item) => acum + item.precio * item.cantidad, 0);
        setTotal(nuevoTotal);
    }, [carrito]);

    const handleOrderSubmit = () => {
        const orden = {
            cliente,
            mesa,
            platillos: carrito,
            total,
        };
        console.log('Orden enviada: ', orden);
    };

    return(
        <div className='row panel-ordenes-principal'>

            <div className='ordenes-ventas-panel col-9'>
                <div className='row'>
                    <div className='panel-ordenes-status col-12'>
                        <div className='ordenes-status'>
                            <div className="orden-status" style={{ backgroundColor: '#C2EAF1' }}>
                                <h4>Orden:</h4>
                                <p>En Proceso</p>
                            </div>
                            <div className="orden-status" style={{ backgroundColor: '#F4DFBA' }}>
                                <h4>Orden:</h4>
                                <p>En Proceso</p>
                            </div>
                            <div className="orden-status" style={{ backgroundColor: '#EDE7F6' }}>
                                <h4>Orden:</h4>
                                <p>Listo</p>
                            </div>
                        </div>
                    </div>

                    <div className="ordenes-contenido">
                        {/* Categorías */}
                        <div className="categorias">
                            <button onClick={() => handleCategoriaChange('Comida')}>Comida</button>
                            <button onClick={() => handleCategoriaChange('Bebida')}>Bebida</button>
                            <button onClick={() => handleCategoriaChange('Postres')}>Postres</button>
                        </div>

                        {/* Lista de platillos */}
                        <div className="lista-platillos">
                            {/* Aquí iteraremos los platillos según la categoría seleccionada */}
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
                        />
                        <input
                            type='text'
                            placeholder='N# Mesa'
                            value={mesa}
                            onChange={(e) => setMesa(e.target.value)}
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
                        <a>- - - - - - - - - - - - - - - - - - - - - - - - - - -</a>
                        <p>Total:</p>
                        <h4>${total.toFixed(2)}</h4>
                    </div>
                    
                </div>

                <div>
                    <button className='carrito-btn-agregar' onClick={handleOrderSubmit}>Continuar</button>
                </div>
            </div>  
        </div>
        
    )
}

export default OrdenesVentasPanel;