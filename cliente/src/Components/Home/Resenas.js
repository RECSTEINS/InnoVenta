import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Resenas.css';

function Resenas() {
  const [resenas, setResenas] = useState([]);
  const [videosVistos, setVideosVistos] = useState({});

  useEffect(() => {
    axios.get('http://localhost:7777/getResenas')
      .then(response => {
        setResenas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las reseñas:', error);
      });
  }, []);

  const handleVideoEnd = (idx) => {
    setVideosVistos(prev => ({ ...prev, [idx]: true }));
  };

  return (
    <div className="fondo-resenas" id='resenas'>
      <h2 className="section-title-resenas">Lea las reseñas que han dejado los usuarios del sistema InnoVenta</h2>
      <div className="row resenas">
        {resenas.map((resena, idx) => (
          <div key={idx} className="col-md-4 col-12 card-resena-completa">
            <div className="review-card" style={{ padding: '2rem 1.5rem', minHeight: '430px', marginBottom: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
              <div className="ajustes-card" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {resena.foto_url ? (
                  <div style={{ position: 'relative', width: '100%' }}>
                    {idx === 0 ? (
                      <video
                        src={resena.foto_url}
                        controls
                        className="img-fluid rounded-4 mb-2"
                        style={{ width: "100%", height: "250px", objectFit: "cover" }}
                        onEnded={() => handleVideoEnd(idx)}
                        onMouseOver={e => e.target.play()}
                        onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; setVideosVistos(prev => ({ ...prev, [idx]: false })); }}
                        muted
                        preload="none"
                      >
                        Tu navegador no soporta la reproducción de video.
                      </video>
                    ) : (
                      <video
                        src={resena.foto_url}
                        controls
                        className="img-fluid rounded-4 mb-2"
                        style={{ width: "100%", height: "250px", objectFit: "cover" }}
                        onEnded={() => handleVideoEnd(idx)}
                        muted
                        preload="none"
                        poster=""
                      >
                        Tu navegador no soporta la reproducción de video.
                      </video>
                    )}
                    {videosVistos[idx] && (
                      <div style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: 'rgba(40,167,69,0.9)',
                        color: 'white',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 28,
                        zIndex: 2
                      }}>
                        ✔️
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="img-fluid rounded-4 mb-2 bg-secondary d-flex align-items-center justify-content-center"
                    style={{ width: "100%", height: "250px", objectFit: "cover", color: "#fff" }}
                  >
                    Sin video
                  </div>
                )}
                <p className="name-card" style={{ fontSize: '1.35rem', fontWeight: 'bold', marginTop: '1rem' }}>{resena.nombre}</p>
                <div className="stars" style={{ fontSize: '1.3rem', margin: '0.5rem 0' }}>
                  {'★'.repeat(resena.calificacion)}
                  {'☆'.repeat(5 - resena.calificacion)}
                </div>
                <p className="text-card-reseña" style={{ fontSize: '1.1rem', textAlign: 'center', margin: '0.5rem 0 0.5rem 0' }}>{resena.rol} del restaurante {resena.restaurante}</p>
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