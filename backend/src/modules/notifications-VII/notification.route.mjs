import { Router } from "express";
import { NotificationController } from "./notification.controller.mjs";
import { NotificationModel } from "./notification.model.mjs";

const router = Router();
const notificationController = new NotificationController({ NotificationModel: NotificationModel });

/**
 * @openapi
 * tags:
 *   name: Módulo VII - Notifications
 *   description: Sistema de alertas, avisos académicos y recordatorios
 */

/**
 * @openapi
 * /api/notifications/all:
 *   get:
 *     tags: [Módulo VII - Notifications]
 *     summary: Obtener todas las notificaciones del sistema (Admin)
 *     responses:
 *       200:
 *         description: Lista global de notificaciones
 */
router.get('/all', notificationController.getAllNotifications);

/**
 * @openapi
 * /api/notifications/user/{userId}:
 *   get:
 *     tags: [Módulo VII - Notifications]
 *     summary: Obtener notificaciones de un usuario específico
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer, example: 3 }
 *     responses:
 *       200:
 *         description: Lista de notificaciones del usuario
 */
router.get('/user/:userId', notificationController.getNotificationsByUserId);

/**
 * @openapi
 * /api/notifications/notification/{notificationId}:
 *   get:
 *     tags: [Módulo VII - Notifications]
 *     summary: Obtener detalle de una notificación por ID
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Datos de la notificación
 */
router.get('/notification/:notificationId', notificationController.getNotificationById);

/**
 * @openapi
 * /api/notifications/create:
 *   post:
 *     tags: [Módulo VII - Notifications]
 *     summary: Crear y enviar una nueva notificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id: { type: integer }
 *               title: { type: string, example: "Nueva Tarea Asignada" }
 *               message: { type: string, example: "Se ha publicado la actividad 15 en Matemáticas." }
 *               type: { type: string, enum: [Alerta, Info, Academico, Recordatorio] }
 *     responses:
 *       201:
 *         description: Notificación creada
 */
router.post('/create', notificationController.createNotification);

/**
 * @openapi
 * /api/notifications/update/{notificationId}:
 *   patch:
 *     tags: [Módulo VII - Notifications]
 *     summary: Actualizar el contenido de una notificación
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               message: { type: string }
 *     responses:
 *       200:
 *         description: Notificación actualizada
 */
router.patch('/update/:notificationId', notificationController.updateNotification);

/**
 * @openapi
 * /api/notifications/mark-as-read/{notificationId}:
 *   patch:
 *     tags: [Módulo VII - Notifications]
 *     summary: Marcar una notificación como leída
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Estado actualizado a leído
 */
router.patch('/mark-as-read/:notificationId', notificationController.markNotificationAsRead);

/**
 * @openapi
 * /api/notifications/delete/{notificationId}:
 *   delete:
 *     tags: [Módulo VII - Notifications]
 *     summary: Eliminar una notificación permanentemente
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Notificación eliminada
 */
router.delete('/delete/:notificationId', notificationController.deleteNotification);

export const NotificationRoutes = router;