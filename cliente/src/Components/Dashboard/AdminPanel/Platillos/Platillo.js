import DataTable from 'react-data-table-component';
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
        console.log("Datos recibidos: ", data);
        setPlatillos(data);
        setFilteredPlatillos(data);
    }

    const columns = [
        {
            name:'ID',
            selector: row => row.id,
        },
        {
            name:'Nombre del platillo',
            selector: row => row.nombre,
            center: true,
            width: '225px'
        },
        {
            name:'Precio',
            selector: row => row.precio,
            width: '70px'
        },
        {
            name: 'Productos',
            selector: row =>
                Array.isArray(row.productos) ? row.productos.map(producto => producto.nombre_producto).join(', ') : 'Sin productos',
            center: true,
        },
        {
            name: 'Opciones',
            cell: row => (
                <div style={{ display:'flex', gap:'10px'}}>
                    <button
                        className='edit-btn-button'
                        onClick={""}
                    >
                        Editar
                    </button>
                    <button
                        className='delete-btn-button'
                        onClick={""}
                    >
                        Eliminar
                    </button>
                </div>
            ),
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            width: '260px'
        },
    ]

    useEffect(() => {
        showData();
    }, []);

    return(
        <div className='platillos-panel'>
            {!mostrarAddPlatillo ? (
                <>
                    <div className='header-platillo'>
                        <h2 className='titulo-dashboard-panel'>Lista de platillos</h2>
                        <button
                            className='add-btn-button'
                            onClick={() => setMostrarAddPlatillo(true)}
                        >
                            Agregar nuevo platillo
                        </button>
                    </div>
                    <DataTable
                        columns={columns}
                        data={filteredPlatillos.length > 0 ? filteredPlatillos : []}
                        pagination
                        highlightOnHover
                        responsive
                        customStyles={{
                            headRow: { style: {borderTopLeftRadius:'20px', borderTopRightRadius:'20px', border: 'none'}},
                            table: { style:{ border:'1.5px #070C33 solid', height: '450px', borderRadius: '20px', backgroundColor: '#070C33'}},
                            headCells: {style:{ backgroundColor:'#FFFFF', color:'#00000', fontWeight: '700', fontFamily:'Roboto', fontSize: '12px'}},  
                        }}
                    />
                </>
            ) : (
                <div className='agregar-platillo-panel'>

                </div>
            )}
        </div>
    )
}

export default PlatillosPanel;