import { Router } from 'express';
import { SchedulesModel } from './schedules.model.mjs';
import { SchedulesController } from './schedules.controller.mjs';

const router = Router();
const controller = new SchedulesController({ ModelSchedules: SchedulesModel });

/**
 * @openapi
 * tags:
 *   name: Módulo III - Schedules
 *   description: Gestión de horarios por sección y asignación
 */

/**
 * @openapi
 * /api/schedules/section/{sectionId}:
 *   get:
 *     tags: [Módulo III - Schedules]
 *     summary: Obtener el horario completo de una sección
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/section/:sectionId', controller.getScheduleBySectionId);

/**
 * @openapi
 * /api/schedules/schedule/{scheduleId}:
 *   get:
 *     tags: [Módulo III - Schedules]
 *     summary: Obtener un bloque de horario por ID
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/schedule/:scheduleId', controller.getScheduleById);

/**
 * @openapi
 * /api/schedules/create:
 *   post:
 *     tags: [Módulo III - Schedules]
 *     summary: Crear un nuevo bloque horario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assignment_id: { type: integer }
 *               day_of_week: { type: string, enum: [Lunes, Martes, Miercoles, Jueves, Viernes] }
 *               start_time: { type: string, example: "07:00" }
 *               end_time: { type: string, example: "08:30" }
 *               classroom: { type: string }
 *     responses:
 *       201:
 *         description: Creado
 */
router.post('/create', controller.createSchedule);

/**
 * @openapi
 * /api/schedules/update/{scheduleId}:
 *   patch:
 *     tags: [Módulo III - Schedules]
 *     summary: Actualizar un bloque horario
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               day_of_week: { type: string }
 *               start_time: { type: string }
 *               end_time: { type: string }
 *               classroom: { type: string }
 *     responses:
 *       200:
 *         description: Actualizado
 */
router.patch('/update/:scheduleId', controller.updateSchedule);

/**
 * @openapi
 * /api/schedules/delete/{scheduleId}:
 *   delete:
 *     tags: [Módulo III - Schedules]
 *     summary: Eliminar un bloque de horario
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Borrado
 */
router.delete('/delete/:scheduleId', controller.deleteSchedule);

export const SchedulesRoutes = router;