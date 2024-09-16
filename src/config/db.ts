import mongoose from 'mongoose'
import colors from 'colors'
import { exit } from 'node:process'

export const connectDB = async () => {
    try {
        
        const connect = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connect.connection.host}:${connect.connection.port}`
        console.log(colors.cyan.bold(`MongoDB connection in: ${url}`))

    } catch (error) {
        console.log(colors.red.bold(`Error connection to MongoDB => ${error.message}`))
        exit(1)
    }
}