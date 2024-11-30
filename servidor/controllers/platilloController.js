const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");
const { request, response } = require("..");


const agregarPlatillo = (request, response) =>{
    const { nombre, precio, disponible, img, fkcategoria, fkrestaurante, productos} = request.body;

    if(!Array.isArray(productos) || productos.length === 0){
        return response.status(400).json({ error:"Debe agregar al menos un producto para el platillo."});
    }

    const insertarPlatilloQuery = `
        INSERT INTO platillos (platillo_nombre, platillo_precio, platillo_disponible, platillo_img, fk_categoria, fk_restaurante)
        VALUES(?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        insertarPlatilloQuery,
        [nombre, precio, disponible, img, fkcategoria, fkrestaurante],
        (error, results) => {
            if(error){
                console.error("Error al agregar platillo: ", error);
                response.status(500).json({ error: "Error interno del servidor."});
            }

            const platilloId = results.insertId;

            const relaciones = productos.map(producto => [platilloId, producto.id, producto.cantidad]);

            const insertarRelacionQuery = `
                INSERT INTO platillos_productos (fk_platillo, fk_producto, platillo_producto_cantidad_producto)
                VALUES ?
            `;

            connection.query(insertarRelacionQuery, [relaciones], (errorRelacion) => {
                if(errorRelacion){
                    console.error("Error al agregar relación platillo-producto: ", errorRelacion);
                    return response.status(500).json({ error: "Error interno del servidor al agregar relaciones."});
                }

                response.status(200).json({ message: "Platillo agregado correctamente con sus producto."});
            });
        }
    )
};


module.exports = { agregarPlatillo }