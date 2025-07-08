const validateDTO = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false, // Recolecta todos los errores
            stripUnknown: true, // Elimina campos no definidos en el schema
            allowUnknown: false // No permite campos desconocidos
        });

        if (error) {
            // Formatear errores para una respuesta más clara
            const errorMessages = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: errorMessages
            });
        }

        // Reemplazar req.body con los datos validados
        req.body = value;
        next();
    };
};

module.exports = validateDTO; 