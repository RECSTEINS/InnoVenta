import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de incluir Bootstrap

function ProductosYPlatillos() {
    const [productosBajoStock, setProductosBajoStock] = useState([]);
    const [platillosMasVendidos, setPlatillosMasVendidos] = useState([]);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productosResponse = await axios.get("http://localhost:7777/productos-bajo-stock");
                setProductosBajoStock(productosResponse.data);

                const platillosResponse = await axios.get("http://localhost:7777/platillos-mas-vendidos");
                setPlatillosMasVendidos(platillosResponse.data);
            } catch (error) {
                console.error("Error al cargar datos: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        if (platillosMasVendidos.length > 0) {
            const ctx = chartRef.current.getContext("2d");
            chartInstanceRef.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: platillosMasVendidos.map((p) => p.platillo_nombre),
                    datasets: [
                        {
                            label: "Cantidad Vendida",
                            data: platillosMasVendidos.map((p) => p.total_vendidos),
                            backgroundColor: [
                                "rgba(75, 192, 192, 0.6)",
                                "rgba(153, 102, 255, 0.6)",
                                "rgba(255, 159, 64, 0.6)",
                                "rgba(54, 162, 235, 0.6)",
                            ],
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                            labels: {
                                font: {
                                    size: 14,
                                    family: "Arial",
                                },
                                color: "#343a40",
                            },
                        },
                        title: {
                            display: true,
                            text: "Platillos Más Vendidos",
                            font: {
                                size: 18,
                                weight: "bold",
                            },
                        },
                    },
                },
            });
        }
    }, [platillosMasVendidos]);

    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-4">
                <h2 className="text-center mb-4 text-primary">Reporte de Productos y Platillos</h2>

                <div className="mb-5">
                    <h3 className="text-secondary">Productos con Bajo Stock</h3>
                    <table className="table table-hover table-bordered mt-3">
                        <thead className="thead-dark">
                            <tr>
                                <th>Producto</th>
                                <th>Stock Actual</th>
                                <th>Stock Mínimo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosBajoStock.length > 0 ? (
                                productosBajoStock.map((producto) => (
                                    <tr key={producto.pk_productos}>
                                        <td>{producto.producto_nombre}</td>
                                        <td>{producto.producto_stock}</td>
                                        <td>{producto.producto_minimo_stock}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-muted">
                                        No hay productos con bajo stock.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3 className="text-secondary">Platillos Más Vendidos</h3>
                    <div className="chart-container mt-4" style={{ position: "relative", height: "60vh", width: "100%" }}>
                        <canvas id="chart-platillos" ref={chartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductosYPlatillos;