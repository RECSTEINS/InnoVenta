const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");
const { request, response } = require("..");

const CrearPedido = (request, response) => {
    const { cliente, mesa, total, carrito, usuarioId } = request.body;

    if (!cliente || !mesa || !total || carrito.length === 0) {
        return response.status(400).json({ error: "Todos los campos son obligatorios y el carrito no puede estar vacío." });
    }

    
    const verificarStockQuery = `
        SELECT 
            p.pk_productos AS id_producto, 
            p.producto_nombre, 
            p.producto_stock, 
            SUM(pp.platillo_producto_cantidad_producto * ?) AS cantidad_necesaria
        FROM productos p
        JOIN platillos_productos pp ON p.pk_productos = pp.fk_producto
        WHERE pp.fk_platillo = ?
        GROUP BY p.pk_productos
        HAVING p.producto_stock < cantidad_necesaria;
    `;

    
    const promesasVerificacion = carrito.map(item =>
        new Promise((resolve, reject) => {
            connection.query(
                verificarStockQuery,
                [item.cantidad, item.id],
                (error, results) => {
                    if (error) {
                        console.error("Error al verificar el stock: ", error);
                        return reject("Error interno del servidor al verificar el stock.");
                    }
                    if (results.length > 0) {
                        return reject(`Stock insuficiente para el producto: ${results[0].producto_nombre}.`);
                    }
                    resolve();
                }
            );
        })
    );


    Promise.all(promesasVerificacion)
        .then(() => {
            
            const insertarPedidoQuery = `
                INSERT INTO pedidos (pedido_fecha, pedido_monto, pedido_estado, pedido_cliente, fk_mesa, fk_usuario)
                VALUES (NOW(), ?, 'EN PROCESO', ?, ?, ?)
            `;

            connection.query(
                insertarPedidoQuery,
                [total, cliente, mesa, usuarioId],
                (error, results) => {
                    if (error) {
                        console.error("Error al registrar el pedido: ", error);
                        return response.status(500).json({ error: "Error interno del servidor al registrar el pedido." });
                    }

                    const pedidoId = results.insertId;

                    const insertDetallesQuery = `
                        INSERT INTO pedidos_platillos (fk_pedido, fk_platillo, pedido_platillo_cantidad)
                        VALUES ?
                    `;

                    const detallesPedido = carrito.map(item => [
                        pedidoId,
                        item.id,
                        item.cantidad
                    ]);

                    connection.query(
                        insertDetallesQuery,
                        [detallesPedido],
                        (errorDetalles) => {
                            if (errorDetalles) {
                                console.error("Error al registrar los detalles del pedido: ", errorDetalles);
                                return response.status(500).json({ error: "Error interno del servidor al registrar los detalles del pedido." });
                            }

                            response.status(200).json({
                                message: "Pedido registrado correctamente.",
                                pedidoId,
                                estado: "EN PROCESO"
                            });
                        }
                    );
                }
            );
        })
        .catch((errorMensaje) => {
            // Si hay algún problema con el stock, devolvemos el error
            return response.status(400).json({ error: errorMensaje });
        });
};


const getPedidosEnProceso = (req, res) => {
    const query = `
        SELECT 
            p.pk_pedido AS id, 
            p.pedido_estado AS estado, 
            p.fk_mesa AS mesa,
            p.pedido_monto AS monto, 
            p.pedido_cliente AS cliente,
            m.mesa_numero AS numeroMesa,
            pl.platillo_nombre AS platilloNombre, 
            pp.pedido_platillo_cantidad AS cantidad, 
            pl.platillo_precio AS precio
        FROM pedidos p
        JOIN mesas m ON p.fk_mesa = m.pk_mesa
        JOIN pedidos_platillos pp ON p.pk_pedido = pp.fk_pedido
        JOIN platillos pl ON pp.fk_platillo = pl.pk_platillo
        WHERE p.pedido_estado = 'EN PROCESO'
        ORDER BY p.pk_pedido;
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error al obtener los pedidos en proceso: ", error);
            return res.status(500).json({ error: "Error al obtener los pedidos." });
        }

        const pedidosMap = new Map();
        const colores = ["color-1", "color-2", "color-3"];

        results.forEach((row, index) => {
            const { id, estado, mesa, monto, cliente, numeroMesa, platilloNombre, cantidad, precio } = row;

            if (!pedidosMap.has(id)) {
                pedidosMap.set(id, {
                    id,
                    estado,
                    numeroMesa,
                    monto,
                    cliente,
                    mesa,
                    colorClase: colores[index % colores.length],
                    platillos: [] 
                });
            }

            pedidosMap.get(id).platillos.push({
                nombre: platilloNombre,
                cantidad,
                precio
            });
        });

        const pedidosEnProceso = Array.from(pedidosMap.values());

        res.status(200).json(pedidosEnProceso);
    });
};

const getPedidosListo = (req, res) => {
    const query = `
        SELECT 
            p.pk_pedido AS id, 
            p.pedido_estado AS estado, 
            p.fk_mesa AS mesa,
            p.pedido_monto AS monto, 
            p.pedido_cliente AS cliente,
            m.mesa_numero AS numeroMesa,
            pl.platillo_nombre AS platilloNombre, 
            pp.pedido_platillo_cantidad AS cantidad, 
            pl.platillo_precio AS precio
        FROM pedidos p
        JOIN mesas m ON p.fk_mesa = m.pk_mesa
        JOIN pedidos_platillos pp ON p.pk_pedido = pp.fk_pedido
        JOIN platillos pl ON pp.fk_platillo = pl.pk_platillo
        WHERE p.pedido_estado = 'LISTO'
        ORDER BY p.pk_pedido;
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error al obtener los pedidos en proceso: ", error);
            return res.status(500).json({ error: "Error al obtener los pedidos." });
        }

        const pedidosMap = new Map();
        const colores = ["color-1", "color-2", "color-3"];

        results.forEach((row, index) => {
            const { id, estado, mesa, monto, cliente, numeroMesa, platilloNombre, cantidad, precio } = row;

            if (!pedidosMap.has(id)) {
                pedidosMap.set(id, {
                    id,
                    estado,
                    numeroMesa,
                    monto,
                    cliente,
                    mesa,
                    colorClase: colores[index % colores.length],
                    platillos: [] 
                });
            }

            pedidosMap.get(id).platillos.push({
                nombre: platilloNombre,
                cantidad,
                precio
            });
        });

        const pedidosEnProceso = Array.from(pedidosMap.values());

        res.status(200).json(pedidosEnProceso);
    });
};


const updatePedidoEstado = (req, res) => {
    const { id } = req.params; // ID del pedido
    const { estado } = req.body; // Nuevo estado, por ejemplo 'LISTO'

    console.log('ID recibido:', id);
    console.log('Estado recibido:', estado);

    const query = `
        UPDATE pedidos
        SET pedido_estado = ?
        WHERE pk_pedido = ?;
    `;

    connection.query(query, [estado, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el estado del pedido:', err);
            return res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
        }

        console.log('Resultado de la consulta:', result);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Estado del pedido actualizado correctamente' });
        } else {
            return res.status(404).json({ message: 'Pedido no encontrado o estado no cambiado' });
        }
    });
};

module.exports = {CrearPedido, getPedidosEnProceso, updatePedidoEstado, getPedidosListo};