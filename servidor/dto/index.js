const Joi = require('joi');

// DTOs para Login
const loginDTO = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'El email debe tener un formato válido',
        'any.required': 'El email es obligatorio'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'La contraseña debe tener al menos 6 caracteres',
        'any.required': 'La contraseña es obligatoria'
    })
});

const updatePasswordDTO = Joi.object({
    usuario_nombre: Joi.string().required().messages({
        'any.required': 'El nombre de usuario es obligatorio'
    }),
    nueva_password: Joi.string().min(6).required().messages({
        'string.min': 'La nueva contraseña debe tener al menos 6 caracteres',
        'any.required': 'La nueva contraseña es obligatoria'
    })
});

// DTOs para Usuarios
const createUsuarioDTO = Joi.object({
    nombre: Joi.string().min(2).max(50).required().messages({
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede exceder 50 caracteres',
        'any.required': 'El nombre es obligatorio'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'La contraseña debe tener al menos 6 caracteres',
        'any.required': 'La contraseña es obligatoria'
    }),
    img: Joi.string().optional(),
    fecha_creacion: Joi.date().optional(),
    activo: Joi.boolean().default(true),
    fkrestaurante: Joi.number().integer().required().messages({
        'any.required': 'El restaurante es obligatorio',
        'number.base': 'El ID del restaurante debe ser un número'
    }),
    fkempleado: Joi.number().integer().required().messages({
        'any.required': 'El empleado es obligatorio',
        'number.base': 'El ID del empleado debe ser un número'
    }),
    fkrol: Joi.number().integer().required().messages({
        'any.required': 'El rol es obligatorio',
        'number.base': 'El ID del rol debe ser un número'
    }),
    action: Joi.string().valid('insert', 'update').required()
});

const updateUsuarioDTO = Joi.object({
    nombre: Joi.string().min(2).max(50).optional(),
    password: Joi.string().min(6).optional(),
    img: Joi.string().optional(),
    fkrol: Joi.number().integer().optional(),
    fkrestaurante: Joi.number().integer().optional(),
    fkempleado: Joi.number().integer().optional()
});

// DTOs para Empleados
const createEmpleadoDTO = Joi.object({
    empleado_nombre: Joi.string().min(2).max(100).required().messages({
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede exceder 100 caracteres',
        'any.required': 'El nombre es obligatorio'
    }),
    empleado_email: Joi.string().email().required().messages({
        'string.email': 'El email debe tener un formato válido',
        'any.required': 'El email es obligatorio'
    }),
    empleado_telefono: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional().messages({
        'string.pattern.base': 'El teléfono debe tener un formato válido'
    }),
    empleado_direccion: Joi.string().max(200).optional(),
    fk_restaurante: Joi.number().integer().required().messages({
        'any.required': 'El restaurante es obligatorio',
        'number.base': 'El ID del restaurante debe ser un número'
    })
});

const updateEmpleadoDTO = Joi.object({
    empleado_nombre: Joi.string().min(2).max(100).optional(),
    empleado_email: Joi.string().email().optional(),
    empleado_telefono: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional(),
    empleado_direccion: Joi.string().max(200).optional(),
    fk_restaurante: Joi.number().integer().optional()
});

// DTOs para Restaurantes
const createRestauranteDTO = Joi.object({
    restaunrate_nombre: Joi.string().min(2).max(100).required().messages({
        'string.min': 'El nombre del restaurante debe tener al menos 2 caracteres',
        'string.max': 'El nombre del restaurante no puede exceder 100 caracteres',
        'any.required': 'El nombre del restaurante es obligatorio'
    }),
    restaurante_direccion: Joi.string().max(200).required().messages({
        'string.max': 'La dirección no puede exceder 200 caracteres',
        'any.required': 'La dirección es obligatoria'
    }),
    restaurante_telefono: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional(),
    restaurante_email: Joi.string().email().optional()
});

const updateRestauranteDTO = Joi.object({
    restaunrate_nombre: Joi.string().min(2).max(100).optional(),
    restaurante_direccion: Joi.string().max(200).optional(),
    restaurante_telefono: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional(),
    restaurante_email: Joi.string().email().optional()
});

// DTOs para Productos/Inventario
const createProductoDTO = Joi.object({
    producto_nombre: Joi.string().min(2).max(100).required().messages({
        'string.min': 'El nombre del producto debe tener al menos 2 caracteres',
        'string.max': 'El nombre del producto no puede exceder 100 caracteres',
        'any.required': 'El nombre del producto es obligatorio'
    }),
    producto_descripcion: Joi.string().max(500).optional(),
    producto_precio: Joi.number().positive().required().messages({
        'number.positive': 'El precio debe ser un número positivo',
        'any.required': 'El precio es obligatorio'
    }),
    producto_stock: Joi.number().integer().min(0).required().messages({
        'number.min': 'El stock no puede ser negativo',
        'number.base': 'El stock debe ser un número entero',
        'any.required': 'El stock es obligatorio'
    }),
    fk_categoria: Joi.number().integer().required().messages({
        'any.required': 'La categoría es obligatoria',
        'number.base': 'El ID de la categoría debe ser un número'
    }),
    fk_restaurante: Joi.number().integer().required().messages({
        'any.required': 'El restaurante es obligatorio',
        'number.base': 'El ID del restaurante debe ser un número'
    })
});

const updateProductoDTO = Joi.object({
    producto_nombre: Joi.string().min(2).max(100).optional(),
    producto_descripcion: Joi.string().max(500).optional(),
    producto_precio: Joi.number().positive().optional(),
    producto_stock: Joi.number().integer().min(0).optional(),
    fk_categoria: Joi.number().integer().optional(),
    fk_restaurante: Joi.number().integer().optional()
});

// DTOs para Platillos
const createPlatilloDTO = Joi.object({
    platillo_nombre: Joi.string().min(2).max(100).required().messages({
        'string.min': 'El nombre del platillo debe tener al menos 2 caracteres',
        'string.max': 'El nombre del platillo no puede exceder 100 caracteres',
        'any.required': 'El nombre del platillo es obligatorio'
    }),
    platillo_descripcion: Joi.string().max(500).optional(),
    platillo_precio: Joi.number().positive().required().messages({
        'number.positive': 'El precio debe ser un número positivo',
        'any.required': 'El precio es obligatorio'
    }),
    platillo_imagen: Joi.string().optional(),
    fk_categoria: Joi.number().integer().required().messages({
        'any.required': 'La categoría es obligatoria',
        'number.base': 'El ID de la categoría debe ser un número'
    }),
    fk_restaurante: Joi.number().integer().required().messages({
        'any.required': 'El restaurante es obligatorio',
        'number.base': 'El ID del restaurante debe ser un número'
    })
});

const updatePlatilloDTO = Joi.object({
    platillo_nombre: Joi.string().min(2).max(100).optional(),
    platillo_descripcion: Joi.string().max(500).optional(),
    platillo_precio: Joi.number().positive().optional(),
    platillo_imagen: Joi.string().optional(),
    fk_categoria: Joi.number().integer().optional(),
    fk_restaurante: Joi.number().integer().optional()
});

// DTOs para Pedidos
const createPedidoDTO = Joi.object({
    pedido_total: Joi.number().positive().required().messages({
        'number.positive': 'El total debe ser un número positivo',
        'any.required': 'El total es obligatorio'
    }),
    pedido_estado: Joi.string().valid('pendiente', 'en_proceso', 'listo', 'entregado', 'cancelado').default('pendiente'),
    fk_mesa: Joi.number().integer().optional(),
    fk_restaurante: Joi.number().integer().required().messages({
        'any.required': 'El restaurante es obligatorio',
        'number.base': 'El ID del restaurante debe ser un número'
    }),
    items: Joi.array().items(Joi.object({
        fk_platillo: Joi.number().integer().required(),
        cantidad: Joi.number().integer().min(1).required(),
        precio_unitario: Joi.number().positive().required()
    })).min(1).required().messages({
        'array.min': 'El pedido debe tener al menos un item',
        'any.required': 'Los items del pedido son obligatorios'
    })
});

const updatePedidoEstadoDTO = Joi.object({
    estado: Joi.string().valid('pendiente', 'en_proceso', 'listo', 'entregado', 'cancelado').required().messages({
        'any.required': 'El estado es obligatorio',
        'any.only': 'El estado debe ser uno de: pendiente, en_proceso, listo, entregado, cancelado'
    })
});

// DTOs para Categorías
const createCategoriaDTO = Joi.object({
    categoria_nombre: Joi.string().min(2).max(50).required().messages({
        'string.min': 'El nombre de la categoría debe tener al menos 2 caracteres',
        'string.max': 'El nombre de la categoría no puede exceder 50 caracteres',
        'any.required': 'El nombre de la categoría es obligatorio'
    }),
    categoria_descripcion: Joi.string().max(200).optional(),
    fk_restaurante: Joi.number().integer().required().messages({
        'any.required': 'El restaurante es obligatorio',
        'number.base': 'El ID del restaurante debe ser un número'
    })
});

// DTOs para Reportes
const reporteDTO = Joi.object({
    fecha_inicio: Joi.date().required().messages({
        'any.required': 'La fecha de inicio es obligatoria'
    }),
    fecha_fin: Joi.date().min(Joi.ref('fecha_inicio')).required().messages({
        'any.required': 'La fecha de fin es obligatoria',
        'date.min': 'La fecha de fin debe ser posterior a la fecha de inicio'
    }),
    fk_restaurante: Joi.number().integer().required().messages({
        'any.required': 'El restaurante es obligatorio',
        'number.base': 'El ID del restaurante debe ser un número'
    })
});

module.exports = {
    // Login DTOs
    loginDTO,
    updatePasswordDTO,
    
    // Usuario DTOs
    createUsuarioDTO,
    updateUsuarioDTO,
    
    // Empleado DTOs
    createEmpleadoDTO,
    updateEmpleadoDTO,
    
    // Restaurante DTOs
    createRestauranteDTO,
    updateRestauranteDTO,
    
    // Producto/Inventario DTOs
    createProductoDTO,
    updateProductoDTO,
    
    // Platillo DTOs
    createPlatilloDTO,
    updatePlatilloDTO,
    
    // Pedido DTOs
    createPedidoDTO,
    updatePedidoEstadoDTO,
    
    // Categoría DTOs
    createCategoriaDTO,
    
    // Reporte DTOs
    reporteDTO
}; 