const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");
const { request, response } = require("..");

const getRoles= (request, response) => {
    connection.query("SELECT * FROM roles",
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const getRolesId= (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM roles WHERE pk_rol = ?",
    [id],
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const updateRoles = (request, response) => {
    const id = request.params.id;
    const { nombre} = request.body;

    connection.query(
        "UPDATE roles SET rol_nombre = ? WHERE pk_rol = ?",
        [nombre, id],
        (error, results) => {
            if (error) {
                console.error("Error al actualizar el rol:", error);
                response.status(500).json({ error: "Error interno del servidor" });
            } else {
                if (results.affectedRows > 0) {
                    response.status(200).json({ message: "Rol actualizado correctamente" });
                } else {
                    response.status(404).json({ error: "Rol no encontrado" });
                }
            }
        }
    );
}

const postRoles = (request, response) => {
    const { id, nombre, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO roles (rol_nombre) VALUES (?)",
            [nombre],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Rol añadido correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE roles SET rol_nombre = ? WHERE pk_rol = ?",
            [nombre, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Rol actualizado correctamente": results.affectedRows });
            }
        );
    }
};

const delRoles = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM roles WHERE pk_rol = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Rol eliminado":results.affectedRows});
    });
};

module.exports = {getRoles, getRolesId, updateRoles, postRoles, delRoles};