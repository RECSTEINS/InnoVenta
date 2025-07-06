import React from "react";
import { Link } from "react-router-dom"; // si usas react-router

const Success = () => {
  return (
    <div style={styles.container}>
      <h1 style={{ color: "green" }}>¡Pago exitoso! 🎉</h1>
      <p>Gracias por tu compra. Tu pago ha sido procesado correctamente.</p>
      <Link to="/" style={styles.button}>
        Volver al inicio
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  button: {
    marginTop: "20px",
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
  },
};

export default Success;
