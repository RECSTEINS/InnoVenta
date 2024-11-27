const { connection } = require("../config/config.db");

module.exports.login = (req, res) => {
    const { email, password } = req.body; 
    const consult = `
        SELECT 
            usuarios.usuario_password,
            empleados.empleado_email
        FROM 
            usuarios
        LEFT JOIN empleados ON  usuarios.fk_empleado = empleados.pk_empleado
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
                const { email, password } = result[0];
                res.status(200).send({
                    message: 'Inicio de sesión exitoso.',
                    email: email,
                    password: password
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