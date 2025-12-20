import { z } from 'zod'

// Esquema para validar params de GET /users/:id
export const getUserParamsSchema = z.object({
  id: z.coerce.number().int().positive()
})

export function validateGetUser(req, res, next) {
  const result = getUserParamsSchema.safeParse(req.params)
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid parameters', errors: result.error.errors })
  }

  // Reemplazamos el id en params por su versión numérica
  req.params.id = result.data.id
  return next()
}

export default { getUserParamsSchema, validateGetUser }
