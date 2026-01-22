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
 *   description: Gestión de entregas de actividades y buzón de alumnos
 */

/**
 * @openapi
 * /api/submissions/activities/{activityId}/submissions:
 *   get:
 *     tags: [Módulo IV - Submissions]
 *     summary: Obtener todas las entregas de una actividad específica (Vista Docente)
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de entregas de los alumnos
 */
router.get('/activities/:activityId/submissions', controller.getSubmissionByActivityId);

/**
 * @openapi
 * /api/submissions/submission/{submissionId}:
 *   get:
 *     tags: [Módulo IV - Submissions]
 *     summary: Obtener detalle de una entrega específica
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Datos de la entrega encontrados
 */
router.get('/submission/:submissionId', controller.getSubmissionById);

/**
 * @openapi
 * /api/submissions/students/{studentUserId}/submissions:
 *   get:
 *     tags: [Módulo IV - Submissions]
 *     summary: Obtener todas las entregas de un estudiante específico (Vista Alumno)
 *     description: Retorna el histórico de archivos subidos por el alumno, incluyendo nota y feedback si ya existen.
 *     parameters:
 *       - in: path
 *         name: studentUserId
 *         required: true
 *         schema: { type: integer, example: 3 }
 *     responses:
 *       200:
 *         description: JSON con entregas y score
 */
router.get('/students/:studentUserId/submissions', controller.getSubmissionByUserId);

/**
 * @openapi
 * /api/submissions/create:
 *   post:
 *     tags: [Módulo IV - Submissions]
 *     summary: Crear una nueva entrega de tarea (Subir archivo alumno)
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               activity_id: { type: integer }
 *               student_user_id: { type: integer }
 *               comments: { type: string }
 *               file: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Entrega realizada
 */
router.post('/create', submissionUploadMiddleware, controller.createSubmission);

/**
 * @openapi
 * /api/submissions/update/{submissionId}:
 *   patch:
 *     tags: [Módulo IV - Submissions]
 *     summary: Re-entregar o editar una entrega existente
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               comments: { type: string }
 *               file: { type: string, format: binary }
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
 *     summary: Eliminar una entrega y borrar archivo físico
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Entrega borrada
 */
router.delete('/delete/:submissionId', controller.deleteSubmission);

export const SubmissionRoute = router;