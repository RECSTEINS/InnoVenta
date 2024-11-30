const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");
const { request, response } = require("..");

const getInventario = (request, response) => {
    connection.query("SELECT * FROM productos",
        (error, results)=>{
            if(error)
            throw error;
        response.status(200).json(results);
    })
};


const agregarProducto = (request, response) =>{
    const {nombre, stock, stock_minimo, fecha_actualizado} = request.body;

    //const fechaActualizadaFormateada = new Date(fecha_actualizado).toISOString().slice(0, 19).replace('T',' ');

    connection.query(
        "INSERT INTO productos(producto_nombre, producto_stock, producto_minimo_stock, producto_fecha_actualizacion) VALUES (?, ?, ?, ?)",
        [nombre, stock, stock_minimo, fecha_actualizado],
        (error, results) => {
            if(error){
                console.error("Error al agregar el producto: ", error);
                response.status(500).json({ error: "Error interno del servidor."});
            }else{
                if(results.affectedRows > 0){
                    response.status(200).json({ message: "Producto agregado correctamente."});
                } else{
                    response.status(404).json({ error: "Producto no agregrado, no fue posible realizar el insert."});
                }
            }
        }
    )
};


const eliminarProducto = (request, response)=>{
    const id = request.params.id;
    connection.query("DELETE FROM productos WHERE pk_productos = ?",[id],
    (error, resulst) =>{
        if(error)
            throw error;
        response.status(201).json({"Producto eliminado":resulst.affectedRows});
    });
}

module.exports = {getInventario, agregarProducto, eliminarProducto}