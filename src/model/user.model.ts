import { ModelOptions, Severity, pre, prop , DocumentType, getModelForClass} from "@typegoose/typegoose";
import  argon2d  from "argon2";
import logger from '../utils/logger'
import { nanoid } from "nanoid";

/* The `@pre<User>("save", async function(){ ... })` decorator is used to define a pre-save hook for
the `User` model. */
@pre<User>("save", async function(){
    
    if (!this.isModified("password")) {
        return
    }

    const hash =  await argon2d.hash(this.password)

    this.password = hash

    return
})
/* The `@ModelOptions` decorator is used to specify options for the model. In this case, it has two
properties: */
@ModelOptions({
    schemaOptions : {
        timestamps : true
    },
    options : {
        allowMixed : Severity.ALLOW
    }
})
/* The User class represents a user in a system and includes properties for email, first name, last
name, password, verification code, password reset code, and a flag indicating if the user is
verified. */
export class User {

    @prop({ required: true , unique : true, lowercase : true})
    email: string

    @prop({ required: true })
    firstName : string
    
    @prop({ required: true })
    lastName : string

    @prop({ required: true })
    password : string

    @prop({ required: true ,  default : ()=> nanoid()})
    vertificationCode : string

    @prop({ required: true })
    passwordResetCode : string | null

    @prop({ default: false })
    verified: boolean


/**
 * Validates the provided password against the stored hashed password.
 *
 * @param {string} candidatePassword - The password to be validated.
 * @return {Promise<boolean>} - A Promise that resolves to a boolean indicating whether the password is valid or not.
 */
    async  validatePassword(this :  DocumentType<User>, candidatePassword : string) {
        try {
            return await argon2d.verify(this.password, candidatePassword)
        } catch (error) {
            logger.error(error  )
        }
    }

}


const UserModel = getModelForClass(User);

export default UserModel;