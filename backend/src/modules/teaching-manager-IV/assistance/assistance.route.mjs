import { Router } from "express";
import { AssistanceController } from "./assistance.controller.mjs";
import { AssistanceModel } from "./assistance.model.mjs";

const router = Router();
const controller = new AssistanceController({assistanceController: AssistanceModel});

/**
 * @openapi
 * tags:
 *   name: Módulo IV - Assistance
 *   description: Registro de asistencia y acceso a clases
 */

/**
 * @openapi
 * /api/assistance/assignment/{assignmentId}:
 *   get:
 *     tags: [Módulo IV - Assistance]
 *     summary: Obtener lista de asistencia para una asignación específica
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de asistencia obtenida
 */
router.get('/assignment/:assignmentId', controller.getAllAssistances);

/**
 * @openapi
 * /api/assistance/register:
 *   post:
 *     tags: [Módulo IV - Assistance]
 *     summary: Registrar acceso de un estudiante a la clase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_user_id: { type: integer }
 *               assignment_id: { type: integer }
 *     responses:
 *       201:
 *         description: Asistencia registrada
 */
router.post('/register', controller.registerAssistance);

/**
 * @openapi
 * /api/assistance/update/{accessId}:
 *   patch:
 *     tags: [Módulo IV - Assistance]
 *     summary: Actualizar un registro de asistencia previo
 *     parameters:
 *       - in: path
 *         name: accessId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Registro actualizado
 */
router.patch('/update/:accessId', controller.updateAssistance);

export const AssistanceRouter = router;