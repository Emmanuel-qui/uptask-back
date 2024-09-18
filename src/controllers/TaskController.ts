import type { Request, Response } from 'express'
import { HttpStatus } from '../utils/HttpStatus'
import Task from '../models/Task'

export class TaskController {

    static createTask = async (req: Request, res: Response) => {
        try {
            
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            
            res.status(HttpStatus.CREATED).json({message: 'Tarea creada exitosamente'})

        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({project: req.project.id}).populate('project')

            res.status(HttpStatus.OK).json({data: tasks})
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    } 

    static getTaskById = async (req: Request, res: Response) => {
        try {

            if(req.task.project.toString() !== req.project.id) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Parametro no válido'
                })
            }

            res.status(HttpStatus.OK).json({
                data: req.task
            })
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    }
    
    static updateTask = async (req: Request, res: Response) => {
        try {
            
            if(req.task.project.toString() !== req.project.id) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Parametro no válido'
                })
            }
            
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()

            res.status(HttpStatus.OK).json({
                message: 'Tarea actualizada correctamente'
            })
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    } 
    
    static deleteTask = async (req: Request, res: Response) => {
        try {
            
            if(req.task.project.toString() !== req.project.id) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Parametro no válido'
                })
            }
            
            req.project.tasks = req.project.tasks.filter( task => task.toString() !== req.task.id.toString() )

            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            
            res.status(HttpStatus.OK).json({
                message: 'Tarea eliminada exitosamente'
            })
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    }
    
    static updateStatusTask = async (req: Request, res: Response) => {
        try {
            const { status } = req.body

            if(req.task.project.toString() !== req.project.id) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Parametro no válido'
                })
            }

            req.task.status = status
            await req.task.save()

            res.status(HttpStatus.OK).json({
                message: 'Tarea actualizada correctamente'
            })
            
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    }
}
