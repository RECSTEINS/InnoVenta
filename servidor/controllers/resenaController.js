
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

module.exports = {getResenas};