import './css_reports/reporte.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab } from "react-bootstrap";
import ReporteVentas from './ReportesVentas';
import ProductosYPlatillos from './PlatillosGraficas';

function ReportePanel(){
  return (
    <div className="container mt-4 prueba-reportes">
        <h2 className="mb-4">Panel de Reportes</h2>
        <Tabs defaultActiveKey="reportes" id="tab-reportes" className="mb-3">
            {/* Pestaña 1: Reporte principal */}
            <Tab eventKey="reportes" title="Reportes">
                <ReporteVentas/>
            </Tab>

            {/* Pestaña 2: Productos y platillos */}
            <Tab eventKey="productos" title="Productos y Platillos">
                    <ProductosYPlatillos />
                </Tab>

            {/* Pestaña 3: Otra sección (puedes agregar más contenido aquí) */}
            <Tab eventKey="otros" title="Otros Reportes">
                <div>
                    <h3>Información Adicional</h3>
                    <p>Contenido sobre otros reportes o estadísticas.</p>
                </div>
            </Tab>
        </Tabs>
    </div>
);
  
}

export default ReportePanel;