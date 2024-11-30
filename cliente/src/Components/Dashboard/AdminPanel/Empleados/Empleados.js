import ClientAxios from "../../../../Config/axios";
import React, { useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import AgregarEmpleado from "./AgregarEmpleado";
import './css_Empleado/Empleado.css';

function EmpleadosPanel(){
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [mostrarAddEmpleado, setMostrarAddEmpleado] = useState(false);

    const URL = 'http://localhost:7777/getEmpleados'

    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
    }

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.empleado_nombre,
            sortable: true
        },
        {
            name: 'Apellido',
            selector: row => row.empleado_apellido
        },
        {
            name: 'Correo',
            selector: row => row.empleado_email
        },
        {
            name: 'Estado',
            selector: row => row.empleado_activo
        },
        {
            name: 'Acciones',
            cell: row => <button className="editEmpleado" onClick={""}><ion-icon name="pencil-outline"></ion-icon></button>
        },
        {
            name: '',
            cell: row => <button className="deletEmpleado" onClick={""}><ion-icon name="trash-outline"></ion-icon></button>
        }
    ];

    useEffect(() => {
        showData();
    }, [users]);

    return(
        <div className="empleado">
            {!mostrarAddEmpleado ? (
                <>
                    <h2>Empleados</h2>
                    <button
                        className="adaptive-button"
                        onClick={() => setMostrarAddEmpleado(true)}
                    >
                        <ion-icon name="person-add-outline"></ion-icon>
                        Nuevo empleado
                    </button>
                    <DataTable
                        columns={columns}
                        data={filteredUsers}
                        paginationPerPage={7}
                        pagination
                    />
                </>
            ) : (
                <div className="agregar-empleado-panel">
                    <AgregarEmpleado onRegresar={() => setMostrarAddEmpleado(false)}/>   
                </div>
            )}
        </div>
    )
}

export default EmpleadosPanel;