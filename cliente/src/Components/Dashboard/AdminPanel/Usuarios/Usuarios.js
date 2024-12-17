import { useEffect, useState } from 'react';
import './css_Usuario/Usuario.css';
import AgregarUsuario from './AgregarUsuario';
import EditarUsuario from './EditarUsuario'; // Importar EditarUsuario
import ClientAxios from "../../../../Config/axios";
import DataTable from 'react-data-table-component';
import Swal from "sweetalert2";

function UsuariosPanel() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [mostrarAddUsuario, setMostrarAddUsuario] = useState(false);
    const [mostrarEditarUsuario, setMostrarEditarUsuario] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const URL = 'http://localhost:7777/getUsuarios';

    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
    };

    const handleEditarUsuario = (usuario) => {
        setUsuarioSeleccionado(usuario); // Pasar el objeto completo
        setMostrarEditarUsuario(true);
    };

    const deletEmpleado = async (id) => {
        try {
            await ClientAxios.delete(`/delUsuario/${id}`);
            setUsers((prevUsers) => prevUsers.filter((row) => row.pk_usuario !== id));
            showData();
        } catch (error) {
            console.error("Error al eliminar el Usuario: ", error);
            alert("Error al eliminar el Usuario");
        }
    };

    const mostrarAlerta = (id) => {
        Swal.fire({
            title: "Advertencia",
            text: "¿Está seguro que desea eliminar este usuario?",
            icon: "warning",
            confirmButtonText: "Aceptar",
            showCancelButton: true,
            cancelButtonColor: "Red",
            cancelButtonText: "Cancelar",
        }).then((response) => {
            if (response.isConfirmed) {
                deletEmpleado(id);
                Swal.fire("Éxito", "El usuario se eliminó correctamente.", "success");
            }
        });
    };

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
            cell: row => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className='edit-btn-button'
                        onClick={() => handleEditarUsuario(row)}
                    >
                        Editar
                    </button>
                    <button
                        className='delete-btn-button'
                        onClick={() => mostrarAlerta(row.pk_usuario)}
                    >
                        Eliminar
                    </button>
                </div>
            ),
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            width: '360px'
        },
    ];

    useEffect(() => {
        showData();
    }, []);

    return (
        <div className='usuarios-panel'>
            {mostrarAddUsuario ? (
                <AgregarUsuario onRegresar={() => setMostrarAddUsuario(false)} />
            ) : mostrarEditarUsuario ? (
                <EditarUsuario
                    usuarioSeleccionado={usuarioSeleccionado}
                    onRegresar={() => setMostrarEditarUsuario(false)}
                />
            ) : (
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
                            headRow: { style: { borderTopLeftRadius: '20px', borderTopRightRadius: '20px', border: 'none' } },
                            table: { style: { border: '1.5px #070C33 solid', height: '800px', borderRadius: '20px', backgroundColor: '#070C33' } },
                            headCells: { style: { backgroundColor: '#FFFFF', color: '#00000', fontWeight: '700', fontFamily: 'Roboto', fontSize: '24px' } },
                            rows: { style: { fontSize: '24px', fontWeight: '400', fontFamily: 'Roboto', paddingTop: '16px', paddingBottom: '16px' } }
                        }}
                    />
                </>
            )}
        </div>
    );
}

export default UsuariosPanel;
