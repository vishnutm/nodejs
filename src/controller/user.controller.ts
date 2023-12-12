

import { Request, Response} from 'express'

import { createUserInput  } from '../schema/user.schema'
import { createUser } from '../service/user.service'


/**
 * Create a new user based on the provided input.
 *
 * @param {Request<{},{}, createUserInput>} req - The request object containing the user input.
 * @param {Response} res - The response object to send the result.
 * @return {Promise<void>} The function does not return anything.
 */
export async function createUserHandler(req : Request <{},{}, createUserInput>, res : Response ) {
    

    const body = req.body

    try {
        const user = await createUser(body)

        return res.send("User Created Successfully")
    } catch (error : any) {
        
        if (error.code === 11000) {
            return res.status(409).send("User Already Exists")
            
        }

        return res.status(500).send(error)
    }
}