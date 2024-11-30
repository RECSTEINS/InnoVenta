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
            name: 'Opciones',
            selector: row => <button className='editUsuario' onClick={""}></button>
        },
        {
            name: "",
            selector: row => <button className='deletUsuario' onClick={""}></button>
        }
    ];

    useEffect(() => {
        showData();
    }, [users]);


    return(
        <div>
            {!mostrarAddUsuario ? (
                <>
                    <h2>Usuarios</h2>
                    <button
                        className=''
                        onClick={() => setMostrarAddUsuario(true)}
                    >
                        Agregar usuario
                    </button>
                    <DataTable
                        columns={columns}
                        data={filteredUsers}
                        paginationPerPage={10}
                        pagination
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