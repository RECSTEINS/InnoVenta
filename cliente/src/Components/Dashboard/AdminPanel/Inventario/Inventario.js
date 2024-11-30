import DataTable from 'react-data-table-component';
import './css_Inventario/Inventario.css';
import React, { useEffect, useState } from 'react';

function InventarioPanel(){
    
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [mostrarAddProducto, setMostrarAddProducto] = useState(false);

    const URL = 'http://localhost:7777/getInventario'

    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data)
    }

    const columns = [
        {
            name:'Nombre del producto',
            selector: row => row.producto_nombre,
            sortable: true
        },
        {
            name: 'Cantidad disponible',
            selector: row => row.producto_stock,
            sortable: true
        },
        {
            name: 'Stock mínimo',
            selector: row => row.producto_minimo_stock
        },
        {
            name: 'Opciones',
            selector: row => <button className='editProducto' onClick={""}>Editar</button>
        },
        {
            name:"",
            selector: row => <button className='deletProducto' onClick={""}>Eliminar</button>
        }
    ]

    useEffect(() => {
        showData();
    }, [products]);

    return(
        <div className='inventario-panel'>
            {!mostrarAddProducto ? (
                <>
                    <h2>Inventario de productos</h2>
                    <button
                        className='inventario-button'
                        onClick={() => setMostrarAddProducto(true)}
                    >
                        Agregar producto
                    </button>
                    <DataTable
                        columns={columns}
                        data={filteredProducts}
                        paginationPerPage0={10}
                        pagination
                    />
                </>
            ): (
                <div className='agregar-producto-panel'>

                </div>
            )}
        </div>
    )
}

export default InventarioPanel;