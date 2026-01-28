import {Router} from "express";
import { SubmissionController } from './submission.controller.mjs';
import { SubmissionModel } from './submission.model.mjs';
import { submissionUploadMiddleware } from "../../../api/middlewares/multer.middleware.mjs";
const router = Router();
const controller = new SubmissionController({SubmissionModel: SubmissionModel});

/**
 * @openapi
 * tags:
 *   name: Módulo IV - Submissions
 *   description: Gestión de entregas de actividades
 */

/**
 * @openapi
 * /api/submissions/activities/{activityId}/submissions:
 *   get:
 *     tags: [Módulo IV - Submissions]
 *     summary: Obtener todas las entregas de una actividad
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de entregas de la actividad
 */
router.get('/activities/:activityId/submissions', controller.getSubmissionByActivityId);

/**
 * @openapi
 * /api/submissions/assignments/{assignmentId}/submissions:
 *   get:
 *     tags: [Módulo IV - Submissions]
 *     summary: Obtener todas las entregas de una asignación
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de entregas de la asignación
 */
router.get('/assignments/:assignmentId/submissions', controller.getSubmissionByAssignmentId);

/**
 * @openapi
 * /api/submissions/submission/{submissionId}:
 *   get:
 *     tags: [Módulo IV - Submissions]
 *     summary: Obtener una entrega por ID
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Entrega encontrada
 */
router.get('/submission/:submissionId', controller.getSubmissionById);

/**
 * @openapi
 * /api/submissions/students/{studentUserId}/submissions:
 *   get:
 *     tags: [Módulo IV - Submissions]
 *     summary: Obtener todas las entregas de un estudiante
 *     parameters:
 *       - in: path
 *         name: studentUserId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de entregas del estudiante
 */
router.get('/students/:studentUserId/submissions', controller.getSubmissionByUserId);

/**
 * @openapi
 * /api/submissions/create:
 *   post:
 *     tags: [Módulo IV - Submissions]
 *     summary: Crear una nueva entrega
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               activity_id: { type: integer, example: 10 }
 *               student_user_id: { type: integer, example: 25 }
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Entrega creada
 */
router.post('/create', submissionUploadMiddleware, controller.createSubmission);

/**
 * @openapi
 * /api/submissions/update/{submissionId}:
 *   patch:
 *     tags: [Módulo IV - Submissions]
 *     summary: Actualizar una entrega existente
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Entrega actualizada
 */
router.patch('/update/:submissionId', submissionUploadMiddleware, controller.updateSubmission);

/**
 * @openapi
 * /api/submissions/delete/{submissionId}:
 *   delete:
 *     tags: [Módulo IV - Submissions]
 *     summary: Eliminar una entrega
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Entrega eliminada
 */
router.delete('/delete/:submissionId', controller.deleteSubmission);

export const SubmissionRoute = router;