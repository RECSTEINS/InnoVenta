const { connection } = require("../config/config.db");

module.exports.login = (req, res) => {
    const { nombre, password } = req.body; 
    const consult = 'SELECT usuario_nombre, usuario_pass FROM usuarios WHERE usuario_nombre = ? AND usuario_pass = ?';

    try {
        connection.query(consult, [nombre, password], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: 'Error al consultar la base de datos.' });
                return;
            }
            
            if (result.length > 0) {
                const { nombre, password } = result[0];
                res.status(200).send({
                    message: 'Inicio de sesión exitoso.',
                    username: nombre,
                    contraseña: password
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
