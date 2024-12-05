import React from "react";
import { Bar, Line, Pie, Radar, Doughnut, PolarArea, Bubble, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, LineElement, PointElement, ArcElement, CategoryScale, LinearScale, RadialLinearScale, Filler, BubbleController, ScatterController } from "chart.js";

// Registramos los componentes necesarios para los gráficos
ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, ArcElement, CategoryScale, LinearScale, RadialLinearScale, Filler, BubbleController, ScatterController);

function Graficas() {
    // Datos falsos para los gráficos
    const dataBar = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
        datasets: [
            {
                label: "Ventas del producto",
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const dataLine = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
        datasets: [
            {
                label: "Ventas del producto",
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
            },
        ],
    };

    const dataPie = {
        labels: ["Producto A", "Producto B", "Producto C"],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    const dataStackedBar = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
        datasets: [
            {
                label: "Producto A",
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
            {
                label: "Producto B",
                data: [45, 49, 70, 71, 46, 45],
                backgroundColor: "rgba(153, 102, 255, 0.5)",
            },
        ],
    };

    const dataPolar = {
        labels: ["Producto A", "Producto B", "Producto C"],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    const dataBubble = {
        datasets: [
            {
                label: "Ventas",
                data: [
                    { x: 20, y: 30, r: 10 },
                    { x: 30, y: 50, r: 15 },
                    { x: 40, y: 70, r: 20 },
                ],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const dataScatter = {
        datasets: [
            {
                label: "Ventas vs. Tiempo",
                data: [
                    { x: 10, y: 20 },
                    { x: 15, y: 25 },
                    { x: 20, y: 30 },
                ],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };

    const dataRadar = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
        datasets: [
            {
                label: "Ventas del producto",
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const dataDoughnut = {
        labels: ["Producto A", "Producto B", "Producto C"],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    // Opciones comunes para todos los gráficos
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Gráficos de Ventas",
            },
        },
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", margin: "20px" }}>
            <div style={{ width: "45%", marginBottom: "20px" }}>
                <h3>Gráfico de Barras</h3>
                <Bar data={dataBar} options={options} />
            </div>
            <div style={{ width: "45%", marginBottom: "20px" }}>
                <h3>Gráfico de Líneas</h3>
                <Line data={dataLine} options={options} />
            </div>
            <div style={{ width: "45%", marginBottom: "20px" }}>
                <h3>Gráfico Circular (Pie)</h3>
                <Pie data={dataPie} options={options} />
            </div>
            <div style={{ width: "45%", marginBottom: "20px" }}>
                <h3>Gráfico de Radar</h3>
                <Radar data={dataRadar} options={options} />
            </div>
            <div style={{ width: "45%", marginBottom: "20px" }}>
                <h3>Gráfico de Dona (Doughnut)</h3>
                <Doughnut data={dataDoughnut} options={options} />
            </div>
            <div style={{ width: "45%", marginBottom: "20px" }}>
                <h3>Gráfico de Barras Apiladas</h3>
                <Bar data={dataStackedBar} options={{ ...options, indexAxis: "x", scales: { x: { stacked: true }, y: { stacked: true } } }} />
            </div>
            <div style={{ width: "45%", marginBottom: "20px" }}>
                <h3>Gráfico Polar</h3>
                <PolarArea data={dataPolar} options={options} />
            </div>
            <div style={{ width: "45%", marginBottom: "20px" }}>
                <h3>Gráfico de Burbuja</h3>
                <Bubble data={dataBubble} options={options} />
            </div>
            <div style={{ width: "45%", marginBottom: "20px" }}>
                <h3>Gráfico de Dispersión (Scatter)</h3>
                <Scatter data={dataScatter} options={options} />
            </div>
        </div>
    );
}

export default Graficas;