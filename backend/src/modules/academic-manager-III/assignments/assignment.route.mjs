import {Router} from 'express'
import { AssignemtController } from './assignment.controller.mjs';
import { TeacherAssignmentModel } from './assignment.model.mjs';

const router = Router();
const controller = new AssignemtController({assignmentModel: TeacherAssignmentModel});

/**
 * @openapi
 * tags:
 *   name: Módulo III - Assignments
 *   description: Gestión de asignaciones de materias a profesores y secciones
 */

/**
 * @openapi
 * /api/assignments/student/{studentId}/courses:
 *   get:
 *     tags: [Módulo III - Assignments]
 *     summary: Obtener cursos asignados a un estudiante
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/student/:studentId/courses', controller.getCoursesByStudentId);

/**
 * @openapi
 * /api/assignments/section/{sectionId}/courses:
 *   get:
 *     tags: [Módulo III - Assignments]
 *     summary: Obtener cursos asignados a una sección
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/section/:sectionId/courses', controller.getCoursesBySectionId);

/**
 * @openapi
 * /api/assignments/teacher/{teacherId}/courses:
 *   get:
 *     tags: [Módulo III - Assignments]
 *     summary: Obtener cursos asignados a un profesor
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/teacher/:teacherId/courses', controller.getCoursesByTeacherId);

/**
 * @openapi
 * /api/assignments/course/{assignmentId}:
 *   get:
 *     tags: [Módulo III - Assignments]
 *     summary: Obtener detalles de un curso asignado por ID
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/course/:assignmentId', controller.getCourseById);

/**
 * @openapi
 * /api/assignments/assignment/{assignmentId}/activities:
 *   get:
 *     tags: [Módulo III - Assignments]
 *     summary: Obtener todas las actividades de un curso asignado
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/assignment/:assignmentId/activities', controller.getActivitiesByAssignmentID);

/**
 * @openapi
 * /api/assignments/assignment/{assignmentId}/people:
 *   get:
 *     tags: [Módulo III - Assignments]
 *     summary: Obtener personas relacionadas a un curso (docente y alumnos)
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/assignment/:assignmentId/people', controller.getPeopleByAssignmentID);

/**
 * @openapi
 * /api/assignments/create:
 *   post:
 *     tags: [Módulo III - Assignments]
 *     summary: Crear una nueva asignación docente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacher_user_id: { type: integer }
 *               subject_id: { type: integer }
 *               section_id: { type: integer }
 *     responses:
 *       201:
 *         description: Creado
 */
router.post('/create', controller.createAssignment);

/**
 * @openapi
 * /api/assignments/update/{assignmentId}:
 *   patch:
 *     tags: [Módulo III - Assignments]
 *     summary: Actualizar una asignación existente
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacher_user_id: { type: integer }
 *               subject_id: { type: integer }
 *               section_id: { type: integer }
 *     responses:
 *       200:
 *         description: Actualizado
 */
router.patch('/update/:assignmentId', controller.updateAssignment);

/**
 * @openapi
 * /api/assignments/delete/{assignmentId}:
 *   delete:
 *     tags: [Módulo III - Assignments]
 *     summary: Eliminar una asignación
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Borrado
 */
router.delete('/delete/:assignmentId', controller.deleteAssignment);

export const AssignmentRouter = router;