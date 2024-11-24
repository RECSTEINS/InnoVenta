import './css/Brindamos.css';
import React, {useState} from 'react';
import { Carousel, Card, Row, Col, Button } from 'react-bootstrap';
import imagen8 from '../../Assets/Img_Home/imagen17.png';
import imagen9 from '../../Assets/Img_Home/imagen19.png'

const Brindamos = () => {

    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? 1 : prevIndex - 1));
  };

    return (
        <div className='fondo-beneficios'>
            <div className="container text-center my-5 position-relative mx-5">
            

            <Carousel activeIndex={index} onSelect={handleSelect} controls={false} indicators={false} className="my-4 carousel">
                
                <Carousel.Item>
                    <Row className="justify-content-center mx-3 ">
                        <Col md={5}>
                            <Card className="styled-card mb-3">
                                <Card.Img variant="top" src={imagen8} className='circle-imagen-1'  alt="Card image 1" />
                                <Card.Body>
                                    <Card.Title>Calidad Garantizada</Card.Title>
                                    <Card.Text>El sistema proporciona todas las herramientas necesarias para realizar el trabajo necesario.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={5}>
                            <Card className="styled-card mb-3">
                                <Card.Img variant="top" src={imagen9} className='circle-imagen-2' alt="Card image 2" />
                                <Card.Body>
                                    <Card.Title>Servicio al cliente</Card.Title>
                                    <Card.Text>Se le brinda un servicio de apoyo y ajustes personalizado al cliente.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Carousel.Item>

        
                <Carousel.Item>
                    <Row className="justify-content-center mx-3">
                        <Col md={5}>
                            <Card className="styled-card mb-3">
                                <Card.Img variant="top" className='circle-imagen-3'  />
                                <Card.Body>
                                    <Card.Title>Actualizaciones Constantes</Card.Title>
                                    <Card.Text>Mantenemos el sistema actualizado con las últimas mejoras y características.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={5}>
                            <Card className="styled-card mb-3">
                                <Card.Img variant="top" className='circle-imagen-4' />
                                <Card.Body>
                                    <Card.Title>Soporte Técnico</Card.Title>
                                    <Card.Text>Brindamos soporte técnico 24/7 para asegurar que todo funcione correctamente.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Carousel.Item>
            </Carousel>

            <div class="row  mt-5">
                <div class="col-12">
                    <a href="#" class="discount-cont2 text-start">Contáctanos</a>
                    <a href="#" class="discount-cont2 text-end">Conoce Todos Nuestros Descuentos</a>
                </div>
            </div>

      
            
            <Button
            variant="primary"
            onClick={prevSlide}
            className="position-absolute top-50 translate-middle-y start-0"
            style={{ zIndex: 1 }}
            ><i class="bi bi-caret-left-fill"></i></Button>

            <Button
                variant="primary"
                onClick={nextSlide}
                className="position-absolute top-50 translate-middle-y end-0"
            style={{ zIndex: 1 }}
            >
            <i class="bi bi-caret-right-fill"></i>
            </Button>
        </div>
    </div>
        
    );
  };

export default Brindamos;