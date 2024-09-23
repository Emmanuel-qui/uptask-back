import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { projectExists } from '../middleware/project'
import { taskBelongsToProject, taskExists } from '../middleware/task'

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
router.param('projectId', projectExists)

router.post('/:projectId/tasks', 
    body('name').notEmpty().withMessage('El campo nombre de la tarea es requerido.'),
    body('description').notEmpty().withMessage('El campo descripcion es requerido.'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Parametro no válido'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Parametro no válido'),
    body('name').notEmpty().withMessage('El campo nombre de la tarea es requerido.'),
    body('description').notEmpty().withMessage('El campo descripcion es requerido.'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Parametro no válido'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('Parametro no válido'),
    body('status').notEmpty().withMessage('El campo estado es requerido.'),
    handleInputErrors,
    TaskController.updateStatusTask
)

export default router