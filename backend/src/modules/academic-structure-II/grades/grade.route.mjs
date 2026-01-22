import {Router} from 'express';
import { GradeModel } from './grade.model.mjs';
import { GradeController } from './grade.controller.mjs';

const router = Router();
const controller = new GradeController({ModelGrade: GradeModel});

/**
 * @openapi
 * tags:
 *   name: Módulo II - Grades
 *   description: Configuración de Grados o Años de estudio (Ej. 1er Año, 2do Año)
 */

/**
 * @openapi
 * /api/grades/all:
 *   get:
 *     tags: [Módulo II - Grades]
 *     summary: Obtener todos los grados escolares
 *     responses:
 *       200:
 *         description: Lista de grados obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 grades: { type: array, items: { type: object } }
 */
router.get('/all', controller.getAllGrades);

/**
 * @openapi
 * /api/grades/create:
 *   post:
 *     tags: [Módulo II - Grades]
 *     summary: Crear un nuevo grado escolar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade_name: { type: string, example: "6to Año" }
 *               level_order: { type: integer, example: 6 }
 *     responses:
 *       201:
 *         description: Grado creado
 */
router.post('/create', controller.createGrade);

/**
 * @openapi
 * /api/grades/update/{gradeId}:
 *   patch:
 *     tags: [Módulo II - Grades]
 *     summary: Actualizar un grado existente
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade_name: { type: string }
 *               level_order: { type: integer }
 *     responses:
 *       200:
 *         description: Grado actualizado
 */
router.patch('/update/:gradeId', controller.updateGrade);

/**
 * @openapi
 * /api/grades/delete/{gradeId}:
 *   delete:
 *     tags: [Módulo II - Grades]
 *     summary: Eliminar un grado escolar
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Grado eliminado
 */
router.delete('/delete/:gradeId', controller.deleteGrade);

export const GradeRoutes = router;