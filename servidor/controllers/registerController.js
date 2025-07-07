const { connection } = require("../config/config.db");

module.exports.register = (req, res) => {
    const { nombre, apellido, email, password, rol, edad, telefono, direccion, rfc, nss, fk_restaurante, genero } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !apellido || !email || !password || !rol || !edad || !telefono || !direccion || !rfc || !nss || !fk_restaurante || !genero) {
        return res.status(400).send({ message: "Todos los campos son obligatorios." });
    }

    // Validar formato de contraseña
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

        // Verificar si el email ya está registrado
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

            // Insertar en la tabla empleados (agregando genero y empleado_activo)
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

                    // Obtener el pk_rol correspondiente al rol_nombre
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

                        // Insertar en la tabla usuarios (agregando usuario_nombre y usuario_activo)
                        const insertUsuarioQuery = `
                            INSERT INTO usuarios (usuario_nombre, usuario_password, usuario_activo, fk_empleado, fk_rol, fk_restaurante)
                            VALUES (?, ?, ?, ?, ?, ?)
                        ;`;

                        connection.query(
                            insertUsuarioQuery,
                            [nombre, password, 1, pk_empleado, pk_rol, fk_restaurante], // 1 para activo
                            (err, result) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        console.error(err);
                                        res.status(500).send({ message: "Error al registrar el usuario." });
                                    });
                                }

                                // Si todo fue bien, confirmar la transacción
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
                }
            );
        });
    });
};