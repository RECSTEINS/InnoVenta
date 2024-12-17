import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import "./css_Platillos/Estilos-Platillos.css"

function FormularioAgregarPlatillo({ onRegresar }) {
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
    <form onSubmit={manejarEnvio} class="formulario-agregar-platillo">
      <div class="caja-informacion separacion-cajaI-cajaB-agregar-platillo">

        <div class="caja-titulo margen-vertical">
          <p class="titulo-nuevo-platillo">Datos del nuevo platillo</p>
        </div>



        <div class="caja-grandes-agregar-platillo margen-vertical">
          <div class="label-grande-agregar-platillo">
            <label class="estilo-label-agregar-platillo">Nombre del platillo:</label>
          </div>
          <input type="text" class="estilo-input-agregar-platillo input-grande-agregar-platillo " value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>

        <div class="caja-medianos-agregar-platillo margen-vertical-agregar-platillo">

          <div class="margen-horizontal-agregar-platillo">
            <div class="label-mediano-agregar-platillo margen-entre-medianas-agregar-platillo">
              <label class="estilo-label-agregar-platillo">Precio del platillo:</label>
            </div>
            <input class="label-mediano-agregar-platillo2" type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
          </div>

          <div class="cajita-select-agregar-platillo">

            <div class="label-mediano-agregar-platillo margen-entre-medianas-agregar-platillo">
              <label class="estilo-label-agregar-platillo">Disponible:</label>
            </div>

            <div class="contenedor-select-agregar-platillo">
              <select class="caja-select-agregar-platillo" value={disponible} onChange={(e) => setDisponible(e.target.value === 'true')}>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
              <div class="contenedor-icono-agregar-platillo">
                <i class="bi bi-caret-down-fill"></i>
              </div>
            </div>

          </div>

        </div>

        <div>
          <label>Imagen:</label>
          <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Suelta la imagen aquí...</p> : <p>Arrastra y suelta una imagen, o haz clic para seleccionar</p>}
          </div>
          {img && <img src={img} alt="Vista previa" style={{ width: '200px', marginTop: '10px' }} />}
        </div>

        <div class="caja-medianos-agregar-platillo margen-vertical-agregar-platillo">

          <div class="cajita-select-agregar-platillo margen-horizontal-agregar-platillo">

            <div class="label-mediano-agregar-platillo margen-entre-medianas-agregar-platillo">
              <label class="estilo-label-agregar-platillo">Categoría:</label>
            </div>

            <div class="contenedor-select">
              <select class="caja-select-agregar-platillo" value={fkCategoria} onChange={(e) => setFkCategoria(e.target.value)} required>
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
            <div class="label-mediano margen-entre-medianas-agregar-platillo">
              <label class="estilo-label-agregar-platillo">Restaurante:</label>
            </div>
            <input type="text" class="estilo-input input-mediano input-texto-agregar-platillo" value={fkRestaurante} onChange={(e) => setFkRestaurante(e.target.value)} required />
          </div>

        </div>
        <div>
          <div class="caja-titulo-agregar-platillo margen-vertical-agregar-platillo">
            <p class="agregar-platillo-ingredientes2">Ingredientes</p>
          </div>
          <div className='caja-productos-agregar-platillo'>
            {productos.map((producto, index) => (
              <div key={index} class="caja-medianos-agregar-platillo margen-vertical-agregar-platillo">
                <div class="cajita-select-agregar-platillo margen-horizontal-agregar-platillo">
                  <div class="label-mediano-agregar-platillo margen-entre-medianas-agregar-platillo">
                    <label class="estilo-label-agregar-platillo-2">Producto:</label>
                  </div>
                  <div class="contenedor-select-agregar-platillo">
                    <select
                      class="caja-select-agregar-platillo"
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
                    <div class="contenedor-icono-agregar-platillo">
                      <i class="bi bi-caret-down-fill"></i>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="estilo-label-agregar-platillo-2">
                    <label>Cantidad:</label>
                  </div>
                  <input
                    type="number"
                    class="input-cantidad-platillo"
                    value={producto.cantidad}
                    onChange={(e) => actualizarProducto(index, 'cantidad', e.target.value)}
                    required
                  />
                </div>

                <div class="caja-boton-eliminar-agregar-platillo">
                  <button type="button" class="eliminar-platillo" onClick={() => eliminarProducto(index)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>

          <div class="caja-boton-agregar-platillo">
            <button type="button" class="boton-ingresar-agregar-platillo" onClick={agregarProducto}>Agregar Producto</button>
          </div>

        </div>

        <div class="caja-botones-agregar-platillo">
          <div class="caja-boton separacion-botones-agregar-platillo">
            <button type="submit" value="Regresar" class="boton-regresar" onClick={onRegresar}>Regresar</button>
          </div>
          <div class="caja-boton-agregar-platillo">
            <button type="submit" class="boton-ingresar">Ingresar <i class="bi bi-arrow-right estilo-icono"></i></button>
          </div>
        </div>

      </div>




    </form>
  );
}

export default FormularioAgregarPlatillo;