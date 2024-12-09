import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./css/Demo.css";
import imagen3 from "../../Assets/Img_Home/Demo.jpg";
import Descuentos from "./Descuentos";

function Demo() {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div className={showModal ? "fondo-demo fondo-oscuro" : "fondo-demo"} id="demo">
            <div className="container">
                <div className="row align-items-center section-container mx-md-3">
                    <div className="col-md-7 col-12 demo-text">
                        <p className="section-title">Innoventa Premium</p>
                        <p className="section-text">
                            Descubre todas las herramientas que optimizan tu restaurante. Accede al inventario en
                            tiempo real, ventas simuladas y reportes básicos con nuestra demo.
                        </p>
            
                        <button className="btn btn-demo" onClick={handleShow}>
                            Solicita una demo
                        </button>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-4 image-section">
                        <img src={imagen3} alt="Imagen de demo" />
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal 
                show={showModal} 
                onHide={handleClose} 
                size="lg" 
                centered
                backdrop={true} 
                className="custom-modal-demo"
            >
                
                <Descuentos />
            </Modal>
        </div>
    );
}

export default Demo;