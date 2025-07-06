import React from "react";
import { Link } from "react-router-dom"; // si usas react-router

const Cancel = () => {
  return (
    <div style={styles.container}>
      <h1 style={{ color: "red" }}>Pago cancelado ❌</h1>
      <p>
        Parece que cancelaste el proceso de pago. Si quieres, puedes intentarlo
        nuevamente.
      </p>
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
    backgroundColor: "#f44336",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
  },
};

export default Cancel;
