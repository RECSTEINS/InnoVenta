import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Inicio.css'; // Puedes cambiarlo por el CSS que prefieras

function ResenasAdmin() {
  const [resenas, setResenas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    rol: '',
    restaurante: '',
    calificacion: 5,
    foto_url: ''
  });
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchResenas();
  }, []);

  const fetchResenas = () => {
    axios.get('http://localhost:7777/getResenas')
      .then(response => setResenas(response.data))
      .catch(error => console.error('Error al obtener las reseñas:', error));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (editId) {
      // Editar reseña existente
      axios.put(`http://localhost:7777/updateResena/${editId}`, form)
        .then(res => {
          setShowModal(false);
          setForm({ nombre: '', rol: '', restaurante: '', calificacion: 5, foto_url: '' });
          setEditId(null);
          fetchResenas();
        })
        .catch(err => {
          setError('Error al actualizar la reseña. Verifica los datos.');
        });
    } else {
      // Crear nueva reseña
      axios.post('http://localhost:7777/postResena', form)
        .then(res => {
          setShowModal(false);
          setForm({ nombre: '', rol: '', restaurante: '', calificacion: 5, foto_url: '' });
          fetchResenas();
        })
        .catch(err => {
          setError('Error al crear la reseña. Verifica los datos.');
        });
    }
  };

  const handleEdit = (resena) => {
    setForm({
      nombre: resena.nombre,
      rol: resena.rol,
      restaurante: resena.restaurante,
      calificacion: resena.calificacion,
      foto_url: resena.foto_url
    });
    setEditId(resena.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
      axios.delete(`http://localhost:7777/deleteResena/${id}`)
        .then(res => {
          fetchResenas();
        })
        .catch(err => {
          alert('Error al eliminar la reseña.');
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Reseñas de Usuarios</h2>
      <button className="btn btn-primary mb-3 fw-bold" onClick={() => { setShowModal(true); setEditId(null); setForm({ nombre: '', rol: '', restaurante: '', calificacion: 5, foto_url: '' }); }}>
        Agregar reseña
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '650px' }}>
            <div className="modal-content shadow-lg border-0 rounded-4">
              <div className="modal-header bg-primary text-white rounded-top-4">
                <h5 className="modal-title fw-bold">{editId ? 'Editar reseña' : 'Agregar nueva reseña'}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit} className="needs-validation p-2" noValidate>
                <div className="modal-body">
                  <p className="text-secondary mb-3 fw-bold">Llena los siguientes campos para {editId ? 'editar' : 'agregar'} una reseña de usuario.</p>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input type="text" className="form-control rounded-3 fw-bold" name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Nombre (Ej: Paola Reyes)" />
                    </div>
                    <div className="col-md-6">
                      <input type="text" className="form-control rounded-3 fw-bold" name="rol" value={form.rol} onChange={handleChange} required placeholder="Rol (Ej: Dueña y administradora)" />
                    </div>
                    <div className="col-md-6">
                      <input type="text" className="form-control rounded-3 fw-bold" name="restaurante" value={form.restaurante} onChange={handleChange} required placeholder="Restaurante (Ej: Rosa Negra)" />
                    </div>
                    <div className="col-md-6">
                      <select className="form-select rounded-3 fw-bold" name="calificacion" value={form.calificacion} onChange={handleChange} required>
                        <option value="">Calificación</option>
                        {[5,4,3,2,1].map(val => <option key={val} value={val}>{val} estrella{val > 1 ? 's' : ''}</option>)}
                      </select>
                    </div>
                    <div className="col-12">
                      <input type="text" className="form-control rounded-3 fw-bold" name="foto_url" value={form.foto_url} onChange={handleChange} required placeholder="Foto (URL pública o de Drive)" />
                      <div className="form-text fw-bold">Puedes usar un enlace de Google Drive o cualquier imagen pública.</div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-between bg-light rounded-bottom-4">
                  <button type="button" className="btn btn-outline-secondary px-4 fw-bold" onClick={() => setShowModal(false)}>Cancelar</button>
                  <button type="submit" className="btn btn-primary px-4 fw-bold">{editId ? 'Actualizar' : 'Guardar'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Restaurante</th>
            <th>Calificación</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resenas.map((resena) => (
            <tr key={resena.id}>
              <td>{resena.nombre}</td>
              <td>{resena.rol}</td>
              <td>{resena.restaurante}</td>
              <td>
                {'★'.repeat(resena.calificacion)}
                {'☆'.repeat(5 - resena.calificacion)}
              </td>
              <td>
                <img
                  src={
                    resena.foto_url
                      ? (resena.foto_url.includes('drive.google.com')
                        ? `https://drive.google.com/uc?export=view&id=${resena.foto_url.match(/\/d\/([a-zA-Z0-9_-]+)/)[1]}`
                        : resena.foto_url)
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(resena.nombre)}`
                  }
                  alt={resena.nombre}
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                />
              </td>
              <td>
                <button className="btn btn-warning btn-sm me-2 fw-bold" onClick={() => handleEdit(resena)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm fw-bold" onClick={() => handleDelete(resena.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResenasAdmin; 