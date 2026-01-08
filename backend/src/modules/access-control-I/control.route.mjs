import { Router } from 'express';
import { ControlController } from './control.controller.mjs';
import { UserModel } from './control.model.mjs';

const router = Router();
const controller = new ControlController({ ModelControl: UserModel });

// Ruta para obtener todos los usuarios
router.get('/all', controller.getAllUsers);
// Ruta para obtener un usuario por su ID
router.get('/user/:userId', controller.getUserById);
// Ruta para obtener un usuario por su email
router.get('/email/:email', controller.getUserByEmail);
// Ruta para crear un nuevo usuario
router.post('/create', controller.createdUser);
// Ruta para loguear un usuario
router.post('/login', controller.LoginUser);
// Ruta para logout de un usuario
router.post('/logout', controller.LogoutUser);
// Ruta para actualizar un usuario
router.patch('/update/:userId', controller.updateUser);
// Ruta para eliminar un usuario
router.delete('/delete/:userId', controller.deleteUser);

export const controlRoute = router;

