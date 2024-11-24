const express=require("express")
const router = express.Router()
const { getRoles, getRolesId, updateRoles, postRoles, delRoles } = require("../controllers/rolesController");

//Roles
router.get('/getRoles', getRoles);
router.post('/postRoles', postRoles);
router.get('/getRolId/:id', getRolesId);
router.delete('/delRol/:id', delRoles);
router.post('/updateRoles/:id', updateRoles);


module.exports = router;