import './css_reports/reporte.css';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'chart.js/auto';
import PlatillosMasVendidos from './PlatillosGraficas';

function ReporteVentas(){

    const [reportes, setReportes] = useState([]);
    const [totales, setTotales] = useState({
      subtotal: "0.00",
      descuentos: "0.00",
      igv: "0.00",
      importeTotal: "0.00",
    });
    const [filtros, setFiltros] = useState({
      fechaDesde: '',
      fechaHasta: '',
      cliente: '',
      estado: '',
    });
    const [cargando, setCargando] = useState(false);
  
    const chartRefEstados = useRef(null);
    const chartRefMeses = useRef(null);
    const chartInstanceEstados = useRef(null);
    const chartInstanceMeses = useRef(null);
  
    const calcularTotales = (data) => {
      const subtotal = data.reduce((acc, reporte) => acc + parseFloat(reporte.total), 0);
      const igv = subtotal * 0.18;
      const importeTotal = subtotal + igv;
      return {
        subtotal: subtotal.toFixed(2),
        descuentos: "0.00", 
        igv: igv.toFixed(2),
        importeTotal: importeTotal.toFixed(2),
      };
    };
  
    const obtenerReportes = async () => {
      setCargando(true);
      try {
        const response = await axios.post('http://localhost:7777/get-reportes', filtros);
        setReportes(response.data);
        setTotales(calcularTotales(response.data));
        actualizarGraficas(response.data);
      } catch (error) {
        console.error('Error al obtener reportes:', error);
      } finally {
        setCargando(false);
      }
    };
  
    const actualizarGraficas = (data) => {
      if (chartInstanceEstados.current) chartInstanceEstados.current.destroy();
      if (chartInstanceMeses.current) chartInstanceMeses.current.destroy();
  

      const estados = ["PAGADO", "POR PAGAR", "CANCELADO", "REEMBOLSO"];
      const ventasPorEstado = estados.map((estado) =>
        data.filter((r) => r.venta_estado === estado).length
      );
  
      const ctxEstados = chartRefEstados.current.getContext("2d");
      chartInstanceEstados.current = new Chart(ctxEstados, {
        type: "pie",
        data: {
          labels: estados,
          datasets: [
            {
              data: ventasPorEstado,
              backgroundColor: ["#28a745", "#ffc107", "#dc3545", "#17a2b8"],
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Distribución de Ventas por Estado",
            },
          },
        },
      });
  
      // Totales por mes
      const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
      ];
      const ventasPorMes = Array(12).fill(0);
      data.forEach((r) => {
        const mes = new Date(r.venta_fecha_creacion).getMonth();
        ventasPorMes[mes] += parseFloat(r.total);
      });
  
      const ctxMeses = chartRefMeses.current.getContext("2d");
      chartInstanceMeses.current = new Chart(ctxMeses, {
        type: "bar",
        data: {
          labels: meses,
          datasets: [
            {
              label: "Total Ventas ($)",
              data: ventasPorMes,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Totales de Ventas por Mes",
            },
          },
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };
  
    const exportarExcel = () => {
      const ws = XLSX.utils.json_to_sheet(reportes);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Reportes');
      XLSX.writeFile(wb, 'reportes.xlsx');
    };
  
    

    const exportarPDF = async () => {
        const doc = new jsPDF();
        const marginX = 10;
        const marginY = 10;
        let currentY = marginY;
      
    
        doc.setFontSize(16);
        doc.text('Reporte de Ventas', marginX, currentY);
        currentY += 10;
      
      
        const canvasEstados = chartRefEstados.current;
        if (canvasEstados) {
          const imgDataEstados = canvasEstados.toDataURL('image/png');
          doc.addImage(imgDataEstados, 'PNG', marginX, currentY, 90, 70); 
          currentY += 80;
        }
      

        const canvasMeses = chartRefMeses.current;
        if (canvasMeses) {
          const imgDataMeses = canvasMeses.toDataURL('image/png');
          doc.addImage(imgDataMeses, 'PNG', marginX, currentY, 90, 70);
          currentY += 80;
        }
 
        currentY += 10;
      

        doc.autoTable({
          startY: currentY,
          head: [['N° Doc', 'Cliente', 'Fecha', 'Estado', 'Total']],
          body: reportes.map((r) => [
            r.pk_venta,
            r.pedido_cliente,
            new Date(r.venta_fecha_creacion).toLocaleDateString(),
            r.venta_estado,
            `$${parseFloat(r.total).toFixed(2)}`,
          ]),
          theme: 'striped',
        });
      
        doc.save('reportes.pdf');
      };


    return (
            <div className="container mt-4 p-3 shadow-sm bg-white rounded container-reportes">
            
            <div className="row mb-3">
              <div className="col-md-3">
                <label className='label-reporte'>Sucursal:</label>
                <select className="form-control">
                  <option>TIENDA PRINCIPAL</option>
                </select>
              </div>
              
              <div className="col-md-3">
                <label className='label-reporte' >Cliente:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar cliente"
                    onChange={(e) =>
                    setFiltros({ ...filtros, cliente: e.target.value })
                  }
                  />
              </div>
      
              <div className="col-md-2">
                <label className='label-reporte'>F. Desde:</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) =>
                  setFiltros({ ...filtros, fechaDesde: e.target.value })
                  }
                />
              </div>
      
              <div className="col-md-2">
                <label className='label-reporte'>F. Hasta:</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) =>
                  setFiltros({ ...filtros, fechaHasta: e.target.value })
                  }
                />
              </div>
      
              <div className="col-md-2">
                <label className='label-reporte'>Estado:</label>
                <select
                  className="form-control"
                  onChange={(e) =>
                  setFiltros({ ...filtros, estado: e.target.value })
                }
                >
                    <option value="">Todos</option>
                  <option value="PAGADO">Pagado</option>
                  <option value="POR PAGAR">Por pagar</option>
                  <option value="CANCELADO">Cancelado</option>
                  <option value="REEMBOLSO">Reembolso</option>
                </select>
              </div>
            </div>

          
            <div className="text-right mb-3">
              <button className="btn btn-success-reporte" onClick={obtenerReportes}>
                Consultar
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-striped table-hover table-reporte">
                <thead className="thead-light">
                  <tr>
                    <th>N° Doc</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                {reportes.length > 0 ? (
                  reportes.map((reporte) => (
                  <tr key={reporte.pk_venta}>
                    <td>{reporte.pk_venta}</td>
                    <td>{reporte.pedido_cliente}</td>
                    <td>{new Date(reporte.venta_fecha_creacion).toLocaleDateString()}</td>
                    <td>{reporte.venta_estado}</td>
                    <td>${parseFloat(reporte.total).toFixed(2)}</td>
                  </tr>
                  ))
                  ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No hay datos disponibles
                    </td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>

    
            <div className="row mt-4">
                <div className="col-md-6 text-right">
                    <p>
                        <strong>Subtotal:</strong> {totales.subtotal}
                    </p>
                    <p>
                        <strong>Descuentos:</strong> {totales.descuentos}
                    </p>
                    <p>
                        <strong>IGV (18%):</strong> {totales.igv}
                    </p>
                    <p>
                        <strong>Importe Total:</strong> {totales.importeTotal}
                    </p>
                </div>
            </div>

            <div className="text-right mt-3 btn-exportar">
              <button className="btn btn-success-reporte-2 mr-2" onClick={exportarExcel}>
                Exportar en Excel
              </button>
              <button className="btn btn-danger" onClick={exportarPDF}>
                Exportar en PDF
              </button>
            </div>
            <div className="row mt-5">
        <div className="col-md-6">
          <canvas ref={chartRefEstados}></canvas>
        </div>
        <div className="col-md-6">
          <canvas ref={chartRefMeses}></canvas>
        </div>
      </div>
          </div>
    )
}

export default ReporteVentas;