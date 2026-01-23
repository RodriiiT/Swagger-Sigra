import {Router} from 'express';
import { SectionController } from './section.controller.mjs';
import { SectionModel } from './section.model.mjs';

const router = Router();
const sectionController = new SectionController({ModelSection: SectionModel});

/**
 * @openapi
 * tags:
 *   name: Módulo II - Sections
 *   description: Gestión de secciones académicas (A, B, C...)
 */

/**
 * @openapi
 * /api/sections/all:
 *   get:
 *     tags: [Módulo II - Sections]
 *     summary: Listar todas las secciones del sistema
 *     responses:
 *       200:
 *         description: Lista de secciones obtenida
 */
router.get('/all', sectionController.getAllSections);

/**
 * @openapi
 * /api/sections/grade/{gradeId}:
 *   get:
 *     tags: [Módulo II - Sections]
 *     summary: Listar secciones por grado
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de secciones para el grado
 */
router.get('/grade/:gradeId', sectionController.getSectionsByGrade);

/**
 * @openapi
 * /api/sections/section/{sectionId}:
 *   get:
 *     tags: [Módulo II - Sections]
 *     summary: Obtener detalle de una sección por ID
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Datos de la sección
 */
router.get('/section/:sectionId', sectionController.getSectionById);

/**
 * @openapi
 * /api/sections/create:
 *   post:
 *     tags: [Módulo II - Sections]
 *     summary: Crear una nueva sección
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade_id: { type: integer }
 *               academic_year_id: { type: integer }
 *               section_name: { type: string, example: "A" }
 *               capacity: { type: integer, example: 30 }
 *     responses:
 *       201:
 *         description: Sección creada
 */
router.post('/create', sectionController.createSection);

/**
 * @openapi
 * /api/sections/update/{sectionId}:
 *   patch:
 *     tags: [Módulo II - Sections]
 *     summary: Actualizar datos de una sección
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               section_name: { type: string }
 *               capacity: { type: integer }
 *     responses:
 *       200:
 *         description: Sección actualizada
 */
router.patch('/update/:sectionId', sectionController.updateSection);

/**
 * @openapi
 * /api/sections/delete/{sectionId}:
 *   delete:
 *     tags: [Módulo II - Sections]
 *     summary: Eliminar una sección
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Sección eliminada
 */
router.delete('/delete/:sectionId', sectionController.deleteSection);

export const SectionRoutes = router;