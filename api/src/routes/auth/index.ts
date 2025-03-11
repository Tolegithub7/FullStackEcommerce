import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { createUserSchema, loginSchema, usersTable } from "../../db/usersSchema.js";
import bcrypt from 'bcryptjs';
import { db } from '../../db/index.js';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser } from "./authController.js";

const router = Router();

router.post('/register', validateData(createUserSchema), registerUser);
router.post('/login', validateData(loginSchema), loginUser);

export default router;