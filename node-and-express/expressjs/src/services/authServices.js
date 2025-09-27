import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient(); // manejador de base de datos (orm)

export const registerUser = async (email, password, name) => {
     const hashedPassword = await bcrypt.hash(password, 10);
     const newUser = await prisma.user.create({
          data: {
               email,
               password: hashedPassword,
               name,
               role: 'USER'
          }
     });
     return newUser;
};

export const loginUser = async (email, password) => {
     const getUser = await prisma.user.findUnique({
          where: { email }
     });
     const isValidPassword = await bcrypt.compare(password, getUser.password); // compara la contraseña ingresada con la almacenada
     if (!getUser && !isValidPassword) throw new Error('Usuario o contraseña incorrecto');
     const token = jwt.sign({ id: getUser.id, role: getUser.role }, process.env.JWT_SECRET, { expiresIn: '4h' });
     return token;
};