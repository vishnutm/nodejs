import UserModel, { User } from "../model/user.model";

/**
 * Creates a new user.
 * 
 * Service folder is mainly used to talk with DB operations
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
export function createUser (input : Partial<User>){

    return UserModel.create(input)
}