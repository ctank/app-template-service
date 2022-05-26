import Router from 'koa-router'
import FormController from '../controller/formController'
import verify from '../middleware/verify'

const router = new Router()

router.prefix('/api/form')

router
  .get('/getAll', verify, FormController.getAllForm)
  .get('/getForm/:id', verify, FormController.getFormById)
  .post('/getFormTemp', FormController.getFormByApi)
  .post('/saveForm', verify, FormController.saveForm)
  .post('/updateForm', verify, FormController.updateForm)

export default router
