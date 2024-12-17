import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css_Inventario/Inventario.css';
import ClientAxios from '../../../../Config/axios';
import EditarProducto from './EditarProducto';
import AgregarProducto from './AgregarProducto';
import { data } from 'react-router-dom';

function InventarioPanel() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [mostrarAddProducto, setMostrarAddProducto] = useState(false);
    const [mostrarEditarProducto, setMostrarEditarProducto] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const URL = 'http://localhost:7777/getInventario';

    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
    };

    const fetchProductoById = async (id) => {
        try {
            const response = await fetch(`http://localhost:7777/get-producto-id/${id}`);
            const data = await response.json();
            if (data.length > 0) {
                setProductoSeleccionado(data[0]);
                setMostrarEditarProducto(true);
            } else {
                Swal.fire('Error', 'No se encontró el producto.', 'error');
            }
        } catch (error) {
            console.error('Error al obtener producto:', error);
            Swal.fire('Error', 'No se pudo cargar el producto. Inténtalo nuevamente.', 'error');
        }
    };

    const deleteProduct = async (id) => {
        try {
            await ClientAxios.delete(`/eliminar-producto/${id}`);
            setProducts((prevProducts) => prevProducts.filter((row) => row.pk_productos !== id));
            Swal.fire('Éxito', 'El producto se eliminó correctamente.', 'success');
            showData();
        } catch (error) {
            console.error('Error al eliminar el producto: ', error);
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
        }
    };

    const mostrarAlerta = (id) => {
        Swal.fire({
            title: 'Advertencia',
            text: '¿Está seguro que desea eliminar este empleado?',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            cancelButtonColor: "Red",
            cancelButtonText: "Cancelar"
        }).then(response => {
            if (response.isConfirmed) {
                deleteProduct(id);
                Swal.fire('Éxito', 'El empleado se eliminó correctamente.', 'success');
            }
        });
    }

    const columns = [
        {
            name: 'ID',
            selector: (row) => row.pk_productos,
            sortable: true,
        },
        {
            name: 'Nombre del producto',
            selector: (row) => row.producto_nombre,
            sortable: true,
        },
        {
            name: 'Cantidad disponible',
            selector: (row) => row.producto_stock,
            sortable: true,
        },
        {
            name: 'Opciones',
            cell: (row) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className="edit-btn-button"
                        onClick={() => fetchProductoById(row.pk_productos)}
                    >
                        Editar
                    </button>
                    <button
                        className="delete-btn-button"
                        onClick={() => mostrarAlerta(row.pk_productos)}
                    >
                        Eliminar
                    </button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        showData();
    }, []);

    return (
        <div className="inventario-panel">
            {!mostrarAddProducto && !mostrarEditarProducto ? (
                <>
                    <div className="header-inventario">
                        <p className="titulo-dashboard-panel">Inventario de productos</p>
                        <button
                            className="add-btn-button"
                            onClick={() => setMostrarAddProducto(true)}
                        >
                            Agregar nuevo producto
                        </button>
                    </div>
                    <DataTable
                        columns={columns}
                        data={filteredProducts}
                        pagination
                        paginationPerPage={9}
                        highlightOnHover
                        responsive
                        conditionalRowStyles={[
                            {
                                when: (row) => row.producto_stock <= row.producto_minimo_stock,
                                style: {
                                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                    color: '#FFC700',
                                    fontWeight: 'bold',
                                },
                            },
                        ]}
                        customStyles={{
                            headRow: {
                                style: {
                                    borderTopLeftRadius: '20px',
                                    borderTopRightRadius: '20px',
                                    border: 'none',
                                },
                            },
                            table: {
                                style: {
                                    border: '1.5px #070C33 solid',
                                    height: '783px',
                                    borderRadius: '20px',
                                    backgroundColor: '#070C33',
                                },
                            },
                            headCells: {
                                style: {
                                    backgroundColor: '#FFFFF',
                                    color: '#00000',
                                    fontWeight: '700',
                                    fontFamily: 'Roboto',
                                    fontSize: '24px',
                                },
                            },
                            rows: {
                                style: {
                                    fontSize: '24px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto',
                                    paddingTop: '16px',
                                    paddingBottom: '16px',
                                },
                            },
                        }}
                    />
                </>
            ) : mostrarAddProducto ? (
                <div className='agregar-empleado-panel'>
                    <AgregarProducto onRegresar={() => setMostrarAddProducto(false)} />
                </div>
            ) : (
                <div className='editar-empleado-panel'>
                    <EditarProducto onRegresar={() => {
                        setProductoSeleccionado(null);
                        setMostrarEditarProducto(false);
                    }}
                        productoPk={productoSeleccionado}
                    />
                </div>
            )}
        </div>
    );
}

export default InventarioPanel;
