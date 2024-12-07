const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");
const { request, response } = require("..");

const CrearPedido = (request, response) => {
    const { cliente, mesa, total, carrito, usuarioId } = request.body;

    if(!cliente || !mesa || !total || carrito.length === 0){
        return response.status(400).json({ error: "Todos los campos son obligatorios y el carrito no puede estar vacío."});
    }

    const insertarPedidoQuery = `
        INSERT INTO pedidos (pedido_fecha, pedido_monto, pedido_estado, pedido_cliente, fk_mesa, fk_usuario)
        VALUES (NOW(), ?, 'EN PROCESO', ?, ?, ?)
    `;

    connection.query(
        insertarPedidoQuery,
        [total, cliente, mesa, usuarioId],
        (error, results) => {
            if(error){
                console.error("Error al registrar el pedido: ", error);
                return response.status(500).json({ error: "Error interno del servidor al registrar el pedido."});
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
                    if (errorDetalles){
                        console.error("Error al registrar los detalles del pedido: ", errorDetalles);
                        return response.status(500).json({ error: "Error interno del servidor al registrar los detalles del pedido"})
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
};


const getPedidosEnProceso = (req, res) => {
    const query = `
        SELECT p.pk_pedido AS id, 
               p.pedido_estado AS estado, 
               p.fk_mesa AS mesa, 
               m.mesa_numero AS numeroMesa
        FROM pedidos p
        JOIN mesas m ON p.fk_mesa = m.pk_mesa
        WHERE p.pedido_estado = 'EN PROCESO';
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error al obtener los pedidos en proceso: ", error);
            return res.status(500).json({ error: "Error al obtener los pedidos." });
        }

        // Agregar colorClase dinámicamente
        const colores = ["color-1", "color-2", "color-3"];
        const pedidosConColor = results.map((pedido, index) => ({
            ...pedido,
            colorClase: colores[index % colores.length], // Asignar colores de forma cíclica
        }));

        res.status(200).json(pedidosConColor);
    });
};


module.exports = {CrearPedido, getPedidosEnProceso};