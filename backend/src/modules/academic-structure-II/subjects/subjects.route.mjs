import { Router } from "express"
import { subjectController } from "./subjects.controller.mjs"
import { subjectModel } from "./subjects.model.mjs"

const router = Router()
const controller = new subjectController({ subjectModel: subjectModel })

/**
 * @openapi
 * tags:
 *   name: Módulo II - Subjects
 *   description: Catálogo general de materias académicas
 */

/**
 * @openapi
 * /api/subjects/all:
 *   get:
 *     tags: [Módulo II - Subjects]
 *     summary: Obtener todas las materias del catálogo
 *     responses:
 *       200:
 *         description: Catálogo obtenido
 */
router.get("/all", controller.getAllSubjects)

/**
 * @openapi
 * /api/subjects/subject/{subjectId}:
 *   get:
 *     tags: [Módulo II - Subjects]
 *     summary: Obtener detalle de una materia por ID
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Datos de la materia
 */
router.get("/subject/:subjectId", controller.getSubjectById)

/**
 * @openapi
 * /api/subjects/create:
 *   post:
 *     tags: [Módulo II - Subjects]
 *     summary: Crear una nueva materia
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject_name: { type: string, example: "Matemática I" }
 *               grade_id: { type: integer }
 *               code_subject: { type: string, example: "MAT101" }
 *               description: { type: string }
 *     responses:
 *       201:
 *         description: Materia creada
 */
router.post("/create", controller.createSubject)

/**
 * @openapi
 * /api/subjects/update/{subjectId}:
 *   put:
 *     tags: [Módulo II - Subjects]
 *     summary: Actualizar una materia (Reemplazo total)
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject_name: { type: string }
 *               description: { type: string }
 *     responses:
 *       200:
 *         description: Materia actualizada
 */
router.put("/update/:subjectId", controller.updateSubject)

/**
 * @openapi
 * /api/subjects/delete/{subjectId}:
 *   delete:
 *     tags: [Módulo II - Subjects]
 *     summary: Eliminar una materia del catálogo
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Materia eliminada
 */
router.delete("/delete/:subjectId", controller.deleteSubject)

export const subjectRoute = router