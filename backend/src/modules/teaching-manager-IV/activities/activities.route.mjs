import {Router} from 'express';
import { ActivitiesController } from './activities.controller.mjs';
import { ActivitiesModel } from './activities.model.mjs';

const router = Router();
const controller = new ActivitiesController({ActivitiesModel});

/**
 * @openapi
 * tags:
 *   name: Módulo IV - Activities
 *   description: Definición y gestión de tareas por parte de los docentes
 */

/**
 * @openapi
 * /api/activities/assignments/{assignmentId}/activities:
 *   get:
 *     tags: [Módulo IV - Activities]
 *     summary: Obtener todas las actividades de una asignación específica
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de actividades obtenida
 */
router.get('/assignments/:assignmentId/activities', controller.getActivitiesByAssignment);

/**
 * @openapi
 * /api/activities/activity/{activityId}:
 *   get:
 *     tags: [Módulo IV - Activities]
 *     summary: Obtener instrucciones detalladas de una actividad
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Datos de la actividad obtenidos
 */
router.get('/activity/:activityId', controller.getActivityById);

/**
 * @openapi
 * /api/activities/activity/{activityId}/visibility:
 *   patch:
 *     tags: [Módulo IV - Activities]
 *     summary: Cambiar visibilidad de una actividad (Mostrar/Ocultar)
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isVisible: { type: boolean }
 *     responses:
 *       200:
 *         description: Visibilidad actualizada
 */
router.patch('/activity/:activityId/visibility', controller.toggleActivityVisibility);

/**
 * @openapi
 * /api/activities/create:
 *   post:
 *     tags: [Módulo IV - Activities]
 *     summary: Crear una nueva actividad evaluada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assignment_id: { type: integer }
 *               title: { type: string, example: "Tarea de Redes" }
 *               description: { type: string }
 *               weight_percentage: { type: number, example: 20 }
 *               due_date: { type: string, format: date-time, example: "2024-12-31T23:59:59Z" }
 *     responses:
 *       201:
 *         description: Actividad creada
 */
router.post('/create', controller.createActivity);

/**
 * @openapi
 * /api/activities/update/{activityId}:
 *   patch:
 *     tags: [Módulo IV - Activities]
 *     summary: Actualizar datos de una actividad
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               weight_percentage: { type: number }
 *               due_date: { type: string, format: date-time }
 *               is_active: { type: boolean }
 *     responses:
 *       200:
 *         description: Actividad actualizada
 */
router.patch('/update/:activityId', controller.updateActivity);

/**
 * @openapi
 * /api/activities/delete/{activityId}:
 *   delete:
 *     tags: [Módulo IV - Activities]
 *     summary: Eliminar una actividad permanentemente
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Actividad eliminada
 */
router.delete('/delete/:activityId', controller.deleteActivity);

export const ActivitiesRoute = router;