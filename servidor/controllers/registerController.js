const { connection } = require("../config/config.db");
const bcrypt = require("bcrypt");

module.exports.register = (req, res) => {
    const { usuario_nombre, nombre, apellido, email, password, rol, edad, telefono, direccion, rfc, nss, fk_restaurante, genero } = req.body;

    if (!usuario_nombre || !nombre || !apellido || !email || !password || !rol || !edad || !telefono || !direccion || !rfc || !nss || !fk_restaurante || !genero) {
        return res.status(400).send({ message: "Todos los campos son obligatorios." });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).send({ 
            message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
        });
    }

    connection.beginTransaction(err => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Error al iniciar la transacción." });
        }

        const checkEmailQuery = `
            SELECT pk_empleado FROM empleados WHERE empleado_email = ?
        ;`;

        connection.query(checkEmailQuery, [email], (err, result) => {
            if (err) {
                return connection.rollback(() => {
                    console.error(err);
                    res.status(500).send({ message: "Error al verificar el email." });
                });
            }

            if (result.length > 0) {
                return connection.rollback(() => {
                    res.status(400).send({ message: "El email ya está registrado." });
                });
            }

            const insertEmpleadoQuery = `
                INSERT INTO empleados (empleado_nombre, empleado_apellido, empleado_email, empleado_edad, empleado_genero, empleado_telefono, empleado_direccion, empleado_rfc, empleado_nss, empleado_activo)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ;`;

            connection.query(
                insertEmpleadoQuery,
                [nombre, apellido, email, edad, genero, telefono, direccion, rfc, nss, "Activo"],
                (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error(err);
                            res.status(500).send({ message: "Error al registrar el empleado." });
                        });
                    }

                    const pk_empleado = result.insertId;

                    const getRolQuery = `
                        SELECT pk_rol FROM roles WHERE rol_nombre = ?
                    ;`;

                    connection.query(getRolQuery, [rol], (err, result) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error(err);
                                res.status(500).send({ message: "Error al obtener el rol." });
                            });
                        }

                        if (result.length === 0) {
                            return connection.rollback(() => {
                                res.status(400).send({ message: "Rol no válido." });
                            });
                        }

                        const pk_rol = result[0].pk_rol;

                        // 🔐 Hash the password before inserting into the DB
                        bcrypt.hash(password, 10, (err, hashedPassword) => {
                            if (err) {
                                return connection.rollback(() => {
                                    console.error(err);
                                    res.status(500).send({ message: "Error al encriptar la contraseña." });
                                });
                            }

                            const insertUsuarioQuery = `
                                INSERT INTO usuarios (usuario_nombre, usuario_password, usuario_activo, fk_empleado, fk_rol, fk_restaurante)
                                VALUES (?, ?, ?, ?, ?, ?)
                            ;`;

                            connection.query(
                                insertUsuarioQuery,
                                [usuario_nombre, hashedPassword, 1, pk_empleado, pk_rol, fk_restaurante],
                                (err, result) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            console.error(err);
                                            res.status(500).send({ message: "Error al registrar el usuario." });
                                        });
                                    }

                                    connection.commit(err => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                console.error(err);
                                                res.status(500).send({ message: "Error al confirmar la transacción." });
                                            });
                                        }
                                        res.status(201).send({ message: "Usuario registrado exitosamente." });
                                    });
                                }
                            );
                        });
                    });
                }
            );
        });
    });
};
