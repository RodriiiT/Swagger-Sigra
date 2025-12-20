import express from 'express'
import { getUser } from './control.controller.mjs'
import { validateGetUser } from './control.schema.mjs'

const router = express.Router()

// GET /users/:id  -> devuelve usuario por user_id
router.get('/users/:id', validateGetUser, getUser)

export default router

