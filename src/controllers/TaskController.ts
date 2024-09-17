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
            const { taskId } = req.params
            const task = await Task.findById(taskId)

            if(!task) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Tarea no encontrada'
                })
            }

            if(task.project.toString() !== req.project.id) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Parametro no válido'
                })
            }


            res.status(HttpStatus.OK).json({
                data: task
            })
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    }
    
    static updateTask = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId)

            if(!task) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Tarea no encontrada'
                })
            }

            if(task.project.toString() !== req.project.id) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Parametro no válido'
                })
            }

            
            task.name = req.body.name
            task.description = req.body.description
            await task.save()

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
            const { taskId } = req.params
            const task = await Task.findById(taskId)

            if(!task) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Tarea no encontrada'
                })
            }

            if(task.project.toString() !== req.project.id) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Parametro no válido'
                })
            }
            
            req.project.tasks = req.project.tasks.filter( task => task.toString() !== taskId )

            await Promise.allSettled([task.deleteOne(), req.project.save()])
            
            res.status(HttpStatus.OK).json({
                message: 'Tarea eliminada exitosamente'
            })
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    } 
}
