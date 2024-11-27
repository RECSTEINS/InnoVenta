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
    const { nombre, password, activo, fkrol} = request.body;

    connection.query(
        "UPDATE usuarios SET usuario_nombre = ?, usuario_password = ?, usuario_activo = ?, fk_rol = ? WHERE pk_usuario = ?",
        [nombre, password, activo, fkrol, id],
        (error, results) => {
            if (error) {
                console.error("Error al actualizar el usuario:", error);
                response.status(500).json({ error: "Error interno del servidor" });
            } else {
                if (results.affectedRows > 0) {
                    response.status(200).json({ message: "Usuario actualizado correctamente" });
                } else {
                    response.status(404).json({ error: "Usuario no encontrado" });
                }
            }
        }
    );
}

const postUsuario = (request, response) => {
    const { id, nombre, password, fecha_creacion, activo, fkrestaurante, fkempleado, fkrol, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO usuarios (usuario_nombre, usuario_password, usuario_fecha_creacion, usuario_activo, fk_restaurante, fk_empleado, fk_rol) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [nombre, password, fecha_creacion, activo, fkrestaurante, fkempleado, fkrol],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Usuario añadido correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE usuarios SET usuario_nombre = ?, usuario_password = ?, usuario_activo =?, fk_rol = ? WHERE pk_usuario = ?",
            [nombre, password, activo, fkrol, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Usuario actualizado correctamente": results.affectedRows });
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