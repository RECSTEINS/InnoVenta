import DataTable from 'react-data-table-component';
import './css_Platillos/platillo.css'
import React, { useEffect, useState } from 'react';
import AgregarPlatillo from './AgregarPlatillo';
import ClientAxios from '../../../../Config/axios';
import Swal from 'sweetalert2';
import EditarPlatillo from './EditarPlatillo';
import { Dropdown, DropdownButton} from 'react-bootstrap';

function PlatillosPanel(){
    
    const [mostrarEditarPlatillo, setMostrarEditarPlatillo] = useState(false);
    const [editarPlatilloId, setEditarPlatilloId] = useState(null);
    const [platillos, setPlatillos] = useState([]);
    const [filteredPlatillos, setFilteredPlatillos] = useState([]);
    const [mostrarAddPlatillo, setMostrarAddPlatillo] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState([
        'Nombre',
        'Precio',
        'Imagen',
        'Productos',
        'Opciones'
    ]);

    const URL = 'http://localhost:7777/getPlatillos'

    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        console.log("Datos recibidos: ", data);
        setPlatillos(data);
        setFilteredPlatillos(data);
    }

    const deletePlatillo = async (id) => {
        try {
            if (!id) {
                console.error("El ID es undefined");
                return;
            }
            await ClientAxios.delete(`http://localhost:7777/eliminar-platillo/${id}`);
            setPlatillos((prevPlatillos) => prevPlatillos.filter((row) => row.pk_platillo !== id));
            showData();
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            Swal.fire('Error', 'No se pudo eliminar el platillo.', 'error');
        }
    };

    const mostrarAlerta = (id) =>{
        Swal.fire({
            title: 'Advertencia',
            text: '¿Está seguro que desea eliminar este platillo?',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            cancelButtonColor: "Red",
            cancelButtonText: "Cancelar" 
        }).then(response => {
            if(response.isConfirmed){
                deletePlatillo(id);
                Swal.fire('Éxito', 'El platillo se eliminó correctamente.', 'success');
            }
        });
    }

    const allColumns = [
        {
            name:'ID',
            selector: row => row.id,
            width:'90px',
        },
        {
            name:'Nombre del platillo',
            selector: row => row.nombre,
            center: true,
            width: '400px',
            id: "Nombre"
        },
        {
            name:'Precio',
            selector: row => row.precio,
            width: '150px',
            center: true,
            id: 'Precio'
        },
        {
            name: "Imagen",
            cell: row => (
                <img
                    src={`http://localhost:7777${row.img}`}
                    alt={row.nombre}
                    style={{width: '100px', height: '100px', borderRadius: '8px'}}
                />
            ),
            width: '115px',
            center: true,
            id: 'Imagen'
        },
        {
            name: 'Productos',
            selector: row =>
                Array.isArray(row.productos) ? row.productos.map(producto => producto.nombre_producto).join(', ') : 'Sin productos',
            center: true,
            width:'400px',
            id: 'Productos'
        },
        {
            name: 'Opciones',
            cell: row => (
                <div style={{ display:'flex', gap:'10px'}}>
                    <button
                        className='edit-btn-button'
                        onClick={() => {setEditarPlatilloId(row.id);
                                        setMostrarEditarPlatillo(true);
                        }}    
                    >
                        Editar
                    </button>
                    <button
                        className='delete-btn-button'
                        onClick={() => mostrarAlerta(row.id)}
                    >
                        Eliminar
                    </button>
                </div>
            ),
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            id: 'Opciones'
        },
    ];

    const columns = allColumns.filter(column => visibleColumns.includes(column.id));

    const handleColumnToggle = (columnId) => {
        setVisibleColumns(prevState => 
            prevState.includes(columnId)
                ? prevState.filter(col => col !== columnId)
                : [...prevState, columnId] 
        );
        showData();
    };

    useEffect(() => {
        showData();
    }, []);

    return(
        <div className='platillos-panel'>
            {!mostrarAddPlatillo && !mostrarEditarPlatillo? (
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

                    <div className="columnas-btn">
                        <DropdownButton
                            id="dropdown-basic-button"
                            title="Seleccionar columnas"
                            variant="secondary"
                            className="columnas-btns"
                            style={{ marginLeft: "10px"}}
                        >
                        {allColumns.map(col => (
                            <Dropdown.Item key={col.id}>
                                <label className="columnas-btn-contenido">
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns.includes(col.id)}
                                        onChange={() => handleColumnToggle(col.id)}
                                        style={{ marginRight: '5px' }}
                                    />
                                    {col.name}
                                </label>
                            </Dropdown.Item>
                        ))}
                        </DropdownButton>
                    </div>

                    <DataTable
                        columns={columns}
                        data={filteredPlatillos.length > 0 ? filteredPlatillos : []}
                        pagination
                        paginationPerPage={10}
                        highlightOnHover
                        responsive
                        customStyles={{
                            headRow: { style: {borderTopLeftRadius:'20px', borderTopRightRadius:'20px', border: 'none'}},
                            table: { style:{ border:'1.5px #070C33 solid', height: '1382px', borderRadius: '20px', backgroundColor: '#070C33'}},
                            headCells: {style:{ backgroundColor:'#FFFFF', color:'#00000', fontWeight: '700', fontFamily:'Roboto', fontSize: '24px'}},
                            rows:{style: {fontSize:'24px', fontWeight:'400', fontFamily: 'Roboto', paddingTop: '16px', paddingBottom:'16px'}}
                        }}
                    />
                </>
            ) : mostrarAddPlatillo ? (
                <div className='agregar-platillo-panel'>
                    <AgregarPlatillo onRegresar={() => {setMostrarAddPlatillo(false);
                                                        showData();
                                                        }}/>
                </div>
            ) : editarPlatilloId ? (
                <div className='agregar-platillo-panel'>
                    <EditarPlatillo onRegresar={() =>{ setEditarPlatilloId(null);
                                                       setMostrarEditarPlatillo(false);
                                                       showData();}}
                                    platilloId={editarPlatilloId}
                    />
                </div>
            ) : null}
        </div>
    )
}

export default PlatillosPanel;