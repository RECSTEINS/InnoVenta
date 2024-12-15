import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function FormularioAgregarPlatillo() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [img, setImg] = useState('');
  const [fkCategoria, setFkCategoria] = useState('');
  const [fkRestaurante, setFkRestaurante] = useState('');
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
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
    try {
      const datosPlatillo = {
        nombre,
        precio,
        disponible,
        img,
        fkcategoria: fkCategoria,
        fkrestaurante: fkRestaurante,
        productos,
      };

      console.log("Datos enviados:", datosPlatillo);

      const respuesta = await axios.post('http://localhost:7777/agregar-platillo', datosPlatillo);
      alert(respuesta.data.message);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Ocurrió un error al agregar el platillo.');
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
    <form onSubmit={manejarEnvio}>
      <h2>Agregar Platillo</h2>

      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>

      <div>
        <label>Precio:</label>
        <input type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
      </div>

      <div>
        <label>Disponible:</label>
        <select value={disponible} onChange={(e) => setDisponible(e.target.value === 'true')}>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>

      <div>
        <label>Imagen:</label>
        <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', textAlign: 'center' }}>
          <input {...getInputProps()} />
          {isDragActive ? <p>Suelta la imagen aquí...</p> : <p>Arrastra y suelta una imagen, o haz clic para seleccionar</p>}
        </div>
        {img && <img src={img} alt="Vista previa" style={{ width: '200px', marginTop: '10px' }} />}
      </div>

      <div>
        <label>Categoría:</label>
        <select value={fkCategoria} onChange={(e) => setFkCategoria(e.target.value)} required>
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.pk_categoria} value={categoria.pk_categoria}>
              {categoria.categoria_nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Restaurante:</label>
        <input type="text" value={fkRestaurante} onChange={(e) => setFkRestaurante(e.target.value)} required />
      </div>

      <div>
        <h3>Productos del Platillo</h3>
        {productos.map((producto, index) => (
          <div key={index}>
            <label>Producto:</label>
            <select
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
            <label>Cantidad:</label>
            <input
              type="number"
              value={producto.cantidad}
              onChange={(e) => actualizarProducto(index, 'cantidad', e.target.value)}
              required
            />
            <button type="button" onClick={() => eliminarProducto(index)}>Eliminar</button>
          </div>
        ))}
        <button type="button" onClick={agregarProducto}>Agregar Producto</button>
      </div>

      <button type="submit">Agregar Platillo</button>
    </form>
  );
}

export default FormularioAgregarPlatillo;
