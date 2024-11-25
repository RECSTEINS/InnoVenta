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
            usuarios.usuario_img,
            usuarios.usuario_email,
            usuarios.usuario_pass,
            usuarios.usuario_fec_creacion,
            usuarios.usuario_telefono,
            usuarios.usuario_estado,
            usuarios.usuario_direccion,
            roles.rol_nombre AS rol
        FROM 
            usuarios
        JOIN 
            roles
        ON 
            usuarios.fk_rol = roles.pk_rol
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
            usuarios.usuario_img,
            usuarios.usuario_email,
            usuarios.usuario_pass,
            usuarios.usuario_fec_creacion,
            usuarios.usuario_telefono,
            usuarios.usuario_estado,
            usuarios.usuario_direccion,
            roles.rol_nombre AS rol
        FROM 
            usuarios
        JOIN 
            roles
        ON 
            usuarios.fk_rol = roles.pk_rol
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
    const { nombre} = request.body;

    connection.query(
        "UPDATE usuarios SET usuario_nombre = ?, usuario_img = ?, usuario_email = ?, usuario_pass = ?, usuario_telefono = ?, usuario_direccion = ? WHERE pk_usuario = ?",
        [nombre, img, email, password, telefono, direccion, id],
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
    const { id, nombre, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO usuarios (usuario_nombre, usuario_img, usuario_email, usuario_pass, usuario_fec_creacion, usuario_telefono, usuario_estado, usuario_direccion, fk_rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [nombre, img, email, password, fec_creacion, telefono, estado, direccion, fk_rol ],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Usuario añadido correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE usuarios SET usuario_nombre = ?, usuario_img = ?, usuario_email = ?, usuario_pass = ?, usuario_telefono = ?, usuario_estado =?, usuario direccion = ?, fk_rol = ? WHERE pk_usuario = ?",
            [nombre, img, email, password, telefono, estado, direccion, fk_rol, id],
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