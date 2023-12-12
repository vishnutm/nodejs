// add new rouest for user creation


import express, { Request, Response } from 'express';

const router = express.Router();

// Add new route for user creation
router.post('/api/users', (req: Request, res: Response) => {
  // Add code for user creation here

  res.sendStatus(200)
});

export default router;