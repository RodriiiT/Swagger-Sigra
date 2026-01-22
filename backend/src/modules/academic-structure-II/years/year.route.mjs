import {Router} from "express";
import { YearModel } from "./year.model.mjs";
import { YearController } from "./year.controller.mjs";

const router = Router();
const controller = new YearController({ModelYear: YearModel});

/**
 * @openapi
 * tags:
 *   name: Módulo II - Academic Years
 *   description: Gestión de periodos escolares (Ej. Periodo 2024-2025)
 */

/**
 * @openapi
 * /api/years/all:
 *   get:
 *     tags: [Módulo II - Academic Years]
 *     summary: Obtener todos los periodos académicos
 *     responses:
 *       200:
 *         description: Lista de años obtenida
 */
router.get('/all', controller.getAllYears);

/**
 * @openapi
 * /api/years/year/{yearId}:
 *   get:
 *     tags: [Módulo II - Academic Years]
 *     summary: Obtener detalle de un año por ID
 *     parameters:
 *       - in: path
 *         name: yearId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Datos del año académico
 */
router.get('/year/:yearId', controller.getYearById);

/**
 * @openapi
 * /api/years/create:
 *   post:
 *     tags: [Módulo II - Academic Years]
 *     summary: Crear un nuevo año académico
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "Periodo 2025-2026" }
 *               start_date: { type: string, format: date }
 *               end_date: { type: string, format: date }
 *     responses:
 *       201:
 *         description: Periodo creado
 */
router.post('/create', controller.createYear);

/**
 * @openapi
 * /api/years/update/{yearId}:
 *   patch:
 *     tags: [Módulo II - Academic Years]
 *     summary: Actualizar un periodo académico
 *     parameters:
 *       - in: path
 *         name: yearId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Periodo actualizado
 */
router.patch('/update/:yearId', controller.updateYear);

/**
 * @openapi
 * /api/years/delete/{yearId}:
 *   delete:
 *     tags: [Módulo II - Academic Years]
 *     summary: Eliminar un periodo académico
 *     parameters:
 *       - in: path
 *         name: yearId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Periodo eliminado
 */
router.delete('/delete/:yearId', controller.deleteYear);

export const YearRoutes = router;