import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ClientAxios from "../../../../Config/axios";

function EditarProducto({ productoPk, onRegresar }) {
    const [formData, setFormData] = useState({
        nombre: "",
        stock: "",
        stock_minimo: "",
    });

    useEffect(() => {
        if (productoPk) {
            setFormData({
                nombre: productoPk.producto_nombre || "",
                stock: productoPk.producto_stock || "",
                stock_minimo: productoPk.producto_minimo_stock || "",
            });
        }
        console.log("Producto cargado en EditarProducto:", productoPk);
    }, [productoPk]);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ClientAxios.post(`/updateProducto/${productoPk.pk_productos}`, formData);
            Swal.fire("Éxito", "Producto actualizado correctamente.", "success");
            onRegresar();
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            Swal.fire("Error", "Hubo un problema al actualizar el producto.", "error");
        }
    };

    if (!productoPk) {
        return <p>Cargando datos del producto...</p>;
    }

    return (
        <section className="panel">
            <form
                className="formulario"
                onSubmit={handleSubmit}
                style={{ borderRadius: "24px" }}
            >
                <div className="caja-informacion separacion-cajaI-cajaB">
                    <div className="caja-titulo margen-vertical">
                        <p className="Titulo">Información del producto</p>
                    </div>
                    <div className="caja-grandes margen-vertical">
                        <div className="label-grande">
                            <label className="estilo-label">Nombre del producto:</label>
                        </div>
                        <input
                            type="text"
                            className="estilo-input input-grande"
                            id="nombre"
                            name="nombre" // Atributo agregado
                            value={formData.nombre}
                            onChange={handleChanges}
                        />
                    </div>
                    <div className="caja-medianos margen-vertical">
                        <div className="margen-horizontal">
                            <div className="label-mediano margen-entre-medianas">
                                <label className="estilo-label">Stock entrante:</label>
                            </div>
                            <input
                                type="number"
                                min="0"
                                id="stock"
                                name="stock" // Atributo agregado
                                step="1"
                                className="estilo-input input-mediano"
                                value={formData.stock}
                                onChange={handleChanges}
                            />
                        </div>
                        <div>
                            <div className="label-mediano margen-entre-medianas">
                                <label className="estilo-label">Stock mínimo:</label>
                            </div>
                            <input
                                type="number"
                                id="stock_minimo"
                                name="stock_minimo" // Atributo agregado
                                min="0"
                                max="100"
                                step="1"
                                className="estilo-input input-mediano"
                                value={formData.stock_minimo}
                                onChange={handleChanges}
                            />
                        </div>
                    </div>
                </div>
                <div className="caja-botones">
                    <div className="caja-boton separacion-botones">
                        <button
                            type="button"
                            className="boton-regresar"
                            onClick={onRegresar}
                        >
                            Regresar
                        </button>
                    </div>
                    <div className="caja-boton">
                        <button
                            type="submit"
                            value="Ingresa"
                            className="boton-ingresar"
                        >
                            Ingresar datos
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default EditarProducto;
