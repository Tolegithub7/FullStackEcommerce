import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware";
import { createUserSchema, usersTable } from "../../db/usersSchema";
import bcrypt from 'bcryptjs';
import { db } from '../../db/index';

const router = Router();

router.post('/register', validateData(createUserSchema), async (req, res) => {
    try {
    // console.log(req.cleanBody);
    const data = req.cleanBody;
    // const hashedPassword = await bcrypt.hash(data.password, 10);
    // console.log(data, hashedPassword);
    data.password = await bcrypt.hash(data.password, 10);
    const [user] = await db.insert(usersTable).values(data).returning();

    res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error });
    }
});
router.post('/login', (req, res) => {
    res.status(200).send("Login route");
});

export default router;