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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const URL = 'http://localhost:7777/getUsuarios';

    const showData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await ClientAxios.get('/getUsuarios');
            console.log('Usuarios response:', response.data);
            
            // Asegurar que data sea un array
            const data = Array.isArray(response.data) ? response.data : [];
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            setError('Error al cargar usuarios');
            // Si hay error, establecer arrays vacíos para evitar el error de slice
            setUsers([]);
            setFilteredUsers([]);
        } finally {
            setLoading(false);
        }
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
                    {loading ? (
                        <div className="text-center p-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-2">Cargando usuarios...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center p-4">
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                            <button 
                                className="btn btn-primary" 
                                onClick={showData}
                            >
                                Reintentar
                            </button>
                        </div>
                    ) : (
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
                    )}
                </>
            )}
        </div>
    );
}

export default UsuariosPanel;
