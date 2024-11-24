import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
import './css/Resenas.css'
import card1 from '../../Assets/Img_Home/card1-nueva.png';
import card2 from '../../Assets/Img_Home/card2-nueva.png';
import card3 from '../../Assets/Img_Home/card3-nueva.png';
import card4 from '../../Assets/Img_Home/card4-nueva.png';
import card5 from '../../Assets/Img_Home/card5-nueva.png';
import card6 from '../../Assets/Img_Home/card6-nueva.jpg';

import card1mobile from '../../Assets/Img_Home/card1-mobile.png';
import card2mobile from '../../Assets/Img_Home/card2-mobile.png';
import card3mobile from '../../Assets/Img_Home/card3-mobile.png';
import card4mobile from '../../Assets/Img_Home/card4-mobile.png';
import card5mobile from '../../Assets/Img_Home/card5-mobile.png';
import card6mobile from '../../Assets/Img_Home/card6-mobile.jpg';
 
function Resenas(){
    return(
        <div class="fondo-resenas">
            <h2 class="section-title-resenas">Lea las reseñas que han dejado los usuarios del sistema InnoVenta</h2>
                <div class="row">
        
                <div class="col-md-4 col-12 d-none d-md-block">
                    <div class="review-card">
                        <div class="ajustes-card">
                            <img src={card1} alt="Foto de Alejandra Hernandez"/>
                            <p class="name-card">Paola Reyes</p>
                            <div class="stars">★★★★★</div>
                            <p class="text-card-reseña d-none d-md-block">Dueña y administradora del restaurante Rosa Negra</p>
                        </div>
                    </div>
                    <div class="d-grid gap-2 btn-mas card-pie-resenas">
                        <p class="color-btn">Más información</p>
                    </div>
                </div>

                <div class="d-flex justify-content-center align-items-center d-md-none prueba-mobile">
                    <div class="custom-card">
                        <img src={card1mobile} alt="Profile"/>
                        <p class="name-card-mobile-1">Paola Reyes</p>
                        <div class="star-rating">★★★★★</div>
                        <button class="info-button-mobile">Más información</button>
                    </div>
                </div>

                
        
                <div class="col-md-4  d-none d-md-block">
                    <div class="review-card">
                        <div class="ajustes-card">
                            <img src={card2} alt="Foto de Raúl Gonzáles"/>
                            <p class="name-card">Raúl Gonzáles</p>
                            <div class="stars">★★★★<span class="star-off">★</span></div>
                            <p class="text-card-reseña d-none d-md-block">Dueño y administrador del restaurante Sabores del mar</p>
                        </div>
                        <div class="d-grid gap-2 btn-mas card-pie-resenas">
                            <p class="color-btn">Más información</p>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-center align-items-center d-md-none prueba-mobile">
                    <div class="custom-card">
                        <img src={card2mobile} alt="Profile"/>
                        <p class="name-card-mobile-2">Raúl Gonzáles</p>
                        <div class="star-rating">★★★★<span class="star-off">★</span></div>
                        <button class="info-button-mobile">Más información</button>
                    </div>
                </div>

                <div class="col-md-4  d-none d-md-block">
                    <div class="review-card">
                        <div class="ajustes-card">
                            <img src={card3} alt="Foto de Mario y Rafael Suarez"/>
                            <p class="name-card">Mario y Rafael Suarez</p>
                            <div class="stars">★★★★★</div>
                            <p class="text-card-reseña d-none d-md-block">Dueños y administradores del restaurante Brother's Suarez</p>
                        </div>
                        <div class="d-grid gap-2 btn-mas card-pie-resenas">
                            <p class="color-btn">Más información</p>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-center align-items-center d-md-none prueba-mobile">
                    <div class="custom-card">
                        <img src={card3mobile} alt="Profile"/>
                        <p class="name-card-mobile-3">Mario y Rafael Suarez</p>
                        <div class="star-rating">★★★★★</div>
                        <button class="info-button-mobile">Más información</button>
                    </div>
                </div>

                

                <div class="col-md-4  d-none d-md-block">
                    <div class="review-card">
                        <div class="ajustes-card">
                            <img src={card4} alt="Foto de Chris Jones"/>
                            <p class="name-card">Chris Jones</p>
                            <div class="stars">★★★★<span class="star-off">★</span></div>
                            <p class="text-card-reseña d-none d-md-block">Dueño y administrador del restaurante Kaajal</p>
                        </div>
                        <div class="d-grid gap-2 btn-mas card-pie-resenas">
                            <p class="color-btn">Más información</p>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-center align-items-center d-md-none prueba-mobile">
                    <div class="custom-card">
                        <img src={card4mobile} alt="Profile"/>
                        <p class="name-card-mobile-4">Chris Jones</p>
                        <div class="star-rating">★★★★<span class="star-off">★</span></div>
                        <button class="info-button-mobile">Más información</button>
                    </div>
                </div>
        
                <div class="col-md-4  d-none d-md-block">
                    <div class="review-card">
                        <div class="ajustes-card">
                            <img src={card5} alt="Foto de Michael Williams"/>
                            <p class="name-card">Michael Williams</p>
                            <div class="stars">★★★★★</div>
                            <p class="text-card-reseña d-none d-md-block">Dueño y administrador del restaurante Rio’s</p>
                        </div>
                        <div class="d-grid gap-2 btn-mas card-pie-resenas">
                            <p class="color-btn">Más información</p>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-center align-items-center d-md-none prueba-mobile">
                    <div class="custom-card">
                        <img src={card5mobile} alt="Profile"/>
                        <p class="name-card-mobile">Michael Williams</p>
                        <div class="star-rating">★★★★★</div>
                        <button class="info-button-mobile">Más información</button>
                    </div>
                </div>


                <div class="col-md-4  d-none d-md-block">
                    <div class="review-card">
                        <div class="ajustes-card">
                            <img src={card6} alt="Foto de Ana Martinez"/>
                            <p class="name-card">Ana Martinez</p>
                            <div class="stars">★★★★★</div>
                            <p class="text-card-reseña d-none d-md-block">Dueña y administradora del restaurante Tarasira</p>                            
                        </div>
                        <div class="d-grid gap-2 btn-mas card-pie-resenas">
                            <p class="color-btn">Más información</p>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-center align-items-center d-md-none">
                    <div class="custom-card">
                        <img src={card6mobile} alt="Profile"/>
                        <p class="name-card-mobile-2">Ana Martinez</p>
                        <div class="star-rating">★★★★★</div>
                        <button class="info-button-mobile">Más información</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resenas;