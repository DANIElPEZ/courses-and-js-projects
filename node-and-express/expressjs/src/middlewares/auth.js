import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
     const token = req.header('Authorization')?.split(' ')[1]; // obtener el token
     if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

     jwt.verify(token, process.env.JWT_SECRET,(err, user)=>{
          if (err) return res.status(403).json({ message: 'Invalid token.' }); // if token is expired

          req.user = user; // guarda token y otros datos en la solicitud
          next();
     });
};