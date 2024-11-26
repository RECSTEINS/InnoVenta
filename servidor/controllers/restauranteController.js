const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");
const { request, response } = require("..");

const getRestaurantes= (request, response) => {
    connection.query("SELECT * FROM restaurantes",
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const getRestauranteId= (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM restaurantes WHERE pk_restaurante = ?",
    [id],
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const updateRestaurante = (request, response) => {
    const id = request.params.id;
    const { nombre, direccion, tipo_cocina, estado} = request.body;

    connection.query(
        "UPDATE restaurantes SET restaunrate_nombre = ?, restaurante_direccion = ?, restaurante_tipo_cocina = ?, restaurante_estado = ? WHERE pk_restaurante = ?",
        [nombre, direccion, tipo_cocina, estado, id],
        (error, results) => {
            if (error) {
                console.error("Error al actualizar el restaurante:", error);
                response.status(500).json({ error: "Error interno del servidor" });
            } else {
                if (results.affectedRows > 0) {
                    response.status(200).json({ message: "Restaurante actualizado correctamente" });
                } else {
                    response.status(404).json({ error: "Restaurante no encontrado" });
                }
            }
        }
    );
}

const postRestaurante = (request, response) => {
    const { id, nombre, direccion, fecha_registro, tipo_cocina, estado, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO restaurantes (restaunrate_nombre, restaurante_direccion, restaurante_fec_registro, restaurante_tipo_cocina, restaurante_estado) VALUES (?, ?, ?, ?, ?)",
            [nombre, direccion, fecha_registro, tipo_cocina, estado],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Restaurante añadido correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE restaurantes SET restaunrate_nombre = ?, restaurante_direccion = ?, restaurante_tipo_cocina = ?, restaurante_estado = ? WHERE pk_restaurante = ?",
            [nombre, direccion, tipo_cocina, estado, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Restaurante actualizado correctamente": results.affectedRows });
            }
        );
    }
};

const delRestaurante = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM restaurantes WHERE pk_restaurante = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Restaurante eliminado":results.affectedRows});
    });
};

module.exports = {getRestaurantes, getRestauranteId, postRestaurante, updateRestaurante, delRestaurante};