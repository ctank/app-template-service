import Router from 'koa-router'
import ViewController from '../controller/viewController'
import verify from '../middleware/verify'

const router = new Router()

router.prefix('/api/view')

router
  .get('/getAll', verify, ViewController.getAllView)
  .get('/getView/:id', verify, ViewController.getViewById)
  .post('/getViewTemp', ViewController.getViewByApi)
  .post('/saveView', verify, ViewController.saveView)
  .post('/updateView', verify, ViewController.updateView)

export default router
