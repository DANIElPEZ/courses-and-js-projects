import { registerUser, loginUser } from '../services/authServices.js';
export const register = async (req, res) => {
     try {
          const { email, password, name } = req.body;
          await registerUser(email, password, name);
          return res.status(201).json({ message: 'Usuario registrado correctamente' });
     } catch (error) {
          return res.status(400).json({ error: "Error al registrar el usuario" });
     }
};

export const login = async (req, res) => {
     const { email, password } = req.body;
     try {
          const token = await loginUser(email, password);
          return res.json({ token });
     } catch (error) {
          return res.status(400).json({ error: "Error al iniciar sesión" });
     }
};