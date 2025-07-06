import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css_Inventario/Inventario.css';
import ClientAxios from '../../../../Config/axios';
import EditarProducto from './EditarProducto';
import AgregarProducto from './AgregarProducto';
import Chart from 'chart.js/auto';

function InventarioPanel() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [mostrarAddProducto, setMostrarAddProducto] = useState(false);
    const [mostrarEditarProducto, setMostrarEditarProducto] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    
    // Referencias para los gráficos
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const chartRef2 = useRef(null);
    const chartInstance2 = useRef(null);

    const URL = 'http://localhost:7777/getInventario';

    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
    };

    // Función para crear gráfico de distribución de stock
    const createStockChart = () => {
        if (chartRef.current && chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (products.length > 0) {
            // Categorizar productos por nivel de stock
            const stockBajo = products.filter(p => p.producto_stock <= p.producto_minimo_stock).length;
            const stockMedio = products.filter(p => p.producto_stock > p.producto_minimo_stock && p.producto_stock <= p.producto_minimo_stock * 2).length;
            const stockAlto = products.filter(p => p.producto_stock > p.producto_minimo_stock * 2).length;

            const ctx = chartRef.current.getContext("2d");
            chartInstance.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Stock Bajo', 'Stock Medio', 'Stock Alto'],
                    datasets: [{
                        label: 'Distribución de Stock',
                        data: [stockBajo, stockMedio, stockAlto],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(255, 205, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 205, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 2,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14,
                                    family: 'Arial'
                                },
                                color: '#343a40',
                                padding: 20
                            }
                        },
                        title: {
                            display: true,
                            text: 'Distribución de Stock por Nivel',
                            font: {
                                size: 18,
                                weight: 'bold'
                            },
                            color: '#343a40'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return `${label}: ${value} productos (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }
    };

    // Función para crear gráfico de productos con bajo stock
    const createLowStockChart = () => {
        if (chartRef2.current && chartInstance2.current) {
            chartInstance2.current.destroy();
        }

        if (products.length > 0) {
            const productosBajoStock = products.filter(p => p.producto_stock <= p.producto_minimo_stock);
            
            if (productosBajoStock.length > 0) {
                const ctx = chartRef2.current.getContext("2d");
                chartInstance2.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: productosBajoStock.map(p => p.producto_nombre),
                        datasets: [{
                            label: 'Stock Actual vs Mínimo',
                            data: productosBajoStock.map(p => p.producto_stock),
                            backgroundColor: 'rgba(255, 99, 132, 0.8)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2,
                            borderRadius: 5,
                            borderSkipped: false
                        }, {
                            label: 'Stock Mínimo',
                            data: productosBajoStock.map(p => p.producto_minimo_stock),
                            backgroundColor: 'rgba(255, 205, 86, 0.8)',
                            borderColor: 'rgba(255, 205, 86, 1)',
                            borderWidth: 2,
                            borderRadius: 5,
                            borderSkipped: false
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    font: {
                                        size: 14,
                                        family: 'Arial'
                                    },
                                    color: '#343a40'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Productos con Bajo Stock',
                                font: {
                                    size: 18,
                                    weight: 'bold'
                                },
                                color: '#343a40'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.1)'
                                },
                                ticks: {
                                    stepSize: 1
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
            }
        }
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

    useEffect(() => {
        if (products.length > 0) {
            createStockChart();
            createLowStockChart();
        }
        
        // Cleanup function para destruir los gráficos cuando el componente se desmonte
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            if (chartInstance2.current) {
                chartInstance2.current.destroy();
            }
        };
    }, [products]);

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

                    {/* Sección de gráficos */}
                    <div className="charts-section">
                        <h3 className="charts-title">
                            Estadísticas del Inventario
                        </h3>
                        
                        <div className="charts-grid">
                            {/* Gráfico de distribución de stock */}
                            <div className="chart-container">
                                <canvas ref={chartRef} className="chart-canvas"></canvas>
                            </div>
                            
                            {/* Gráfico de productos con bajo stock */}
                            <div className="chart-container">
                                <canvas ref={chartRef2} className="chart-canvas"></canvas>
                            </div>
                        </div>
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
