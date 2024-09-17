import type { Request, Response } from 'express'
import { HttpStatus } from '../utils/HttpStatus'
import Project from '../models/Project'
import Task from '../models/Task'

export class TaskController {

    static createTask = async (req: Request, res: Response) => {
        try {
            
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)
            await task.save()
            await req.project.save()

            res.status(HttpStatus.CREATED).json({message: 'Tarea creada exitosamente'})

        } catch (error) {
            console.log(error)
        }
    }
    
    // static createTask = async (req: Request, res: Response) => {
    //     try {
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // } 
}
