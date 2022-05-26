import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import user from './router/user'
import view from './router/view'
import form from './router/form'
import index from './router/index'
// import jwtKoa from 'koa-jwt'
import './dbHelper'
import responseFilter from './middleware/responseFilter'
// import { jwtConfig } from './config/index'

const koaStatic = require('koa-static')

const app = new Koa()

app.use(koaStatic('./static'))
app.use(bodyParser())

// app.use(
//   jwtKoa({ secret: jwtConfig }).unless({
//     // 数组中的路径不需要通过jwt验证
//     path: [/^\/api\/login/]
//   })
// )

app.use(logger())

app.use(responseFilter())

app.use(index.routes()).use(index.allowedMethods())
app.use(user.routes()).use(user.allowedMethods())
app.use(view.routes()).use(view.allowedMethods())
app.use(form.routes()).use(form.allowedMethods())

export default app
