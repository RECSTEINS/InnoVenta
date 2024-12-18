import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Swal from 'sweetalert2';
//import "./css_Platillos/Estilos-Platillos.css"

function FormularioAgregarPlatillo({ onRegresar }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [img, setImg] = useState('');
  const [fkCategoria, setFkCategoria] = useState('');
  const [fkRestaurante, setFkRestaurante] = useState('');
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:7777/getCategorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    const fetchRestaurantes = async () => {
      const response = await axios.get('http://localhost:7777/getRestaurantes');
      setRestaurantes(response.data)
    }

    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:7777/get-productos-nombre');
        setProductosDisponibles(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchCategorias();
    fetchProductos();
    fetchRestaurantes();
  }, []);

  const agregarProducto = () => {
    setProductos([...productos, { id: '', cantidad: 1 }]);
  };

  const actualizarProducto = (index, campo, valor) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index][campo] = valor;
    setProductos(nuevosProductos);
  };

  const eliminarProducto = (index) => {
    setProductos(productos.filter((_, i) => i !== index));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!fkRestaurante) {
      alert("Por favor, selecciona un restaurante.");
      return;
    }

    try {
      const datosPlatillo = {
        nombre,
        precio,
        disponible,
        img,
        fkcategoria: fkCategoria,
        fkrestaurante: fkRestaurante,
        productos: productos.map((producto) => ({
          id: producto.id,
          cantidad: producto.cantidad,
        })),
      };

      console.log("Datos enviados:", datosPlatillo);

      const respuesta = await axios.post('http://localhost:7777/agregar-platillo', datosPlatillo);
      Swal.fire("Éxito", respuesta.data.message, 'success');
      onRegresar();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      Swal.fire('Error','Ocurrió un error al agregar el platillo.', 'error');
    }
  };

  const manejarDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("http://localhost:7777/upload-image", formData)
      .then((response) => {
        setImg(response.data.url);
      })
      .catch((error) => {
        console.error("Error al subir la imagen:", error);
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: manejarDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <form onSubmit={manejarEnvio} class="formulario-platillo">
      <div>
        <div class="form-platillo-titulo">
          <p>Datos del nuevo platillo</p>
        </div>
        <div class="form-nombre-platillo">
          <div class="form-nombre-platillo-label">
            <label>Nombre del platillo:</label>
          </div>
          <input type="text" class="form-nombre-platillo-input" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div class="form-precio-disponible-platillo">
          <div>
            <div>
              <label class="form-platillo-label">Precio del platillo:</label>
            </div>
            <input class="form-precio-platillo-input" type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
          </div>
          <div>
            <div>
              <label class="form-platillo-label">Disponible:</label>
            </div>
            <div class="contenedor-select">
              <select class="form-select-platillo" value={disponible} onChange={(e) => setDisponible(e.target.value === 'true')}>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
              <div class="contenedor-icono">
                <i class="bi bi-caret-down-fill"></i>
              </div>
            </div>
          </div>
        </div>
        <div className='form-platillo-imagen'>
          <label className='form-platillo-label'>Imagen:</label>
          <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Suelta la imagen aquí...</p> : <p>Arrastra y suelta una imagen, o haz clic para seleccionar</p>}
          </div>
          {img && <img src={img} alt="Vista previa" style={{ width: '200px', marginTop: '10px' }} />}
        </div>
        <div class="form-categoria-restaurante-platillo">
          <div>
            <div>
              <label class="form-platillo-label">Categoría:</label>
            </div>
            <div class="contenedor-select">
              <select class="form-select-platillo" value={fkCategoria} onChange={(e) => setFkCategoria(e.target.value)} required>
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.pk_categoria} value={categoria.pk_categoria}>
                    {categoria.categoria_nombre}
                  </option>
                ))}
              </select>
              <div class="contenedor-icono">
                <i class="bi bi-caret-down-fill"></i>
              </div>
            </div>
          </div>
          <div>
            <div>
              <label className="form-platillo-label">Restaurante:</label>
            </div>
            <div className="contenedor-select">
              <select
                className="form-select-platillo"
                value={fkRestaurante}
                onChange={(e) => setFkRestaurante(e.target.value)} // pk_restaurante
                required
              >
                <option value="">Selecciona un restaurante</option>
                {restaurantes.map((restaurante) => (
                  <option
                    key={restaurante.pk_restaurante}
                    value={restaurante.pk_restaurante} // pk_restaurante como valor
                  >
                    {restaurante.restaunrate_nombre} {/* Nombre visible */}
                  </option>
                ))}
              </select>
              <div className="contenedor-icono">
                <i className="bi bi-caret-down-fill"></i>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="form-platillo-subtitulo">
            <p>Ingredientes</p>
          </div>
          <div className='subform-productos-platillo'>
            {productos.map((producto, index) => (
              <div key={index} class="subform-productos-platillo-opcion">
                <div>
                  <div class="form-nombre-platillo-label">
                    <label>Producto:</label>
                  </div>
                  <div class="contenedor-select">
                    <select
                      class="form-select-platillo"
                      value={producto.id}
                      onChange={(e) => actualizarProducto(index, 'id', e.target.value)}
                      required
                    >
                      <option value="">Selecciona un producto</option>
                      {productosDisponibles.map((prod) => (
                        <option key={prod.pk_productos} value={prod.pk_productos}>
                          {prod.producto_nombre}
                        </option>
                      ))}
                    </select>
                    <div class="contenedor-icono">
                      <i class="bi bi-caret-down-fill"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="form-nombre-platillo-label">
                    <label>Cantidad:</label>
                  </div>
                  <input
                    type="number"
                    class="subform-productos-platillo-input"
                    value={producto.cantidad}
                    onChange={(e) => actualizarProducto(index, 'cantidad', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <button type="button" class="subform-eliminar-producto" onClick={() => eliminarProducto(index)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <button type="button" class="subform-agregar-producto-platillo" onClick={agregarProducto}>Agregar Producto <i class="bi bi-plus subform-icon-platillo"></i></button>
          </div>
        </div>
        <div class="form-platillo-enviar-regresar">
          <div>
            <button type="submit" value="Regresar" class="boton-regresar" onClick={onRegresar}>Regresar</button>
          </div>
          <div>
            <button type="submit" class="boton-ingresar">Ingresar <i class="bi bi-arrow-right estilo-icono"></i></button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormularioAgregarPlatillo;