# Ejemplos de Pruebas para DTOs

## Cómo Probar las Validaciones

### 1. Probar Login con Datos Inválidos

```bash
# Email inválido
curl -X POST http://localhost:7777/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "email-invalido",
    "password": "123"
  }'

# Respuesta esperada:
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

### 2. Probar Login con Datos Válidos

```bash
curl -X POST http://localhost:7777/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "123456"
  }'

# Respuesta esperada (si el usuario existe):
{
  "success": true,
  "message": "Inicio de sesión exitoso.",
  "rol": "admin"
}
```

### 3. Probar Crear Usuario con Datos Inválidos

```bash
curl -X POST http://localhost:7777/postUsuario \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "J",
    "password": "123",
    "fkrestaurante": "no-es-numero",
    "fkempleado": 1,
    "fkrol": 1,
    "action": "insert"
  }'

# Respuesta esperada:
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "nombre",
      "message": "El nombre debe tener al menos 2 caracteres"
    },
    {
      "field": "password",
      "message": "La contraseña debe tener al menos 6 caracteres"
    },
    {
      "field": "fkrestaurante",
      "message": "El ID del restaurante debe ser un número"
    }
  ]
}
```

### 4. Probar Crear Empleado con Datos Inválidos

```bash
curl -X POST http://localhost:7777/postEmpleado \
  -H "Content-Type: application/json" \
  -d '{
    "empleado_nombre": "María",
    "empleado_email": "email-invalido",
    "empleado_telefono": "123",
    "fk_restaurante": 1
  }'

# Respuesta esperada:
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "empleado_email",
      "message": "El email debe tener un formato válido"
    },
    {
      "field": "empleado_telefono",
      "message": "El teléfono debe tener un formato válido"
    }
  ]
}
```

### 5. Probar Crear Producto con Datos Inválidos

```bash
curl -X POST http://localhost:7777/agregar-producto \
  -H "Content-Type: application/json" \
  -d '{
    "producto_nombre": "P",
    "producto_precio": -10,
    "producto_stock": -5,
    "fk_categoria": 1,
    "fk_restaurante": 1
  }'

# Respuesta esperada:
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "producto_nombre",
      "message": "El nombre del producto debe tener al menos 2 caracteres"
    },
    {
      "field": "producto_precio",
      "message": "El precio debe ser un número positivo"
    },
    {
      "field": "producto_stock",
      "message": "El stock no puede ser negativo"
    }
  ]
}
```

## Casos de Prueba para Frontend

### 1. Manejo de Errores en el Frontend

```javascript
// Ejemplo de cómo manejar las respuestas en el frontend
async function login(email, password) {
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Login exitoso
      console.log('Login exitoso:', data.rol);
      // Redirigir o actualizar estado
    } else {
      // Mostrar errores de validación
      if (data.errors) {
        data.errors.forEach(error => {
          console.log(`Error en ${error.field}: ${error.message}`);
          // Mostrar error en el campo correspondiente
        });
      } else {
        // Error general
        console.log('Error:', data.message);
      }
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
}
```

### 2. Validación en Formularios

```javascript
// Ejemplo de validación en tiempo real
function validateForm(formData) {
  const errors = {};
  
  // Validar email
  if (!formData.email || !formData.email.includes('@')) {
    errors.email = 'El email debe tener un formato válido';
  }
  
  // Validar contraseña
  if (!formData.password || formData.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
```

## Beneficios de las Pruebas

1. **Validación Temprana**: Los errores se detectan antes de llegar a la base de datos
2. **Mensajes Claros**: El usuario sabe exactamente qué está mal
3. **Seguridad**: Se evitan datos maliciosos o incorrectos
4. **Experiencia de Usuario**: Mejor feedback al usuario

## Notas Importantes

- Los DTOs **NO reemplazan** la validación del frontend
- Son una **capa adicional** de seguridad
- Los errores se devuelven en formato JSON estructurado
- Todas las respuestas incluyen un campo `success` para facilitar el manejo 