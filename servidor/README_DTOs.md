# Implementación de DTOs en InnoVenta Backend

## ¿Qué son los DTOs?

Los **DTOs (Data Transfer Objects)** son objetos que definen la estructura de datos que se transfiere entre capas de tu aplicación. En este proyecto, los usamos para:

1. **Validar datos de entrada** antes de procesarlos
2. **Asegurar la integridad** de los datos
3. **Proporcionar mensajes de error claros** al frontend
4. **Documentar** la estructura esperada de los datos

## Estructura Implementada

### 1. DTOs Definidos (`dto/index.js`)

Hemos creado DTOs para todas las entidades principales:

- **Login**: `loginDTO`, `updatePasswordDTO`
- **Usuarios**: `createUsuarioDTO`, `updateUsuarioDTO`
- **Empleados**: `createEmpleadoDTO`, `updateEmpleadoDTO`
- **Restaurantes**: `createRestauranteDTO`, `updateRestauranteDTO`
- **Productos**: `createProductoDTO`, `updateProductoDTO`
- **Platillos**: `createPlatilloDTO`, `updatePlatilloDTO`
- **Pedidos**: `createPedidoDTO`, `updatePedidoEstadoDTO`
- **Categorías**: `createCategoriaDTO`
- **Reportes**: `reporteDTO`

### 2. Middleware de Validación (`middleware/validateDTO.js`)

El middleware `validateDTO` se encarga de:
- Validar los datos usando Joi
- Formatear errores de manera clara
- Eliminar campos no definidos en el schema
- Pasar los datos validados al controlador

### 3. Rutas Actualizadas (`routes/endPoints.js`)

Las rutas ahora incluyen validación automática:

```javascript
// Antes
router.post('/login', login);

// Después
router.post('/login', validateDTO(loginDTO), login);
```

## Beneficios de esta Implementación

### ✅ **Sin Cambios en el Frontend**
- Los DTOs validan los datos **después** de que llegan al backend
- El frontend puede seguir enviando datos como antes
- Los errores se devuelven en un formato claro y estructurado

### ✅ **Validación Automática**
- Campos obligatorios verificados automáticamente
- Tipos de datos validados (string, number, email, etc.)
- Longitudes mínimas y máximas
- Formatos específicos (teléfonos, emails)

### ✅ **Mensajes de Error Claros**
```json
{
  "success": false,
  "message": "Error de validación en login",
  "errors": [
    {
      "field": "email",
      "message": "El email debe tener un formato válido"
    },
    {
      "field": "password",
      "message": "La contraseña debe tener al menos 6 caracteres"
    }
  ]
}
```

### ✅ **Respuestas Estandarizadas**
Todas las respuestas ahora incluyen:
```json
{
  "success": true/false,
  "message": "Mensaje descriptivo",
  "data": {...} // Para respuestas exitosas
}
```

## Ejemplos de Uso

### 1. Login
```javascript
// Frontend envía
{
  "email": "usuario@ejemplo.com",
  "password": "123456"
}

// Backend valida automáticamente
// Si hay errores, devuelve:
{
  "success": false,
  "message": "Error de validación en login",
  "errors": [...]
}
```

### 2. Crear Usuario
```javascript
// Frontend envía
{
  "nombre": "Juan Pérez",
  "password": "123456",
  "fkrestaurante": 1,
  "fkempleado": 2,
  "fkrol": 1,
  "action": "insert"
}

// Backend valida y procesa
// Respuesta exitosa:
{
  "success": true,
  "message": "Usuario añadido correctamente",
  "affectedRows": 1
}
```

## Cómo Agregar Nuevos DTOs

### 1. Definir el Schema en `dto/index.js`
```javascript
const nuevoDTO = Joi.object({
    campo1: Joi.string().min(2).required().messages({
        'string.min': 'El campo debe tener al menos 2 caracteres',
        'any.required': 'El campo es obligatorio'
    }),
    campo2: Joi.number().positive().optional()
});
```

### 2. Exportar en el módulo
```javascript
module.exports = {
    // ... otros DTOs
    nuevoDTO
};
```

### 3. Usar en las rutas
```javascript
router.post('/nueva-ruta', validateDTO(nuevoDTO), controlador);
```

## Validaciones Disponibles

### Tipos de Datos
- `Joi.string()` - Cadenas de texto
- `Joi.number()` - Números
- `Joi.boolean()` - Booleanos
- `Joi.date()` - Fechas
- `Joi.array()` - Arrays
- `Joi.object()` - Objetos

### Validaciones Comunes
- `.required()` - Campo obligatorio
- `.optional()` - Campo opcional
- `.min(6)` - Mínimo 6 caracteres
- `.max(100)` - Máximo 100 caracteres
- `.email()` - Formato de email
- `.pattern(/regex/)` - Patrón personalizado
- `.valid('valor1', 'valor2')` - Valores permitidos

### Mensajes Personalizados
```javascript
Joi.string().email().required().messages({
    'string.email': 'El email debe tener un formato válido',
    'any.required': 'El email es obligatorio'
})
```

## Instalación

1. Instalar la dependencia:
```bash
npm install joi
```

2. Los archivos ya están creados:
- `dto/index.js` - Definición de DTOs
- `middleware/validateDTO.js` - Middleware de validación
- Rutas actualizadas en `routes/endPoints.js`

## Ventajas de esta Implementación

1. **Seguridad**: Valida datos antes de procesarlos
2. **Mantenibilidad**: Centraliza la lógica de validación
3. **Documentación**: Los DTOs sirven como documentación de la API
4. **Consistencia**: Respuestas estandarizadas en toda la aplicación
5. **Compatibilidad**: No requiere cambios en el frontend existente

## Próximos Pasos

1. **Instalar la dependencia**: `npm install joi`
2. **Probar las validaciones** con datos incorrectos
3. **Adaptar el frontend** para manejar los nuevos formatos de respuesta (opcional)
4. **Agregar más validaciones** según las necesidades del negocio

## Notas Importantes

- Los DTOs **NO afectan** el funcionamiento actual del frontend
- Las validaciones son **automáticas** y transparentes
- Los errores se devuelven en un formato **claro y estructurado**
- Todas las respuestas ahora incluyen un campo `success` para facilitar el manejo en el frontend 