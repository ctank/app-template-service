import Router from 'koa-router'
import UserController from '../controller/userController'
import verify from '../middleware/verify'

const router = new Router()

router.prefix('/api/user')

router
  .get('/getAll', verify, UserController.getAllUser)
  .post('/saveUser', UserController.saveUser)
  .get('/getUserById', verify, UserController.getUserById)

export default router
