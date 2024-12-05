import DataTable from 'react-data-table-component';
import './css_Inventario/Inventario.css';
import React, { useEffect, useState } from 'react';
import ClientAxios from '../../../../Config/axios';
import Swal from 'sweetalert2';
import 'bootstrap-icons/font/bootstrap-icons.css'
import AgregarProducto from './AgregarProducto';

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
            width:'90px',
        },
        {
            name:'Nombre del producto',
            selector: row => row.producto_nombre,
            sortable: true,
            grow: 2,
            center: true,
            width:'400px',
            cell: row => (
                <>
                    {row.producto_nombre}{' '}
                    {row.producto_stock <= row.producto_minimo_stock && (
                        <div className='stock-bajo-row'>
                            <i
                            className="bi bi-exclamation-octagon"
                            style={{
                                color: '#FFC700',
                                marginLeft: '8px',
                                fontSize: '18px',
                            }}
                            title="Stock bajo"
                            ></i>
                        </div>
                    )}
                </>
            ),
        },
        {
            name: 'Cantidad disponible',
            selector: row => row.producto_stock,
            sortable: true,
            center: true,
            width:'275px',
        },
        {
            name: 'Stock mínimo',
            selector: row => row.producto_minimo_stock,
            center: true,
            width: '181px',
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
                        <p className='titulo-dashboard-panel'>Inventario de productos</p>
                        <button
                            className='add-btn-button'
                            onClick={() => setMostrarAddProducto(true)}
                        >
                            Agregar nuevo producto
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
                                    color: '#FFC700',
                                    fontWeight: 'bold'
                                },
                            },
                        ]}
                        customStyles={{
                            headRow: { style: {borderTopLeftRadius:'20px', borderTopRightRadius:'20px', border: 'none'}},
                            table: { style:{ border:'1.5px #070C33 solid', height: '800px', borderRadius: '20px', backgroundColor: '#070C33'}},
                            headCells: {style:{ backgroundColor:'#FFFFF', color:'#00000', fontWeight: '700', fontFamily:'Roboto', fontSize: '24px'}},
                            rows:{style: {fontSize:'24px', fontWeight:'400', fontFamily: 'Roboto', paddingTop: '16px', paddingBottom:'16px'}}  
                        }}
                    />
                </>
            ): (
                <div className='agregar-producto-panel'>
                    <AgregarProducto onRegresar={() => setMostrarAddProducto(false)}/>
                </div>
            )}
        </div>
    )
}

export default InventarioPanel;