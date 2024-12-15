const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");
const { request, response } = require("..");

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
        if(error)
        throw error;
    response.status(200).json(results);
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
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const updateUsuario = (request, response) => {
    const id = request.params.id;
    const { nombre, password, img, fkrol, fkrestaurante, fkempleado,  } = request.body;

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


    // Si no hay campos para actualizar, retornamos un error
    if (fieldsToUpdate.length === 0) {
        return response.status(400).json({ error: "No se proporcionaron campos para actualizar" });
    }

    // Agregamos el id al final de los valores
    values.push(id);

    // Construcción de la consulta SQL
    const query = `UPDATE usuarios SET ${fieldsToUpdate.join(", ")}, usuario_activo = 1 WHERE pk_usuario = ?`;

    // Ejecución de la consulta
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

    // Verifica que los valores necesarios están presentes
    if (!nombre || !password || !fkempleado || !fkrestaurante || !fkrol) {
        return response.status(400).json({ message: "Faltan datos obligatorios" });
    }

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
                    throw error;
                }
                response.status(200).json({ "Usuario añadido correctamente": results.affectedRows });
            }
        );
    } else if (action === "update") {
        connection.query(
            "UPDATE usuarios SET usuario_nombre = ?, usuario_password = ?, usuario_img = ?, usuario_activo =?, fk_rol = ? WHERE pk_usuario = ?",
            [nombre, password, img, activo, fkrol, id],
            (error, results) => {
                if (error) {
                    console.error("Error al actualizar usuario:", error);
                    throw error;
                }
                response.status(200).json({ "Usuario actualizado correctamente": results.affectedRows });
            }
        );
    }
};
const delUsuario = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM usuarios WHERE pk_usuario = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Usuario eliminado":results.affectedRows});
    });
};

module.exports = {getUsuarios, getUsuarioId, updateUsuario, postUsuario, delUsuario};