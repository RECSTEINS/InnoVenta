const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");
const { request, response } = require("..");


const agregarCategoria = (request, response) =>{
    const { nombre, descripcion } = request.body;

    connection.query(
        "INSERT INTO categorias(categoria_nombre, categoria_descripcion) VALUES (?, ?)",
        [nombre, descripcion],
        (error, results) =>{
            if(error){
                console.error("Error al agregar la categoria: ", error);
                response.status(500).json({ error: "Error interno del servidor."});
            }else{
                if(results.affectedRows > 0){
                    response.status(200).json({ message: "Categoria agregada correctamente."});
                }else{
                    response.status(404).json({ error: "Categoria no agregada, no fue posible añadir"});
                }
            }
        }
    )
};

module.exports = {agregarCategoria}