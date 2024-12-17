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
                platillos.platillo_img,
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
                    platillo_img,
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
                        img: platillo_img,
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


const getPlatilloId = (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT
            platillos.pk_platillo,
            platillos.platillo_nombre,
            platillos.platillo_precio,
            platillos.platillo_disponible,
            platillos.platillo_img,
            platillos.fk_categoria,
            platillos.fk_restaurante,
            categorias.categoria_nombre,
            productos.pk_productos,
            productos.producto_nombre,
            platillos_productos.platillo_producto_cantidad_producto
        FROM
            platillos
        LEFT JOIN categorias ON platillos.fk_categoria = categorias.pk_categoria
        LEFT JOIN platillos_productos ON platillos.pk_platillo = platillos_productos.fk_platillo
        LEFT JOIN productos ON platillos_productos.fk_producto = productos.pk_productos
        WHERE platillos.pk_platillo = ?
    `;

    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error("Error al obtener el platillo: ", error);
            return res.status(500).json({ error: "Error interno del servidor"});
        }

        if (results.length === 0){
            return res.status(404).json({ message: "Platillo no encontrado."});
        }

        const platillo = {
            id: results[0].pk_platillo,
            nombre: results[0].platillo_nombre,
            precio: results[0].platillo_precio,
            disponible: !!results[0].platillo_disponible,
            img: results[0].platillo_img,
            fkcategoria: results[0].fk_categoria,
            fkrestaurante: results[0].fk_restaurante,
            categoria: results[0].categoria_nombre,
            productos: results
                .filter(row => row.pk_productos)
                .map(row => ({
                    id: row.pk_productos,
                    nombre_producto: row.producto_nombre,
                    cantidad: row.platillo_producto_cantidad_producto,
                }))

        };

        res.status(200).json(platillo)
    });
};


const agregarPlatillo = (request, response) => {
    const { nombre, precio, disponible, img, fkcategoria, fkrestaurante, productos } = request.body;

    
    if (!Array.isArray(productos) || productos.length === 0) {
        return response.status(400).json({ error: "Debe agregar al menos un producto para el platillo." });
    }

    if (!img.startsWith("/uploads/")) {
        return response.status(400).json({ error: "La imagen debe ser una URL válida del servidor." });
      }

    
    if (!nombre || !precio || !img || !fkcategoria || !fkrestaurante) {
        return response.status(400).json({ error: "Todos los campos obligatorios deben estar presentes." });
    }

    const insertarPlatilloQuery = `
        INSERT INTO platillos (platillo_nombre, platillo_precio, platillo_disponible, platillo_img, fk_categoria, fk_restaurante)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    
    connection.query(
        insertarPlatilloQuery,
        [nombre, precio, disponible, img, fkcategoria, fkrestaurante],
        (error, results) => {
            if (error) {
                console.error("Error al agregar platillo: ", error);
                return response.status(500).json({ error: "Error interno del servidor al agregar el platillo." });
            }

            const platilloId = results.insertId;

            
            const relaciones = productos.map(producto => [platilloId, producto.id, producto.cantidad]);

            const insertarRelacionQuery = `
                INSERT INTO platillos_productos (fk_platillo, fk_producto, platillo_producto_cantidad_producto)
                VALUES ?
            `;


            connection.query(insertarRelacionQuery, [relaciones], (errorRelacion) => {
                if (errorRelacion) {
                    console.error("Error al agregar relación platillo-producto: ", errorRelacion);
                    return response.status(500).json({ error: "Error interno del servidor al agregar relaciones." });
                }


                response.status(200).json({ message: "Platillo agregado correctamente con sus productos." });
            });
        }
    );
};

const editarPlatillo = (req, res) => {
    const { id } = req.params; 
    const { nombre, precio, disponible, img, fkcategoria, fkrestaurante, productos } = req.body;

    if (!nombre || !precio || !img || !fkcategoria || !fkrestaurante || !Array.isArray(productos)) {
        return res.status(400).json({ error: "Todos los campos obligatorios deben estar presentes y productos debe ser un arreglo." });
    }

    const actualizarPlatilloQuery = `
        UPDATE platillos 
        SET 
            platillo_nombre = ?, 
            platillo_precio = ?, 
            platillo_disponible = ?, 
            platillo_img = ?, 
            fk_categoria = ?, 
            fk_restaurante = ? 
        WHERE pk_platillo = ?
    `;

    connection.query(
        actualizarPlatilloQuery,
        [nombre, precio, disponible, img, fkcategoria, fkrestaurante, id],
        (error) => {
            if (error) {
                console.error("Error al actualizar el platillo:", error);
                return res.status(500).json({ error: "Error al actualizar el platillo." });
            }

            const eliminarRelacionesQuery = `
                DELETE FROM platillos_productos WHERE fk_platillo = ?
            `;

            connection.query(eliminarRelacionesQuery, [id], (error) => {
                if (error) {
                    console.error("Error al eliminar relaciones anteriores:", error);
                    return res.status(500).json({ error: "Error al eliminar relaciones anteriores." });
                }

                if (productos.length > 0) {
                    const nuevasRelaciones = productos.map(producto => [id, producto.id, producto.cantidad]);

                    const insertarRelacionQuery = `
                        INSERT INTO platillos_productos (fk_platillo, fk_producto, platillo_producto_cantidad_producto)
                        VALUES ?
                    `;

                    connection.query(insertarRelacionQuery, [nuevasRelaciones], (error) => {
                        if (error) {
                            console.error("Error al insertar nuevas relaciones:", error);
                            return res.status(500).json({ error: "Error al insertar nuevas relaciones de productos." });
                        }

                        res.status(200).json({ message: "Platillo actualizado correctamente." });
                    });
                } else {
                    res.status(200).json({ message: "Platillo actualizado sin productos." });
                }
            });
        }
    );
};

const eliminarPlatillo = (req, res) => {
    const { id } = req.params;

    const deleteQueryPedidosPlatillos = 'DELETE FROM pedidos_platillos WHERE fk_platillo = ?';
    const deleteQueryPlatillo = 'DELETE FROM platillos WHERE pk_platillo = ?';

   
    connection.query(deleteQueryPedidosPlatillos, [id], (error) => {
        if (error) {
            console.error("Error al eliminar relaciones en pedidos_platillos:", error);
            return res.status(500).json({ error: "Error interno al eliminar relaciones." });
        }

       
        connection.query(deleteQueryPlatillo, [id], (error) => {
            if (error) {
                console.error("Error al eliminar platillo:", error);
                return res.status(500).json({ error: "Error interno al eliminar el platillo." });
            }

            res.status(200).json({ message: "Platillo eliminado correctamente." });
        });
    });
};

module.exports = { agregarPlatillo, getPlatillos, eliminarPlatillo, editarPlatillo, getPlatilloId}