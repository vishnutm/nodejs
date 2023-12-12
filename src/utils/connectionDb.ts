
import mongoose from 'mongoose'

import config from 'config'

import logger from './logger'

async function connectionToDb() {
    const dbUri = config.get<string>("dbUri")
    
   
    try {
       await mongoose.connect(dbUri)
       logger.info("Database Connected")
       
       
    } catch (error) {
        process.exit(1)
    }
}


export default connectionToDb