const express=require("express")
const router = express.Router()
const { login, usuarios_login, updatePassword, verifyToken } = require("../controllers/loginController")
const { register } = require("../controllers/registerController")
const { getRoles, getRolesId, updateRoles, postRoles, delRoles } = require("../controllers/rolesController");
const { getUsuarios, getUsuarioId, updateUsuario, postUsuario, delUsuario} = require("../controllers/usuarioController");
const { getEmpleados, getEmpleadoId, updateEmpleado, postEmpleado, delEmpleado, agregarEmpleado} = require("../controllers/empleadoController");
const { getRestaurantes, getRestauranteId, updateRestaurante, postRestaurante, delRestaurante} = require("../controllers/restauranteController");
const { getInventario, getProductoId ,agregarProducto, eliminarProducto, getProductos, editarProducto } =require("../controllers/inventarioController");
const { agregarCategoria, getCategorias } = require("../controllers/categoriaController");
const { agregarPlatillo, getPlatillos, eliminarPlatillo, editarPlatillo, getPlatilloId } = require("../controllers/platilloController");
const { CrearPedido, getPedidosEnProceso, updatePedidoEstado, getPedidosListo } = require("../controllers/pedidoController")
const { procesarPago } = require("../controllers/pagosController");
const { upload, uploadImage } = require("../controllers/imagenController");
const { getReportes, getProductosBajoStock, getPlatillosMasVendidos } = require("../controllers/reporteController");
const { getResenas, postResena, deleteResena, updateResena } = require("../controllers/resenaController");
const auth = require('../middleware/auth');

// Importar middleware de validación y DTOs
const validateDTO = require("../middleware/validateDTO");
const { 
    loginDTO, 
    updatePasswordDTO,
    createUsuarioDTO,
    updateUsuarioDTO,
    createEmpleadoDTO,
    updateEmpleadoDTO,
    createRestauranteDTO,
    updateRestauranteDTO,
    createProductoDTO,
    updateProductoDTO,
    createPlatilloDTO,
    updatePlatilloDTO,
    createPedidoDTO,
    updatePedidoEstadoDTO,
    createCategoriaDTO,
    reporteDTO
} = require("../dto");

//Login
router.post('/login', validateDTO(loginDTO), login);
router.get('/verify-token', verifyToken);
router.get('/login-list', usuarios_login);
router.post('/login-update', validateDTO(updatePasswordDTO), updatePassword);
router.post('/register', register);

//Roles 
router.get('/getRoles', getRoles);
router.post('/postRoles', postRoles);
router.get('/getRolId/:id', getRolesId);
router.delete('/delRol/:id', delRoles);
router.post('/updateRoles/:id', updateRoles);


//Usuarios
router.get('/getUsuarios', auth(['Administrador', 'supervisor']), getUsuarios);
router.get('/getUsuarioId/:id', auth(['Administrador', 'supervisor']), getUsuarioId);
router.post('/postUsuario', auth('Administrador'), validateDTO(createUsuarioDTO), postUsuario);
router.post('/updateUsuario/:id', auth('Administrador'), validateDTO(updateUsuarioDTO), updateUsuario);
router.delete('/delUsuario/:id', auth('Administrador'), delUsuario);


//Empleados
router.get('/getEmpleados', getEmpleados);
router.get('/getEmpleadoId/:id', getEmpleadoId);
router.post('/postEmpleado', validateDTO(createEmpleadoDTO), postEmpleado);
router.post('/updateEmpleado/:id', validateDTO(updateEmpleadoDTO), updateEmpleado);
router.delete('/delEmpleado/:id', delEmpleado);
router.post('/agregar-empleado', validateDTO(createEmpleadoDTO), agregarEmpleado);


//Restaurantes
router.get('/getRestaurantes', getRestaurantes);
router.get('/getRestauranteId/:id', getRestauranteId);
router.post('/postRestaurante', validateDTO(createRestauranteDTO), postRestaurante);
router.post('/updateRestaurante/:id', validateDTO(updateRestauranteDTO), updateRestaurante);
router.delete('/delRestaurante/:id', delRestaurante);


//Inventario
router.get('/getInventario', getInventario);
router.get('/get-productos-nombre', getProductos);
router.post('/agregar-producto', validateDTO(createProductoDTO), agregarProducto);
router.delete('/eliminar-producto/:id', eliminarProducto);
router.get('/get-producto-id/:id', getProductoId);
router.post('/updateProducto/:id', validateDTO(updateProductoDTO), editarProducto)

//Categoria
router.post('/agregar-categoria', validateDTO(createCategoriaDTO), agregarCategoria);
router.get('/getCategorias', getCategorias);


//Platillo
router.post('/agregar-platillo', validateDTO(createPlatilloDTO), agregarPlatillo);
router.get('/getPlatillos', getPlatillos);
router.delete('/eliminar-platillo/:id', eliminarPlatillo);
router.put('/editar-platillo/:id', validateDTO(updatePlatilloDTO), editarPlatillo);
router.get('/get-platillo/:id', getPlatilloId);

//imagenes
router.post("/upload-image", upload.single("image"), uploadImage);


//Pedidos
router.post("/crear-pedido", validateDTO(createPedidoDTO), CrearPedido);
router.get('/getPedidosEnProceso', getPedidosEnProceso);
router.put('/pedidos/:id/estado', validateDTO(updatePedidoEstadoDTO), updatePedidoEstado)
router.get('/getPedidosListo', getPedidosListo);


//Pagos
router.post('/realizar-pago', procesarPago);


//Reportes
router.post('/get-reportes', auth(['admin', 'supervisor']), validateDTO(reporteDTO), getReportes);
router.get('/productos-bajo-stock', auth(['admin', 'supervisor']), getProductosBajoStock);
router.get('/platillos-mas-vendidos', auth(['admin', 'supervisor']), getPlatillosMasVendidos);

//Resenas
router.get('/getResenas', getResenas);
router.post('/postResena', postResena);
router.delete('/delResena/:id', deleteResena);
router.put('/updateResena/:id', updateResena);

// Ejemplo de rutas protegidas por rol
router.get('/admin-panel', auth('admin'), (req, res) => {
    res.status(200).json({ message: 'Bienvenido al panel de administrador', user: req.user });
});

router.get('/supervisor-panel', auth('supervisor'), (req, res) => {
    res.status(200).json({ message: 'Bienvenido al panel de supervisor', user: req.user });
});

module.exports = router;