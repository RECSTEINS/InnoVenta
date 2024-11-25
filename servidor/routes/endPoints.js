const express=require("express")
const router = express.Router()
const {login} = require("../controllers/loginController")
const { getRoles, getRolesId, updateRoles, postRoles, delRoles } = require("../controllers/rolesController");
const { getUsuarios, getUsuarioId, updateUsuario, postUsuario, delUsuario} = require("../controllers/usuarioController");

//Login
router.post('/login', login);

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

module.exports = router;