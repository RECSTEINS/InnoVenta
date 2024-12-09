const { connection } = require("../config/config.db");

module.exports.login = (req, res) => {
    const { email, password } = req.body; 
    const consult = `
        SELECT 
            usuarios.usuario_password,
            empleados.empleado_email,
            roles.rol_nombre AS rol
        FROM 
            usuarios
        LEFT JOIN empleados ON usuarios.fk_empleado = empleados.pk_empleado
        LEFT JOIN roles ON usuarios.fk_rol = roles.pk_rol
        WHERE usuarios.usuario_password = ? AND empleados.empleado_email = ?
    ;` 
    try {
        connection.query(consult, [password, email], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: 'Error al consultar la base de datos.' });
                return;
            }
            
            if (result.length > 0) {
                const { rol } = result[0];
                res.status(200).send({
                    message: 'Inicio de sesión exitoso.',
                    rol: rol 
                });
            } else {
                res.status(401).send({ message: 'Usuario no encontrado o contraseña incorrecta.' });
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Error en el servidor.' });
    }
};

module.exports.usuarios_login = (req, res) => {
    connection.query(`
            SELECT
                usuarios.usuario_password,
                empleados.empleado_email
            FROM
                usuarios
            LEFT JOIN empleados ON usuarios.fk_empleado = empleados.pk_empleado
        ;`,(error, results)=>{
            if(error)
            throw error;
        res.status(200).json(results);            
        });
};

module.exports.updatePassword = (req, res) => {
    const { usuario_nombre, nueva_password } = req.body;


    if (!usuario_nombre || !nueva_password) {
        return res.status(400).send({ message: "Usuario y nueva contraseña son obligatorios." });
    }

    const updateQuery = `
        UPDATE usuarios
        SET usuario_password = ?
        WHERE usuario_nombre = ?
    ;`;

    try {
        connection.query(updateQuery, [nueva_password, usuario_nombre], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: "Error al actualizar la contraseña." });
                return;
            }

            if (result.affectedRows > 0) {
                res.status(200).send({ message: "Contraseña actualizada con éxito." });
            } else {
                res.status(404).send({ message: "Usuario no encontrado." });
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Error en el servidor." });
    }
};