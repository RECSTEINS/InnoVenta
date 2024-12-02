import { useEffect, useState } from 'react';
import './css_Usuario/Usuario.css';
import AgregarUsuario from './AgregarUsuario';

import DataTable from 'react-data-table-component';

function UsuariosPanel(){

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [mostrarAddUsuario, setMostrarAddUsuario] = useState(false);

    const URL = 'http://localhost:7777/getUsuarios'

    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
    }

    const columns = [
        {
            name: 'Usuario',
            selector: row => row.usuario_nombre,
            sortable: true
        },
        {
            name: 'Nombre',
            selector: row => row.empleado,
            sortable: true
        },
        {
            name: 'Puesto',
            selector: row => row.rol,
            sortable: true
        },
        {
            name: 'Activo',
            selector: row => (
                <>
                    {row.usuario_activo == 1 && (
                        <a>Activo</a>
                    )}
                </>
            ),
            sortable: true
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
    ];

    useEffect(() => {
        showData();
    }, [users]);


    return(
        <div className='usuarios-panel'>
            {!mostrarAddUsuario ? (
                <>
                    <div className='header-usuario'>
                        <h2 className='titulo-dashboard-panel'>Usuarios</h2>
                        <button
                            className='add-btn-button'
                            onClick={() => setMostrarAddUsuario(true)}
                        >
                            Agregar usuario
                        </button>
                    </div>
                    <DataTable
                        columns={columns}
                        data={filteredUsers}
                        paginationPerPage={10}
                        highlightOnHover
                        responsive
                        pagination
                        customStyles={{
                            headRow: { style: {borderTopLeftRadius:'20px', borderTopRightRadius:'20px', border: 'none'}},
                            table: { style:{ border:'1.5px #070C33 solid', height: '450px', borderRadius: '20px', backgroundColor: '#070C33'}},
                            headCells: {style:{ backgroundColor:'#FFFFF', color:'#00000', fontWeight: '700', fontFamily:'Roboto', fontSize: '12px'}},  
                        }}
                    />
                </>
            ) : (
                <div>
                    <AgregarUsuario onRegresar={() => setMostrarAddUsuario(false)} />
                </div>
            )}
        </div>
    )
}

export default UsuariosPanel;