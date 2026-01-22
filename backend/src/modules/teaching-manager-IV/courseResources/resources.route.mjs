import { Router } from "express";
import { ResourceController } from "./resources.controller.mjs";
import { ResourceModel } from "./resources.model.mjs";
import { resourceUploadMiddleware } from "../../../api/middlewares/multer.middleware.mjs";

const router = Router();
const controller = new ResourceController({ResourceModel: ResourceModel});

/**
 * @openapi
 * tags:
 *   name: Módulo IV - Resources
 *   description: Carga de material de apoyo por parte del docente (PDF, Links, etc)
 */

/**
 * @openapi
 * /api/resources/assignments/{assignmentId}/resources:
 *   get:
 *     tags: [Módulo IV - Resources]
 *     summary: Obtener todos los recursos de una asignatura
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de recursos didácticos
 */
router.get('/assignments/:assignmentId/resources', controller.getResourcesByAssignment);

/**
 * @openapi
 * /api/resources/resource/{resourceId}:
 *   get:
 *     tags: [Módulo IV - Resources]
 *     summary: Obtener detalle de un recurso específico
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Datos del recurso obtenidos
 */
router.get('/resource/:resourceId', controller.getResourceById);

/**
 * @openapi
 * /api/resources/create:
 *   post:
 *     tags: [Módulo IV - Resources]
 *     summary: Subir un nuevo recurso didáctico (Multiform/File)
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               assignment_id: { type: integer }
 *               title: { type: string }
 *               resource_type: { type: string, enum: [PDF, Link, Video, Slide] }
 *               file: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Recurso cargado exitosamente
 */
router.post('/create', resourceUploadMiddleware, controller.createResource);

/**
 * @openapi
 * /api/resources/update/{resourceId}:
 *   patch:
 *     tags: [Módulo IV - Resources]
 *     summary: Actualizar datos de un recurso cargado
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               resource_type: { type: string }
 *               file: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Recurso actualizado
 */
router.patch('/update/:resourceId', resourceUploadMiddleware, controller.updateResource);

/**
 * @openapi
 * /api/resources/delete/{resourceId}:
 *   delete:
 *     tags: [Módulo IV - Resources]
 *     summary: Eliminar un recurso del sistema y borrar archivo físico
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Recurso eliminado
 */
router.delete('/delete/:resourceId', controller.deleteResource);

export const ResourceRoute = router;