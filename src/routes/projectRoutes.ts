import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExists } from '../middleware/project'

const router = Router()


router.post('/',
    body('projectName').notEmpty().withMessage('El campo nombre del proyecto es requerido.'),
    body('clientName').notEmpty().withMessage('El campo nombre del cliente es requerido.'),
    body('description').notEmpty().withMessage('El campo descripcion es requerido.'),
    handleInputErrors,
    ProjectController.createProject
)

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param('id').isMongoId().withMessage('Parametro no válido'),
    handleInputErrors,
    ProjectController.getProjectById
)

router.put('/:id',
    param('id').isMongoId().withMessage('Parametro no válido'),
    body('projectName').notEmpty().withMessage('El campo nombre del proyecto es requerido.'),
    body('clientName').notEmpty().withMessage('El campo nombre del cliente es requerido.'),
    body('description').notEmpty().withMessage('El campo descripcion es requerido.'),
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:id',
    param('id').isMongoId().withMessage('Parametro no válido'),
    handleInputErrors,
    ProjectController.deleteProject
)

// Routes for tasks
router.param('projectId', validateProjectExists)

router.post('/:projectId/tasks', 
    body('name').notEmpty().withMessage('El campo nombre de la tarea es requerido.'),
    body('description').notEmpty().withMessage('El campo descripcion es requerido.'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Parametro no válido'),
    TaskController.getTaskById
)

export default router