import express from 'express'
import multer from 'multer'
import * as courseController from './manager.controller.mjs'

const router = express.Router()

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, './uploads/submissions'),
	filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, '_')}`)
});
const upload = multer({ storage });

/**
 * @openapi
 * tags:
 *   name: Módulo III - Student Manager
 *   description: Endpoints para el panel y flujo de trabajo del estudiante
 */

/**
 * @openapi
 * /api/manager/courses/{studentId}:
 *   get:
 *     tags: [Módulo III - Student Manager]
 *     summary: Listado de cursos para el dashboard del estudiante
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de cursos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { type: array, items: { type: object } }
 */
router.get('/courses/:studentId', courseController.getCoursesByStudent)

/**
 * @openapi
 * /api/manager/courses/{assignmentId}/detail:
 *   get:
 *     tags: [Módulo III - Student Manager]
 *     summary: Detalles de cabecera de una asignatura
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Detalle del curso obtenido
 */
router.get('/courses/:assignmentId/detail', courseController.getCourseDetail)

/**
 * @openapi
 * /api/manager/courses/{assignmentId}/activities:
 *   get:
 *     tags: [Módulo III - Student Manager]
 *     summary: Listado de actividades de una materia específica
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de actividades enviada
 */
router.get('/courses/:assignmentId/activities', courseController.getActivitiesByAssignment)

/**
 * @openapi
 * /api/manager/courses/{assignmentId}/materials:
 *   get:
 *     tags: [Módulo III - Student Manager]
 *     summary: Recursos didácticos (Material de apoyo) de una materia
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Materiales encontrados
 */
router.get('/courses/:assignmentId/materials', courseController.getMaterialsByAssignment)

/**
 * @openapi
 * /api/manager/courses/{assignmentId}/grades:
 *   get:
 *     tags: [Módulo III - Student Manager]
 *     summary: Calificaciones obtenidas en una materia
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Notas recuperadas
 */
router.get('/courses/:assignmentId/grades', courseController.getGradesByAssignment)

/**
 * @openapi
 * /api/manager/activities/{activityId}/upload:
 *   post:
 *     tags: [Módulo III - Student Manager]
 *     summary: Entregar una tarea (Subir archivo)
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file: { type: string, format: binary }
 *               studentId: { type: integer, example: 3 }
 *     responses:
 *       201:
 *         description: Tarea entregada con éxito
 */
router.post('/activities/:activityId/upload', upload.single('file'), courseController.uploadActivitySubmission)

/**
 * @openapi
 * /api/manager/courses:
 *   post:
 *     tags: [Módulo III - Student Manager]
 *     summary: Crear un nuevo curso (Interno)
 *     responses:
 *       201:
 *         description: Curso creado
 */
router.post('/courses', courseController.createCourse)

/**
 * @openapi
 * /api/manager/schedule/{studentId}:
 *   get:
 *     tags: [Módulo III - Student Manager]
 *     summary: Obtener horario de clases del estudiante
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Horario generado
 */
router.get('/schedule/:studentId', courseController.getScheduleByStudent)

/**
 * @openapi
 * /api/manager/student/{studentId}/summary:
 *   get:
 *     tags: [Módulo III - Student Manager]
 *     summary: Resumen académico general del estudiante
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Resumen obtenido
 */
router.get('/student/:studentId/summary', courseController.getStudentAcademicSummary)

export const managerRoutes = router