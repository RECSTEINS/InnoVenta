import './css_Platillos/platillo.css'
import React, { useEffect, useState } from 'react';

function PlatillosPanel(){
    

    const [platillos, setPlatillos] = useState([]);
    const [filteredPlatillos, setFilteredPlatillos] = useState([]);
    const [mostrarAddPlatillo, setMostrarAddPlatillo] = useState(false);

    const URL = 'http://localhost:7777/getPlatillos'

    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setPlatillos(data);
        setFilteredPlatillos(data);
    }

    const columns = [

    ]

    useEffect(() => {
        showData();
    }, [platillos]);

    return(
        <div>
            Hola, este es el futuro panel de platillos.
        </div>
    )
}

export default PlatillosPanel;