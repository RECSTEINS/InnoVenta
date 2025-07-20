const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
    // roles puede ser un string o un array de strings
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido o expirado' });
            }
            req.user = user;
            if (roles.length && !roles.includes(user.rol)) {
                return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
            }
            next();
        });
    };
};

module.exports = auth; 