import { Router } from 'express';
import { ControlController } from './control.controller.mjs';
import { UserModel } from './control.model.mjs';
import { authMiddleware } from '../../api/middlewares/auth.middleware.mjs';

const router = Router();
const controller = new ControlController({ ModelControl: UserModel });

/**
 * @openapi
 * tags:
 *   name: Módulo I - Auth & Users
 *   description: Gestión de usuarios, sesiones y autenticación
 */

/**
 * @openapi
 * /api/auth/users:
 *   get:
 *     tags: [Módulo I - Auth & Users]
 *     summary: Obtener todos los usuarios registrados
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/users', controller.getAllUsers);

/**
 * @openapi
 * /api/auth/user/{userId}:
 *   get:
 *     tags: [Módulo I - Auth & Users]
 *     summary: Obtener un usuario por ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Datos del usuario obtenidos
 */
router.get('/user/:userId', controller.getUserById);

/**
 * @openapi
 * /api/auth/email/{email}:
 *   get:
 *     tags: [Módulo I - Auth & Users]
 *     summary: Buscar un usuario por email
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
 * /api/auth/register:
 *   post:
 *     tags: [Módulo I - Auth & Users]
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_id: { type: integer }
 *               first_name: { type: string }
 *               last_name: { type: string }
 *               email: { type: string }
 *               phone: { type: string }
 *               password_hash: { type: string }
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 */
router.post('/register', controller.createdUser);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Módulo I - Auth & Users]
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password_hash: { type: string }
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token
 */
router.post('/login', controller.LoginUser);

/**
 * @openapi
 * /api/auth/logout/{userId}:
 *   post:
 *     tags: [Módulo I - Auth & Users]
 *     summary: Cerrar sesión de un usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Sesión cerrada
 */
router.post('/logout/:userId', controller.LogoutUser);

/**
 * @openapi
 * /api/auth/update/{userId}:
 *   patch:
 *     tags: [Módulo I - Auth & Users]
 *     summary: Actualizar datos de un usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.patch('/update/:userId', controller.updateUser);

/**
 * @openapi
 * /api/auth/delete/{userId}:
 *   delete:
 *     tags: [Módulo I - Auth & Users]
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
 * /api/auth/verify-auth:
 *   get:
 *     tags: [Módulo I - Auth & Users]
 *     summary: Verificar ticket de sesión (JWT)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Autenticado
 */
router.get('/verify-auth', authMiddleware, controller.verifyAuth);

export const controlRoute = router;