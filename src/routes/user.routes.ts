// add new rouest for user creation


import express, { Request, Response } from 'express';
import ValidateResource from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import { createUserHandler } from '../controller/user.controller';

const router = express.Router();


router.post('/api/users', ValidateResource(createUserSchema), createUserHandler )

export default router;