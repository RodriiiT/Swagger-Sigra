/* --- ARCHIVO: enrollment.route.mjs --- */
import {Router} from 'express';
import { EnrollmentController } from './enrollment.controller.mjs';
import { EnrollmentModel } from './enrollment.model.mjs';

const router = Router();
const controller = new EnrollmentController({enrollmentController: EnrollmentModel});

/**
 * @openapi
 * tags:
 *   name: Módulo II - Enrollments
 *   description: Proceso de inscripción de alumnos en secciones
 */

/**
 * @openapi
 * /api/enrollments/create:
 *   post:
 *     tags: [Módulo II - Enrollments]
 *     summary: Inscribir un estudiante en una sección
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_user_id: { type: integer, example: 3 }
 *               section_id: { type: integer, example: 1 }
 *     responses:
 *       201:
 *         description: Inscripción realizada con éxito
 */
router.post('/create', controller.createEnrollment);

/**
 * @openapi
 * /api/enrollments/all:
 *   get:
 *     tags: [Módulo II - Enrollments]
 *     summary: Obtener todas las inscripciones del sistema
 *     responses:
 *       200:
 *         description: Lista completa de estudiantes inscritos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 enrollments: { type: array, items: { type: object } }
 */
router.get('/all', controller.getAllEnrollments);

/**
 * @openapi
 * /api/enrollments/section/{sectionId}:
 *   get:
 *     tags: [Módulo II - Enrollments]
 *     summary: Obtener inscripciones de una sección específica
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de estudiantes de la sección
 */
router.get('/section/:sectionId', controller.getEnrollmentsBySection);

/**
 * @openapi
 * /api/enrollments/{enrollmentId}:
 *   get:
 *     tags: [Módulo II - Enrollments]
 *     summary: Obtener detalle de una inscripción por ID
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Datos de la inscripción encontrados
 */
router.get('/:enrollmentId', controller.getEnrollmentById);

/**
 * @openapi
 * /api/enrollments/status/{status}:
 *   get:
 *     tags: [Módulo II - Enrollments]
 *     summary: Filtrar inscripciones por estado
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema: 
 *           type: string
 *           enum: [active, dropped, completed]
 *     responses:
 *       200:
 *         description: Inscripciones filtradas por estado
 */
router.get('/status/:status', controller.getEnrollmentByStatus);

/**
 * @openapi
 * /api/enrollments/update/{enrollmentId}:
 *   patch:
 *     tags: [Módulo II - Enrollments]
 *     summary: Actualizar el estado de una inscripción
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string, enum: [active, dropped, completed] }
 *     responses:
 *       200:
 *         description: Estado de inscripción actualizado
 */
router.patch('/update/:enrollmentId', controller.updateEnrollmentStatus);

/**
 * @openapi
 * /api/enrollments/delete/{enrollmentId}:
 *   delete:
 *     tags: [Módulo II - Enrollments]
 *     summary: Eliminar una inscripción
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Inscripción eliminada correctamente
 */
router.delete('/delete/:enrollmentId', controller.deleteEnrollment);

export const EnrollmentRouter = router;