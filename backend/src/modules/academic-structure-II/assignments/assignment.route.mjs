import { Router } from "express";
import { AssignmentController } from "./assignment.controller.mjs";
import { AssignmentModel } from "./assignment.model.mjs";

const router = Router();
const assignmentController = new AssignmentController({ assignmentModel: AssignmentModel });

// Estudiantes

/**
 * @openapi
 * /api/assignments/unassigned-students/{academicYearId}:
 *   get:
 *     tags: [Módulo II - Assignments]
 *     summary: Obtener estudiantes no asignados por año académico
 *     parameters:
 *       - in: path
 *         name: academicYearId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2024
 *     responses:
 *       200:
 *         description: Lista de estudiantes no asignados
 */
router.get("/unassigned-students/:academicYearId", assignmentController.getUnassignedStudents);

/**
 * @openapi
 * /api/assignments/assigned-students/{sectionId}:
 *   get:
 *     tags: [Módulo II - Assignments]
 *     summary: Obtener estudiantes asignados a una sección
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de estudiantes asignados
 */
router.get("/assigned-students/:sectionId", assignmentController.getAssignedStudents);

// Profesores

/**
 * @openapi
 * /api/assignments/teachers:
 *   get:
 *     tags: [Módulo II - Assignments]
 *     summary: Obtener todos los profesores
 *     responses:
 *       200:
 *         description: Lista de profesores
 */
router.get("/teachers", assignmentController.getAllTeachers);

/**
 * @openapi
 * /api/assignments/unassigned-teachers/{sectionId}:
 *   get:
 *     tags: [Módulo II - Assignments]
 *     summary: Obtener profesores no asignados a una sección
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de profesores no asignados
 */
router.get("/unassigned-teachers/:sectionId", assignmentController.getUnassignedTeachers);

/**
 * @openapi
 * /api/assignments/assigned-teachers/{sectionId}:
 *   get:
 *     tags: [Módulo II - Assignments]
 *     summary: Obtener profesores asignados a una sección
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de profesores asignados
 */
router.get("/assigned-teachers/:sectionId", assignmentController.getAssignedTeachers);

/**
 * @openapi
 * /api/assignments/assign-teacher:
 *   post:
 *     tags: [Módulo II - Assignments]
 *     summary: Asignar un profesor a una sección
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacher_user_id:
 *                 type: integer
 *                 example: 12
 *               section_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Profesor asignado con éxito
 */
router.post("/assign-teacher", assignmentController.assignTeacher);

/**
 * @openapi
 * /api/assignments/unassign-teacher/{assignmentId}:
 *   delete:
 *     tags: [Módulo II - Assignments]
 *     summary: Desasignar un profesor de una sección
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 55
 *     responses:
 *       200:
 *         description: Profesor desasignado con éxito
 */
router.delete("/unassign-teacher/:assignmentId", assignmentController.unassignTeacher);

export const academicAssignmentRoute = router;