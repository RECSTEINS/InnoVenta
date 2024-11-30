import DataTable from 'react-data-table-component';
import './css_Inventario/Inventario.css';
import React, { useEffect, useState } from 'react';
import ClientAxios from '../../../../Config/axios';
import Swal from 'sweetalert2';

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

    const deleteProduct = async (id) =>{
        try {
            await ClientAxios.delete(`/eliminar-producto/${id}`);
            const updateProducts = products.filter(row => row.pk_productos !== id);
            setProducts(updateProducts);
            setFilteredProducts(updateProducts);
        } catch(error){
            console.error("Error al eliminar el producto: ", error);
            alert("Error al eliminar el producto")
        }
    };

    const mostrarAlerta = (id) =>{
        Swal.fire({
            title: 'Advertencia',
            text: '¿Está seguro que desea eliminar este producto?',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            cancelButtonColor: "Red",
            cancelButtonText: "Cancelar" 
        }).then(response => {
            if(response.isConfirmed){
                deleteProduct(id);
                Swal.fire('Éxito', 'El producto se eliminó correctamente.', 'success');
            }
        });
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.pk_productos,
            sortable: true,
            width: '60px',
        },
        {
            name:'Nombre del producto',
            selector: row => row.producto_nombre,
            sortable: true,
            grow: 2,
            center: true,
            width: '291px'
        },
        {
            name: 'Cantidad disponible',
            selector: row => row.producto_stock,
            sortable: true,
            center: true,
            width: '156px'
        },
        {
            name: 'Stock mínimo',
            selector: row => row.producto_minimo_stock,
            center: true,
            width: '107px'
        },
        {
            name: 'Opciones',
            cell: row => (
                <div style={{ display:'flex', gap:'10px'}}>
                    <button
                        className='edit-btn-button'
                        onClick={""}
                    >
                        Editar
                    </button>
                    <button
                        className='delete-btn-button'
                        onClick={() => mostrarAlerta(row.pk_productos)}
                    >
                        Eliminar
                    </button>
                </div>
            ),
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            width: '260px'
            //button: true,
        },
    ]

    useEffect(() => {
        showData();
    }, [products]);

    return(
        <div className='inventario-panel'>
            {!mostrarAddProducto ? (
                <>
                    <div className='header-inventario'>
                        <h2 className='titulo-dashboard-panel'>Inventario de productos</h2>
                        <button
                            className='add-btn-button'
                            onClick={() => setMostrarAddProducto(true)}
                        >
                            Agregar producto
                        </button>
                    </div>
                    <DataTable
                        columns={columns}
                        data={filteredProducts}
                        pagination
                        highlightOnHover
                        responsive
                        conditionalRowStyles={[
                            {
                                when: row => row.producto_stock <= row.producto_minimo_stock,
                                style:{
                                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                    color: '#FF0000',
                                    fontWeight: 'bold'
                                },
                            },
                        ]}
                        customStyles={{
                            headRow: { style: {borderTopLeftRadius:'20px', borderTopRightRadius:'20px', border: 'none'}},
                            table: { style:{ border:'1.5px #070C33 solid', height: '450px', borderRadius: '20px', backgroundColor: '#070C33'}},
                            headCells: {style:{ backgroundColor:'#FFFFF', color:'#00000', fontWeight: '700', fontFamily:'Roboto', fontSize: '12px'}},  
                        }}
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