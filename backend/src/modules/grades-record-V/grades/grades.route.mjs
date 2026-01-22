import { Router } from 'express';
import { GradesLogController } from './grades.controller.mjs';
import { GradesLogModel } from './grades.model.mjs';

const router = Router();
const gradesController = new GradesLogController({ ModelGradesLog: GradesLogModel });

/**
 * @openapi
 * tags:
 *   name: Módulo V - Grades Log
 *   description: Registro y auditoría de calificaciones por actividad
 */

/**
 * @openapi
 * /api/grades-log/all:
 *   get:
 *     tags: [Módulo V - Grades Log]
 *     summary: Obtener todos los registros de calificaciones del sistema
 *     responses:
 *       200:
 *         description: Lista global de calificaciones
 */
router.get('/all', gradesController.getAllGradesLog);

/**
 * @openapi
 * /api/grades-log/activity/{activityId}:
 *   get:
 *     tags: [Módulo V - Grades Log]
 *     summary: Obtener calificaciones de una actividad específica
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de notas de la actividad
 */
router.get('/activity/:activityId', gradesController.getGradesLogByActivityId);

/**
 * @openapi
 * /api/grades-log/user/{userId}:
 *   get:
 *     tags: [Módulo V - Grades Log]
 *     summary: Obtener el boletín de notas de un estudiante por su ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer, example: 3 }
 *     responses:
 *       200:
 *         description: Lista de calificaciones del usuario
 */
router.get('/user/:userId', gradesController.getGradesLogByUserId);

/**
 * @openapi
 * /api/grades-log/activity/{activityId}/subject/{subjectId}:
 *   get:
 *     tags: [Módulo V - Grades Log]
 *     summary: Obtener calificaciones filtradas por actividad y materia
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema: { type: integer }
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Notas filtradas correctamente
 */
router.get('/activity/:activityId/subject/:subjectId', gradesController.getGradesLogByActivityAndSubject);

/**
 * @openapi
 * /api/grades-log/create:
 *   post:
 *     tags: [Módulo V - Grades Log]
 *     summary: Registrar una nueva calificación para un estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activity_id: { type: integer, example: 1 }
 *               student_user_id: { type: integer, example: 3 }
 *               score: { type: number, example: 18.5 }
 *               feedback: { type: string, example: "Excelente desempeño en la investigación." }
 *     responses:
 *       201:
 *         description: Calificación registrada con éxito
 */
router.post('/create', gradesController.addGradeLogEntry);

/**
 * @openapi
 * /api/grades-log/update/{gradeLogId}:
 *   patch:
 *     tags: [Módulo V - Grades Log]
 *     summary: Actualizar una nota o feedback existente
 *     parameters:
 *       - in: path
 *         name: gradeLogId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score: { type: number }
 *               feedback: { type: string }
 *     responses:
 *       200:
 *         description: Registro actualizado
 */
router.patch('/update/:gradeLogId', gradesController.updateGradeLogEntry);

/**
 * @openapi
 * /api/grades-log/delete/{gradeLogId}:
 *   delete:
 *     tags: [Módulo V - Grades Log]
 *     summary: Eliminar un registro de calificación
 *     parameters:
 *       - in: path
 *         name: gradeLogId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Registro eliminado
 */
router.delete('/delete/:gradeLogId', gradesController.deleteGradeLogEntry);

export const GradesLogRoutes = router;