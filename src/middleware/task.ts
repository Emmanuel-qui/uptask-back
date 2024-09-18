import type { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../utils/HttpStatus'
import Task, { ITask } from '../models/Task'

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export async function taskExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params
        const task = await Task.findById(taskId)

        if(!task) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'Tarea no encontranda'
            })
        }

        req.task = task
        next()
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}

export function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
    try {
        if(req.task.project.toString() !== req.project.id.toString()) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Parametro no válido'
            })
        }
        next()
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}