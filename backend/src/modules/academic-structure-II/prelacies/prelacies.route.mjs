import { Router } from 'express';
import { ModelPrelacy } from './prelacies.model.mjs';
import { PrelaciesController } from './prelacies.controller.mjs';

const router = Router();
const controller = new PrelaciesController({ ModelPrelacy: ModelPrelacy });

/**
 * @openapi
 * tags:
 *   name: Módulo II - Prelacies
 *   description: Configuración de prerequisitos entre materias
 */

/**
 * @openapi
 * /api/prelacies/all:
 *   get:
 *     tags: [Módulo II - Prelacies]
 *     summary: Obtener todas las prelaciones definidas
 *     responses:
 *       200:
 *         description: Lista de prelaciones
 */
router.get('/all', controller.getAllPrelacies);

/**
 * @openapi
 * /api/prelacies/{subjectId}/prerequisites:
 *   get:
 *     tags: [Módulo II - Prelacies]
 *     summary: Obtener materias que bloquean a una materia específica
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de prerequisitos encontrada
 */
router.get('/:subjectId/prerequisites', controller.getPrelaciesBySubjectId);

/**
 * @openapi
 * /api/prelacies:
 *   get:
 *     tags: [Módulo II - Prelacies]
 *     summary: Obtener todas las materias disponibles para prelación
 *     responses:
 *       200:
 *         description: Lista de materias
 */
router.get('/', controller.getAllSubjects);

/**
 * @openapi
 * /api/prelacies/search:
 *   get:
 *     tags: [Módulo II - Prelacies]
 *     summary: Buscar materias por nombre
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Término de búsqueda
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 */
router.get('/search', controller.searchSubjects);

/**
 * @openapi
 * /api/prelacies/summary:
 *   get:
 *     tags: [Módulo II - Prelacies]
 *     summary: Resumen agrupado de todas las prelaciones
 *     responses:
 *       200:
 *         description: Resumen obtenido
 */
router.get('/summary', controller.getSummary);

/**
 * @openapi
 * /api/prelacies/subjects/{subjectId}:
 *   get:
 *     tags: [Módulo II - Prelacies]
 *     summary: Obtener materia por ID para prelación
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Materia obtenida
 */
router.get('/subjects/:subjectId', controller.getSubjectById);

/**
 * @openapi
 * /api/prelacies:
 *   post:
 *     tags: [Módulo II - Prelacies]
 *     summary: Crear una nueva relación de prelación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject_id: { type: integer }
 *               prerequisite_id: { type: integer }
 *     responses:
 *       201:
 *         description: Prelación creada
 */
router.post('/', controller.createPrelacy);

/**
 * @openapi
 * /api/prelacies/subject/{subjectId}:
 *   delete:
 *     tags: [Módulo II - Prelacies]
 *     summary: Eliminar todas las prelaciones de una materia
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Prelaciones eliminadas
 */
router.delete('/subject/:subjectId', controller.deletePrelaciesBySubject);

/**
 * @openapi
 * /api/prelacies/{prelacyId}:
 *   delete:
 *     tags: [Módulo II - Prelacies]
 *     summary: Eliminar una prelación específica
 *     parameters:
 *       - in: path
 *         name: prelacyId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Registro eliminado
 */
router.delete('/:prelacyId', controller.deletePrelacy);

export const prelaciesRoute = router;