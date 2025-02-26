import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { createUserSchema, loginSchema, usersTable } from "../../db/usersSchema.js";
import bcrypt from 'bcryptjs';
import { db } from '../../db/index.js';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', validateData(createUserSchema), async (req, res) => {
    try {
    const data = req.cleanBody;
    // const hashedPassword = await bcrypt.hash(data.password, 10);
    // console.log(data, hashedPassword);
    data.password = await bcrypt.hash(data.password, 10);
    const [user] = await db.insert(usersTable).values(data).returning();
    
    //@ts-ignore
    delete user.password;
    res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error });
    }
});
router.post('/login', validateData(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.cleanBody;
        const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));
        if (!user) {
            res.status(404).send({ message: 'Authentication failed at email' });
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(404).send({ message: 'Authentication failed' });
            return;
        } else {
            console.log("Authentication successful");
            // res.status(200).send({ message: 'Authentication successful' });
        };

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role
            }, 
            'my-secret-in-secret', 
            {
                expiresIn: '30d'
            }
        );
        //@ts-ignore
        delete user.password;
        res.status(200).json({ token, user });
        // console.log(email, password);
        // const hashedPassword = await bcrypt.hash(password, 10);
        // if (user.password !== hashedPassword) {
        //     res.status(404).send({ message: 'Authentication failed at password' });
        //     return;
        // } else {
        //     res.status(200).send({ message: 'Authentication successful' });
        // }
        // console.log({email, password});
        // res.status(200).send("Login route");
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
});

export default router;