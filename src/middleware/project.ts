import type { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../utils/HttpStatus'
import Project, { IProject } from '../models/Project'

declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

export async function validateProjectExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { projectId } = req.params
        const project = await Project.findById(projectId)

        if(!project) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'Proyecto no encontrado'
            })
        }

        req.project = project
        next()
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}