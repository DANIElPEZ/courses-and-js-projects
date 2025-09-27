import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { validateUser } from './src/utils/validator.js';
import { logger } from './src/middlewares/logger.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { authenticateToken } from './src/middlewares/auth.js';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient(); // manejador de base de datos (orm)

dotenv.config();
const port = process.env.PORT || 3000;
const usersFilePath = path.join(process.cwd(), 'users.json');

const app = express();
app.use(bodyParser.json());// informacion en formato json
app.use(bodyParser.urlencoded({ extended: true }));// informacion en formato urlencoded
app.use(logger); // middleware para registrar peticiones
app.use(errorHandler);

app.get('/', (req, res) => { //recibe una peticion get a la ruta raiz
     res.send('Hello World!');
});

app.get('/user/:id', (req, res) => { //ruta dinamica ":id" es un parametro "/user/123"
     const userId = req.params.id; //obtiene el id
     res.send(`User ID is: ${userId}`);
});

app.get('/search', (req, res) => { //ruta de busqueda "/search?word=someting-word&otherParam=some-value"
     const query = req.query.word || 'no hay'; //obtiene el query
     const dificulty = req.query.dif || 'no se';

     res.send(`Search word is: ${query} and difficulty is: ${dificulty}`);
});

app.post('/form', (req, res) => { //envia peticion post
     const name = req.body.name;
     const email = req.body.email;

     res.json({
          message: 'data received',
          data: {
               name: name,
               email: email
          }
     });
});

app.post('/api/data', (req, res) => {
     const data = req.body;

     if (!data || Object.keys(data).length === 0) return res.status(400).json({ error: 'No data provided' });

     res.status(201).json({
          message: 'Data received successfully',
          data: data
     });
});

//aplicacion para manejar usuarios
app.get('/users', (req, res) => {
     fs.readFile(usersFilePath, 'utf-8', (err, data) => {
          if (err) return res.status(500).json({ error: 'Error reading users file' });
          const users = JSON.parse(data);
          res.json(users);
     });
});

app.post('/users', (req, res) => {
     const newUser = req.body;
     fs.readFile(usersFilePath, 'utf-8', (err, data) => {
          if (err) return res.status(500).json({ error: 'Error reading users file' });
          const users = JSON.parse(data);
          const validation = validateUser(newUser, users);
          if (!validation.isValid) return res.status(400).json({ error: validation.error });
          users.push(newUser);
          fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
               if (err) return res.status(500).json({ error: 'Error writing to users file' });
               res.status(201).json({
                    message: 'User created successfully',
                    user: newUser
               });
          });
     });
});

app.put('/users/:id', (req, res) => {
     const userId = parseInt(req.params.id, 10);
     const updatedUser = req.body;

     fs.readFile(usersFilePath, 'utf8', (err, data) => {
          if (err) return res.status(500).json({ error: 'Error con conexión de datos.' });
          let users = JSON.parse(data);
          const validation = validateUser(updatedUser, users, userId);
          if (!validation.isValid) return res.status(400).json({ error: validation.error });
          users = users.map(user =>
               user.id === userId ? { ...user, ...updatedUser } : user
          );
          fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
               if (err) return res
                    .status(500)
                    .json({ error: 'Error al actualizar el usuario' });
               res.json(updatedUser);
          });
     });
});

app.delete('/users/:id', (req, res) => {
     const userId = parseInt(req.params.id, 10);
     fs.readFile(usersFilePath, 'utf8', (err, data) => {
          if (err) return res.status(500).json({ error: 'Error con conexión de datos.' });
          let users = JSON.parse(data);
          users = users.filter(user => user.id !== userId);
          fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
               if (err) return res
                    .status(500)
                    .json({ error: 'Error al actualizar el usuario' });
               res.status(204).send();
          });
     });
});

// implementacion de error de midleware
app.get('/error', (req, res, next) => {
     next(new Error('error intencional'));
});

//conexion a base de datos
app.get('/db-users', async (req, res) => {
     try {
          const users = await prisma.user.findMany();
          res.json(users);
     } catch (error) {
          res.status(500).json({ error: "Error al comunicarse con la base de datos" });
     }
});

//implementacion de jwt
app.get('/protected', authenticateToken, (req, res) => {
     res.send('ruta protegida');
});

app.post('/register', async (req, res) => {
     const { email, password, name } = req.body;
     const hashedPassword = await bcrypt.hash(password, 10);
     try {
          const newUser = await prisma.user.create({
               data: {
                    email: email,
                    password: hashedPassword,
                    name: name,
                    role: 'USER'
               }
          });
          res.status(201).json({ message: 'Usuario registrado correctamente' });
     } catch (error) {
          res.status(500).json({ error: "Error al registrar el usuario" });
     }
});

app.post('/login', async (req, res) => {
     const { email, password } = req.body;
     try {
          const getUser = await prisma.user.findUnique({
               where: { email: email }
          });
          const isValidPassword = await bcrypt.compare(password, getUser.password); // compara la contraseña ingresada con la almacenada
          if (!getUser && !isValidPassword) return res.status(400).json({ error: "Usuario o contraseña incorrecto" });

          const token = jwt.sign({ id: getUser.id, role: getUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ token });
     } catch (error) {
          return res.status(500).json({ error: "Error al iniciar sesión" });
     }
});

app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
});