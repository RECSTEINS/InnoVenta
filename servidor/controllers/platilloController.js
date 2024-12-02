const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");
const { request, response } = require("..");


const getPlatillos = (request, response) =>{
    const query = `
            SELECT
                platillos.pk_platillo,
                platillos.platillo_nombre,
                platillos.platillo_precio,
                platillos.platillo_disponible,

                categorias.categoria_nombre,
                productos.producto_nombre,
                platillos_productos.fk_producto
            FROM 
                platillos
            LEFT JOIN categorias ON platillos.fk_categoria = categorias.pk_categoria
            LEFT JOIN platillos_productos ON platillos.pk_platillo = platillos_productos.fk_platillo
            LEFT JOIN productos ON platillos_productos.fk_producto = productos.pk_productos
                
        `;
        
        connection.query(query, (error, results) => {
            if (error) {
                console.error("Error al obtener platillos: ", error);
                return response.status(500).json({ error: "Error interno del servidor." });
            }

            const platillos = results.reduce((acc, row) => {
                
                const{
                    pk_platillo,
                    platillo_nombre,
                    platillo_precio,
                    platillo_disponible,
                    categoria_nombre,
                    producto_nombre,
                    fk_producto
                } = row;
            
                if (!acc[pk_platillo]) {
                    acc[pk_platillo] = {
                        id: pk_platillo,
                        nombre: platillo_nombre,
                        precio: platillo_precio,
                        disponible: !!platillo_disponible,
                        categoria: categoria_nombre,
                        productos: []
                    };
                }
                
                if (fk_producto) {
                    acc[pk_platillo].productos.push({
                        nombre_producto: producto_nombre
                    });
                }

            return acc;
        },{});
        response.status(200).json(Object.values(platillos));
    });
};


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


module.exports = { agregarPlatillo, getPlatillos }