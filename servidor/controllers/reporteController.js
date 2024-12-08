const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");
const { request, response } = require("..");


const getReportes = ( request, response) => {
    const {fechaDesde, fechaHasta, cliente, estado} = request.body;

    let query = `SELECT ventas.pk_venta, ventas.venta_fecha_creacion, ventas.venta_estado,
                       pedidos.pedido_cliente,
                       IFNULL(SUM(pedidos.pedido_monto), 0) AS total
                 FROM ventas
                 INNER JOIN pedidos ON ventas.fk_pedido = pedidos.pk_pedido`;

    const params = [];
    const conditions = [];

    if (fechaDesde){
        conditions.push("ventas.venta_fecha_creacion >= ?");
        params.push(fechaDesde);
    }

    if (fechaHasta){
        conditions.push("ventas.venta_fecha_creacion <= ?");
        params.push(fechaHasta);
    }

    if (cliente) {
        conditions.push("pedidos.pedido_cliente LIKE ?");
        params.push(`%${cliente}%`);
    }

    if(estado){
        conditions.push("ventas.venta_estado = ?");
        params.push(estado);
    }

    if (conditions.length > 0){
        query += " WHERE " + conditions.join(" AND ");
    }

    query += " GROUP BY ventas.pk_venta";

    connection.query(query, params,(error,results) => {
        if(error){
            console.error("Error al obtener los reportes: ", error);
            response.status(500).json({ error: "Error interno del servidor"})
        }else{
            response.status(200).json(results);
        }
    });
};

const getProductosBajoStock = (request, response) => {
    connection.query(
        "SELECT pk_productos, producto_nombre, producto_stock, producto_minimo_stock FROM productos WHERE producto_stock <= producto_minimo_stock",
        (error, results) => {
            if (error) {
                console.error("Error al obtener productos con bajo stock: ", error);
                response.status(500).json({ error: "Error interno del servidor." });
            } else {
                response.status(200).json(results);
            }
        }
    );
};

const getPlatillosMasVendidos = (request, response) => {
    connection.query(
        `SELECT p.platillo_nombre, SUM(pp.pedido_platillo_cantidad) AS total_vendidos
         FROM pedidos_platillos pp
         JOIN platillos p ON pp.fk_platillo = p.pk_platillo
         GROUP BY p.platillo_nombre
         ORDER BY total_vendidos DESC
         LIMIT 10`,
        (error, results) => {
            if (error) {
                console.error("Error al obtener platillos más vendidos: ", error);
                response.status(500).json({ error: "Error interno del servidor." });
            } else {
                response.status(200).json(results);
            }
        }
    );
};


module.exports = { getReportes, getProductosBajoStock, getPlatillosMasVendidos };