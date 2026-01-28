import { Router } from 'express';
import { ControlController } from './control.controller.mjs';
import { UserModel } from './control.model.mjs';
import { authMiddleware } from '../../api/middlewares/auth.middleware.mjs';

const router = Router();
const controller = new ControlController({ ModelControl: UserModel });

/**
 * @openapi
 * tags:
 *   name: Módulo I - Access Control
 *   description: Gestión de usuarios y autenticación
 */

/**
 * @openapi
 * /api/control/users:
 *   get:
 *     tags: [Módulo I - Access Control]
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/users', controller.getAllUsers);

/**
 * @openapi
 * /api/control/user/{userId}:
 *   get:
 *     tags: [Módulo I - Access Control]
 *     summary: Obtener un usuario por ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Usuario encontrado
 */
router.get('/user/:userId', controller.getUserById);

/**
 * @openapi
 * /api/control/students:
 *   get:
 *     tags: [Módulo I - Access Control]
 *     summary: Obtener todos los usuarios que sean estudiantes
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 */
router.get('/students', controller.getAllStudents);

/**
 * @openapi
 * /api/control/email/{email}:
 *   get:
 *     tags: [Módulo I - Access Control]
 *     summary: Obtener un usuario por email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Usuario encontrado
 */
router.get('/email/:email', controller.getUserByEmail);

/**
 * @openapi
 * /api/control/register:
 *   post:
 *     tags: [Módulo I - Access Control]
 *     summary: Crear un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "Juan Pérez" }
 *               email: { type: string, example: "juan@mail.com" }
 *               password: { type: string, example: "123456" }
 *               role: { type: string, example: "student" }
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post('/register', controller.createdUser);

/**
 * @openapi
 * /api/control/login:
 *   post:
 *     tags: [Módulo I - Access Control]
 *     summary: Login de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: "juan@mail.com" }
 *               password: { type: string, example: "123456" }
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', controller.LoginUser);

/**
 * @openapi
 * /api/control/logout/{userId}:
 *   post:
 *     tags: [Módulo I - Access Control]
 *     summary: Logout de usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Logout exitoso
 */
router.post('/logout/:userId', controller.LogoutUser);

/**
 * @openapi
 * /api/control/update/{userId}:
 *   patch:
 *     tags: [Módulo I - Access Control]
 *     summary: Actualizar un usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               role: { type: string }
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.patch('/update/:userId', controller.updateUser);

/**
 * @openapi
 * /api/control/delete/{userId}:
 *   delete:
 *     tags: [Módulo I - Access Control]
 *     summary: Eliminar un usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router.delete('/delete/:userId', controller.deleteUser);

/**
 * @openapi
 * /api/control/verify-auth:
 *   get:
 *     tags: [Módulo I - Access Control]
 *     summary: Verificar si el usuario está autenticado
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: No autenticado
 */
router.get('/verify-auth', authMiddleware, controller.verifyAuth);

export const controlRoute = router;