const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");
const { createUsuarioDTO, updateUsuarioDTO } = require("../dto");

const getUsuarios= (request, response) => {
    connection.query(`
        SELECT 
            usuarios.pk_usuario,
            usuarios.usuario_nombre,
            usuarios.usuario_password,
            usuarios.usuario_fecha_creacion,
            usuarios.usuario_activo,
            restaurantes.restaunrate_nombre AS restaurante,
            empleados.empleado_nombre AS empleado,
            roles.rol_nombre AS rol
        FROM
            usuarios
        LEFT JOIN restaurantes ON usuarios.fk_restaurante = restaurantes.pk_restaurante
        LEFT JOIN empleados ON usuarios.fk_empleado = empleados.pk_empleado
        LEFT JOIN roles ON usuarios.fk_rol = roles.pk_rol
        `,
    (error,results)=>{
        if(error) {
            console.error("Error al obtener usuarios:", error);
            return response.status(500).json({ error: "Error al obtener usuarios" });
        }
        response.status(200).json(results); // RESPUESTA PLANA
    });
};

const getUsuarioId= (request, response) => {
    const id = request.params.id;
    connection.query(`
        SELECT 
            usuarios.pk_usuario,
            usuarios.usuario_nombre,
            usuarios.usuario_password,
            usuarios.usuario_fecha_creacion,
            usuarios.usuario_activo,
            restaurantes.restaunrate_nombre AS restaurante,
            empleados.empleado_nombre AS empleado,
            roles.rol_nombre AS rol
        FROM
            usuarios
        LEFT JOIN restaurantes ON usuarios.fk_restaurante = restaurantes.pk_restaurante
        LEFT JOIN empleados ON usuarios.fk_empleado = empleados.pk_empleado
        LEFT JOIN roles ON usuarios.fk_rol = roles.pk_rol
        WHERE pk_usuario = ?
        `,
    [id],
    (error,results)=>{
        if(error) {
            console.error("Error al obtener usuario:", error);
            return response.status(500).json({ error: "Error al obtener usuario" });
        }
        
        if (results.length === 0) {
            return response.status(404).json({ error: "Usuario no encontrado" });
        }
        
        response.status(200).json(results[0]); // RESPUESTA PLANA
    });
};

const updateUsuario = (request, response) => {
    const id = request.params.id;
    const { nombre, password, img, fkrol, fkrestaurante, fkempleado } = request.body;

    // Construcción dinámica de campos para la consulta
    const fieldsToUpdate = [];
    const values = [];

    if (nombre !== undefined) {
        fieldsToUpdate.push("usuario_nombre = ?");
        values.push(nombre);
    }
    if (password !== undefined) {
        fieldsToUpdate.push("usuario_password = ?");
        values.push(password);
    }
    if (img !== undefined) {
        fieldsToUpdate.push("usuario_img = ?");
        values.push(img);
    }
    if (fkrol !== undefined) {
        fieldsToUpdate.push("fk_rol = ?");
        values.push(fkrol);
    }
    if (fkrestaurante !== undefined) {
        fieldsToUpdate.push("fk_restaurante = ?");
        values.push(fkrestaurante);
    }
    if (fkempleado !== undefined) {
        fieldsToUpdate.push("fk_empleado = ?");
        values.push(fkempleado);
    }

    if (fieldsToUpdate.length === 0) {
        return response.status(400).json({ error: "No se proporcionaron campos para actualizar" });
    }

    values.push(id);

    const query = `UPDATE usuarios SET ${fieldsToUpdate.join(", ")}, usuario_activo = 1 WHERE pk_usuario = ?`;

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error("Error al actualizar el usuario:", error);
            return response.status(500).json({ error: "Error interno del servidor" });
        }

        if (results.affectedRows > 0) {
            return response.status(200).json({ message: "Usuario actualizado correctamente" });
        } else {
            return response.status(404).json({ error: "Usuario no encontrado" });
        }
    });
};

const postUsuario = (request, response) => {
    const { id, nombre, password, img, fecha_creacion, activo, fkrestaurante, fkempleado, fkrol, action } = request.body;

    console.log("Datos recibidos:", {
        id,
        nombre,
        password,
        img,
        fecha_creacion,
        activo,
        fkrestaurante,
        fkempleado,
        fkrol,
        action
    });

    if (action === "insert") {
        connection.query(
            "INSERT INTO usuarios (usuario_nombre, usuario_password, usuario_img, usuario_fecha_creacion, usuario_activo, fk_restaurante, fk_empleado, fk_rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [nombre, password, img, fecha_creacion, activo, fkrestaurante, fkempleado, fkrol],
            (error, results) => {
                if (error) {
                    console.error("Error al insertar usuario:", error);
                    return response.status(500).json({ error: "Error al insertar usuario" });
                }
                response.status(200).json({ message: "Usuario añadido correctamente", affectedRows: results.affectedRows });
            }
        );
    } else if (action === "update") {
        connection.query(
            "UPDATE usuarios SET usuario_nombre = ?, usuario_password = ?, usuario_img = ?, usuario_activo =?, fk_rol = ? WHERE pk_usuario = ?",
            [nombre, password, img, activo, fkrol, id],
            (error, results) => {
                if (error) {
                    console.error("Error al actualizar usuario:", error);
                    return response.status(500).json({ error: "Error al actualizar usuario" });
                }
                response.status(200).json({ message: "Usuario actualizado correctamente", affectedRows: results.affectedRows });
            }
        );
    } else {
        return response.status(400).json({ error: "Acción no válida. Debe ser 'insert' o 'update'" });
    }
};

const delUsuario = (request, response)=>{
    const id = request.params.id;
    connection.query("DELETE FROM usuarios WHERE pk_usuario = ?",[id],
    (error, results)=>{
        if(error) {
            console.error("Error al eliminar usuario:", error);
            return response.status(500).json({ error: "Error al eliminar usuario" });
        }
        
        if (results.affectedRows > 0) {
            response.status(200).json({ message: "Usuario eliminado correctamente", affectedRows: results.affectedRows });
        } else {
            response.status(404).json({ error: "Usuario no encontrado" });
        }
    });
};

module.exports = {getUsuarios, getUsuarioId, updateUsuario, postUsuario, delUsuario};