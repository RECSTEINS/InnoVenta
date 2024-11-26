const express=require("express")
const router = express.Router()
const {login, usuarios_login} = require("../controllers/loginController")
const { getRoles, getRolesId, updateRoles, postRoles, delRoles } = require("../controllers/rolesController");
const { getUsuarios, getUsuarioId, updateUsuario, postUsuario, delUsuario} = require("../controllers/usuarioController");
const { getEmpleados, getEmpleadoId, updateEmpleado, postEmpleado, delEmpleado} = require("../controllers/empleadoController");
const { getRestaurantes, getRestauranteId, updateRestaurante, postRestaurante, delRestaurante} = require("../controllers/restauranteController");

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


//Restaurantes
router.get('/getRestaurantes', getRestaurantes);
router.get('/getRestauranteId/:id', getRestauranteId);
router.post('/postRestaurante', postRestaurante);
router.post('/updateRestaurante/:id', updateRestaurante);
router.delete('/delRestaurante/:id', delRestaurante);


module.exports = router;