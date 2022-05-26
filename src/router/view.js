import Router from 'koa-router'
import ViewController from '../controller/viewController'
import verify from '../middleware/verify'

const router = new Router()

router.prefix('/api/view')

router
  .get('/getAll', verify, ViewController.getAllView)
  .post('/saveView', verify, ViewController.saveView)
  .get('/getViewById', ViewController.getViewById)

export default router
