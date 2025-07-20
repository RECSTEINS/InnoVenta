const { connection } = require("../config/config.db");
const { loginDTO, updatePasswordDTO } = require("../dto");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    // Validar datos con DTO
    const { error, value } = loginDTO.validate(req.body);
    
    if (error) {
        const errorMessages = error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
        }));
        
        return res.status(400).json({
            success: false,
            message: 'Error de validación en login',
            errors: errorMessages
        });
    }

    const { email, password } = value; // Usar datos validados
    
    const consult = `
        SELECT 
            usuarios.pk_usuario,
            usuarios.usuario_password,
            empleados.empleado_email,
            roles.rol_nombre AS rol
        FROM 
            usuarios
        LEFT JOIN empleados ON usuarios.fk_empleado = empleados.pk_empleado
        LEFT JOIN roles ON usuarios.fk_rol = roles.pk_rol
        WHERE empleados.empleado_email = ?
    ;` 
    try {
        connection.query(consult, [email], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({ 
                    success: false,
                    message: 'Error al consultar la base de datos.' 
                });
                return;
            }
            
            if (result.length > 0) {
                const { pk_usuario, usuario_password, rol } = result[0];
                
                // Compare the provided password with the hashed password
                bcrypt.compare(password, usuario_password, (err, isMatch) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send({ 
                            success: false,
                            message: 'Error al verificar la contraseña.' 
                        });
                        return;
                    }
                    
                    if (isMatch) {
                        // Generar JWT
                        const token = jwt.sign(
                            { id: pk_usuario, rol },
                            process.env.JWT_SECRET,
                            { expiresIn: '2h' }
                        );
                        res.status(200).send({
                            success: true,
                            message: 'Inicio de sesión exitoso.',
                            rol: rol,
                            token
                        });
                    } else {
                        res.status(401).send({ 
                            success: false,
                            message: 'Usuario no encontrado o contraseña incorrecta.' 
                        });
                    }
                });
            } else {
                res.status(401).send({ 
                    success: false,
                    message: 'Usuario no encontrado o contraseña incorrecta.' 
                });
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({ 
            success: false,
            message: 'Error en el servidor.' 
        });
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
        res.status(200).json({
            success: true,
            data: results
        });            
        });
};

module.exports.updatePassword = (req, res) => {
    // Validar datos con DTO
    const { error, value } = updatePasswordDTO.validate(req.body);
    
    if (error) {
        const errorMessages = error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
        }));
        
        return res.status(400).json({
            success: false,
            message: 'Error de validación en actualización de contraseña',
            errors: errorMessages
        });
    }

    const { usuario_nombre, nueva_password } = value; // Usar datos validados

    // Hash the new password before updating
    bcrypt.hash(nueva_password, 10, (err, hashedPassword) => {
        if (err) {
            console.error(err);
            res.status(500).send({ 
                success: false,
                message: "Error al encriptar la nueva contraseña." 
            });
            return;
        }

        const updateQuery = `
            UPDATE usuarios
            SET usuario_password = ?
            WHERE usuario_nombre = ?
        ;`;

        try {
            connection.query(updateQuery, [hashedPassword, usuario_nombre], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send({ 
                        success: false,
                        message: "Error al actualizar la contraseña." 
                    });
                    return;
                }

                if (result.affectedRows > 0) {
                    res.status(200).send({ 
                        success: true,
                        message: "Contraseña actualizada con éxito." 
                    });
                } else {
                    res.status(404).send({ 
                        success: false,
                        message: "Usuario no encontrado." 
                    });
                }
            });
        } catch (e) {
            console.error(e);
            res.status(500).send({ 
                success: false,
                message: "Error en el servidor." 
            });
        }
    });
};

module.exports.verifyToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Token no proporcionado' 
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ 
                success: false, 
                message: 'Token inválido o expirado' 
            });
        }

        // Obtener información completa del usuario
        const consult = `
            SELECT 
                usuarios.pk_usuario,
                usuarios.usuario_nombre,
                empleados.empleado_nombre,
                empleados.empleado_apellido,
                empleados.empleado_email,
                roles.rol_nombre AS rol
            FROM 
                usuarios
            LEFT JOIN empleados ON usuarios.fk_empleado = empleados.pk_empleado
            LEFT JOIN roles ON usuarios.fk_rol = roles.pk_rol
            WHERE usuarios.pk_usuario = ?
        `;

        connection.query(consult, [decoded.id], (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Error al consultar la base de datos' 
                });
            }

            if (result.length === 0) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Usuario no encontrado' 
                });
            }

            const user = result[0];
            res.status(200).json({
                success: true,
                user: {
                    id: user.pk_usuario,
                    nombre: user.usuario_nombre,
                    nombreCompleto: `${user.empleado_nombre} ${user.empleado_apellido}`,
                    email: user.empleado_email,
                    rol: user.rol
                }
            });
        });
    });
};