import type { Request, Response} from 'express'
import Project from '../models/Project'


export class ProjectController  {

    static createProject = async (req: Request, res: Response) => {
        // const project = new Project(req.body)

        try {
         
            // await project.save()
            await Project.create(req.body)

            res.json({message: 'Proyecto creado exitosamente.'})
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        
        try {
            const projects = await Project.find({})

            res.status(200).json({data: projects })

        } catch (error) {
            console.log(error);
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const project = await Project.findById(id)

            if(!project) {
                return res.status(404).json({message: 'Proyecto no encontrado'})
            }

            res.status(200).json({ data: project})
            
        } catch (error) {
            console.log(error)
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const project = await Project.findByIdAndUpdate(id, req.body)
            
            if(!project) {
                return res.status(404).json({message: 'Proyecto no encontrado'})
            }
            
            await project.save()

            res.status(200).json({message: 'Proyecto actualizado correctamente'})
            
        } catch (error) {
            console.log(error)
        }
    }
}