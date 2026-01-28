import {Router} from 'express';
import { ActivitiesController } from './activities.controller.mjs';
import { ActivitiesModel } from './activities.model.mjs';

const router = Router();
const controller = new ActivitiesController({ActivitiesModel});

/**
 * @openapi
 * tags:
 *   name: Módulo IV - Activities
 *   description: Gestión de actividades académicas
 */

/**
 * @openapi
 * /api/activities/all:
 *   get:
 *     tags: [Módulo IV - Activities]
 *     summary: Obtener todas las actividades
 *     responses:
 *       200:
 *         description: Lista de actividades
 */
router.get('/all', controller.getAllActivities);

/**
 * @openapi
 * /api/activities/assignments/{assignmentId}/activities:
 *   get:
 *     tags: [Módulo IV - Activities]
 *     summary: Obtener actividades por asignación
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de actividades por asignación
 */
router.get('/assignments/:assignmentId/activities', controller.getActivitiesByAssignment);

/**
 * @openapi
 * /api/activities/subject/{subjectId}/activities:
 *   get:
 *     tags: [Módulo IV - Activities]
 *     summary: Obtener actividades por materia
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de actividades por materia
 */
router.get('/subject/:subjectId/activities', controller.getActivitiesBySubject);

/**
 * @openapi
 * /api/activities/activity/{activityId}:
 *   get:
 *     tags: [Módulo IV - Activities]
 *     summary: Obtener una actividad por ID
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Actividad encontrada
 */
router.get('/activity/:activityId', controller.getActivityById);

/**
 * @openapi
 * /api/activities/activity/{activityId}/visibility:
 *   patch:
 *     tags: [Módulo IV - Activities]
 *     summary: Cambiar la visibilidad de una actividad
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema: { type: integer }
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
 *     summary: Crear una nueva actividad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, example: "Tarea 1" }
 *               description: { type: string, example: "Resolver ejercicios" }
 *               assignment_id: { type: integer, example: 12 }
 *               subject_id: { type: integer, example: 4 }
 *               due_date: { type: string, format: date, example: "2026-02-15" }
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
 *     summary: Actualizar una actividad existente
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               due_date: { type: string, format: date }
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
 *     summary: Eliminar una actividad
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