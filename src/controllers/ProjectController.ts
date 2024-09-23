import type { Request, Response} from 'express'
import { HttpStatus } from '../utils/HttpStatus'
import Project from '../models/Project'


export class ProjectController  {

    static createProject = async (req: Request, res: Response) => {
        // const project = new Project(req.body)

        try {
         
            // await project.save()
            await Project.create(req.body)

            res.status(HttpStatus.CREATED).json({message: 'Proyecto creado exitosamente.'})
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        
        try {
            const projects = await Project.find({})

            res.status(HttpStatus.OK).json({data: projects })

        } catch (error) {
            console.log(error);
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const project = await Project.findById(id).populate('tasks')

            if(!project) {
                return res.status(HttpStatus.NOT_FOUND).json({message: 'Proyecto no encontrado'})
            }

            res.status(HttpStatus.OK).json({ data: project})
            
        } catch (error) {
            console.log(error)
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const project = await Project.findByIdAndUpdate(id, req.body)
            
            if(!project) {
                return res.status(HttpStatus.NOT_FOUND).json({message: 'Proyecto no encontrado'})
            }
            
            await project.save()

            res.status(HttpStatus.OK).json({message: 'Proyecto actualizado correctamente'})
            
        } catch (error) {
            console.log(error)
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const project = await Project.findById(id)
            
            if(!project) {
                return res.status(HttpStatus.NOT_FOUND).json({message: 'Proyecto no encontrado'})
            }
            
            await project.deleteOne()

            res.status(HttpStatus.OK).json({message: 'Proyecto eliminado correctamente'})
            
        } catch (error) {
            console.log(error)
        }
    }
}