const express=require("express")
const router = express.Router()
const { login, usuarios_login } = require("../controllers/loginController")
const { getRoles, getRolesId, updateRoles, postRoles, delRoles } = require("../controllers/rolesController");
const { getUsuarios, getUsuarioId, updateUsuario, postUsuario, delUsuario} = require("../controllers/usuarioController");
const { getEmpleados, getEmpleadoId, updateEmpleado, postEmpleado, delEmpleado, agregarEmpleado} = require("../controllers/empleadoController");
const { getRestaurantes, getRestauranteId, updateRestaurante, postRestaurante, delRestaurante} = require("../controllers/restauranteController");
const { getInventario, agregarProducto, eliminarProducto, getProductos } =require("../controllers/inventarioController");
const { agregarCategoria, getCategorias } = require("../controllers/categoriaController");
const { agregarPlatillo, getPlatillos } = require("../controllers/platilloController");
const { CrearPedido, getPedidosEnProceso, updatePedidoEstado, getPedidosListo } = require("../controllers/pedidoController")
const { procesarPago } = require("../controllers/pagosController");
const { upload, uploadImage } = require("../controllers/imagenController");

//Login
router.post('/login', login);
router.get('/login-list', usuarios_login);

//Roles 
router.get('/getRoles', getRoles);
router.post('/postRoles', postRoles);
router.get('/getRolId/:id', getRolesId);
router.delete('/delRol/:id', delRoles);
router.post('/updateRoles/:id', updateRoles);


//Usuarios
router.get('/getUsuarios', getUsuarios);
router.get('/getUsuarioId/:id', getUsuarioId);
router.post('/postUsuario', postUsuario);
router.post('/updateUsuario/:id', updateUsuario);
router.delete('/delUsuario/:id', delUsuario);


//Empleados
router.get('/getEmpleados', getEmpleados);
router.get('/getEmpleadoId/:id', getEmpleadoId);
router.post('/postEmpleado', postEmpleado);
router.post('/updateEmpleado/:id', updateEmpleado);
router.delete('/delEmpleado/:id', delEmpleado);
router.post('/agregar-empleado', agregarEmpleado);


//Restaurantes
router.get('/getRestaurantes', getRestaurantes);
router.get('/getRestauranteId/:id', getRestauranteId);
router.post('/postRestaurante', postRestaurante);
router.post('/updateRestaurante/:id', updateRestaurante);
router.delete('/delRestaurante/:id', delRestaurante);


//Inventario
router.get('/getInventario', getInventario);
router.get('/get-productos-nombre', getProductos);
router.post('/agregar-producto', agregarProducto);
router.delete('/eliminar-producto/:id', eliminarProducto);


//Categoria
router.post('/agregar-categoria', agregarCategoria);
router.get('/getCategorias', getCategorias);


//Platillo
router.post('/agregar-platillo', agregarPlatillo);
router.get('/getPlatillos', getPlatillos);


//imagenes
router.post("/upload-image", upload.single("image"), uploadImage);


//Pedidos
router.post("/crear-pedido", CrearPedido);
router.get('/getPedidosEnProceso', getPedidosEnProceso);
router.put('/pedidos/:id/estado', updatePedidoEstado)
router.get('/getPedidosListo', getPedidosListo);


//Pagos
router.post('/realizar-pago', procesarPago);


module.exports = router;