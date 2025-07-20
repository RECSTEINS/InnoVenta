
const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();
const {connection}= require ("../config/config.db");
// Obtener todas las reseñas
const getResenas= (request, response) => {
  connection.query("SELECT * FROM reseñas",
  (error,results)=>{
      if(error)
      throw error;
  response.status(200).json(results);
  });
};

const postResena = (request, response) => {
  const { nombre, rol, restaurante, calificacion, foto_url } = request.body;
  if (!nombre || !rol || !restaurante || !calificacion || !foto_url) {
    return response.status(400).json({ error: "Faltan datos obligatorios" });
  }
  connection.query(
    "INSERT INTO reseñas (nombre, rol, restaurante, calificacion, foto_url) VALUES (?, ?, ?, ?, ?)",
    [nombre, rol, restaurante, calificacion, foto_url],
    (error, results) => {
      if (error) throw error;
      response.status(201).json({ message: "Reseña creada correctamente", id: results.insertId });
    }
  );
};

const deleteResena = (request, response) => {
  const { id } = request.params;
  connection.query(
    "DELETE FROM reseñas WHERE id = ?",
    [id],
    (error, results) => {
      if (error) throw error;
      if (results.affectedRows === 0) {
        return response.status(404).json({ error: "Reseña no encontrada" });
      }
      response.status(200).json({ message: "Reseña eliminada correctamente" });
    }
  );
};

const updateResena = (request, response) => {
  const { id } = request.params;
  const { nombre, rol, restaurante, calificacion, foto_url } = request.body;
  connection.query(
    "UPDATE reseñas SET nombre = ?, rol = ?, restaurante = ?, calificacion = ?, foto_url = ? WHERE id = ?",
    [nombre, rol, restaurante, calificacion, foto_url, id],
    (error, results) => {
      if (error) throw error;
      if (results.affectedRows === 0) {
        return response.status(404).json({ error: "Reseña no encontrada" });
      }
      response.status(200).json({ message: "Reseña actualizada correctamente" });
    }
  );
};

module.exports = { getResenas, postResena, deleteResena, updateResena };