const { connection } = require("../config/config.db");
const jwt = require("jsonwebtoken");
require('dotenv').config();


//Chacar funcionamiento con web
module.exports.login = (req, res) => {
    const { username, password } = req.body;
    const consult = 'SELECT Usuario_Username, Usuario_Puesto FROM usuarios WHERE Usuario_Username = ?';
    try {
        connection.query(consult, [username], (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result.length > 0) {
                const { Usuario_Username, Usuario_Puesto } = result[0];
                const token = jwt.sign({ username: Usuario_Username, puesto: Usuario_Puesto }, "Stack", {
                    expiresIn: '3m'
                });
                res.send({ token, puesto: Usuario_Puesto });
            } else {
                console.log('Usuario no encontrado o contraseña incorrecta.');
                res.send({ message: 'Usuario no encontrado o contraseña incorrecta.' });
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Error en el servidor.' });
    }
};

