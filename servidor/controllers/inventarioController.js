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

const getProductos = (request, response) => {
    connection.query("SELECT pk_productos, producto_nombre FROM productos",
        (error, results)=>{
            if(error)
                throw error;
            response.status(200).json(results);
        }
    )
}

const getProductoId = (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM productos WHERE pk_productos = ?",
    [id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

const agregarProducto = (request, response) =>{
    const {nombre, stock, stock_minimo, fecha_actualizado} = request.body;

    const fechaActualizadaFormateada = new Date(fecha_actualizado).toISOString().slice(0, 19).replace('T',' ');

    connection.query(
        "INSERT INTO productos(producto_nombre, producto_stock, producto_minimo_stock, producto_fecha_actualizacion) VALUES (?, ?, ?, ?)",
        [nombre, stock, stock_minimo, fechaActualizadaFormateada],
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
    (error, results) =>{
        if(error)
            throw error;
        response.status(201).json({"Producto eliminado":results.affectedRows});
    });
}

const editarProducto = (request, response) => {
    const { id } = request.params; // ID del producto a editar
    const { nombre, stock, stock_minimo} = request.body;

   

    // Consulta SQL para actualizar el producto
    connection.query(
        "UPDATE productos SET producto_nombre = ?, producto_stock = ?, producto_minimo_stock = ? WHERE pk_productos = ?",
        [nombre, stock, stock_minimo, id],
        (error, results) => {
            if (error) {
                console.error("Error al editar el producto: ", error);
                return response.status(500).json({ error: "Error interno del servidor." });
            }

            // Verificar si se actualizó algún registro
            if (results.affectedRows > 0) {
                response.status(200).json({ message: "Producto actualizado correctamente." });
            } else {
                response.status(404).json({ error: "Producto no encontrado." });
            }
        }
    );
};

module.exports = {getInventario, agregarProducto, eliminarProducto, getProductos, getProductoId, editarProducto}