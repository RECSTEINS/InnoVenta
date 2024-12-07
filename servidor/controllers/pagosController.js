const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");
const { request, response } = require("..");


const procesarPago = async (request, response) => {
    const { tipo, pk_pedido } = request.body; // Ahora usamos pk_pedido

    console.log("Datos recibidos en el backend:", { tipo, pk_pedido });
    
    if (!tipo || !pk_pedido) {
        return response.status(400).json({ error: "El tipo de pago y el pedido son obligatorios." });
    }

    const tiposValidos = ["EFECTIVO", "TARJETA", "VALES"];
    if (!tiposValidos.includes(tipo)) {
        return response.status(400).json({ error: "El tipo de pago no es válido." });
    }

    // Obtener el monto del pedido y la venta asociada
    const obtenerDatosPedidoQuery = `
        SELECT pedidos.pedido_monto AS montoBase, ventas.pk_venta AS fk_venta
        FROM pedidos
        LEFT JOIN ventas ON ventas.fk_pedido = pedidos.pk_pedido
        WHERE pedidos.pk_pedido = ?
    `;

    connection.query(obtenerDatosPedidoQuery, [pk_pedido], (error, results) => {
        if (error) {
            console.error("Error al obtener datos del pedido: ", error);
            return response.status(500).json({ error: "Error interno del servidor." });
        }

        if (results.length === 0) {
            return response.status(404).json({ error: "No se encontró un pedido con el ID proporcionado." });
        }

        const { montoBase, fk_venta } = results[0];
        const montoConIVA = parseFloat((montoBase * 1.16).toFixed(2));

        // Insertar el pago
        const insertarPagoQuery = `
            INSERT INTO pagos (pago_monto_total, pago_tipo, pago_fecha, fk_venta)
            VALUES (?, ?, NOW(), ?)
        `;

        connection.query(insertarPagoQuery, [montoConIVA, tipo, fk_venta], (errorInsert) => {
            if (errorInsert) {
                console.error("Error al registrar el pago: ", errorInsert);
                return response.status(500).json({ error: "Error interno del servidor al registrar el pago." });
            }

            // Actualizar el estado de la venta
            const actualizarVentaQuery = `
                UPDATE ventas
                SET venta_estado = 'PAGADO', venta_fecha_cierre = NOW()
                WHERE pk_venta = ?
            `;

            connection.query(actualizarVentaQuery, [fk_venta], (errorVenta) => {
                if (errorVenta) {
                    console.error("Error al actualizar la venta: ", errorVenta);
                    return response.status(500).json({ error: "Error interno del servidor al actualizar la venta." });
                }

                response.status(200).json({
                    message: "Pago registrado exitosamente y venta actualizada a 'PAGADA'.",
                    montoSinIVA: montoBase,
                    montoConIVA,
                });
            });
        });
    });
};

module.exports = { procesarPago };