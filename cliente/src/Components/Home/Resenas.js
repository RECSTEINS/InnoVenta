import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Resenas.css';

function Resenas() {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7777/getResenas')
      .then(response => {
        setResenas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las reseñas:', error);
      });
  }, []);

  return (
    <div className="fondo-resenas" id='resenas'>
      <h2 className="section-title-resenas">Lea las reseñas que han dejado los usuarios del sistema InnoVenta</h2>
      <div className="row resenas">
        {resenas.map((resena, idx) => (
          <div key={idx} className="col-md-4 col-12 card-resena-completa">
            <div className="review-card">
              <div className="ajustes-card">
                <img
                  src={resena.foto_url ? resena.foto_url : "https://ui-avatars.com/api/?name=" + encodeURIComponent(resena.nombre)}
                  alt={`Foto de ${resena.nombre}`}
                  className="img-fluid rounded-circle mb-2"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <p className="name-card">{resena.nombre}</p>
                <div className="stars">
                  {'★'.repeat(resena.calificacion)}
                  {'☆'.repeat(5 - resena.calificacion)}
                </div>
                <p className="text-card-reseña">{resena.rol} del restaurante {resena.restaurante}</p>
              </div>
            </div>
            <div className="d-grid gap-2 btn-mas card-pie-resenas">
              <p className="color-btn">Más información</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resenas;