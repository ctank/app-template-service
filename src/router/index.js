import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import { jwtConfig } from '../config/index'
import verify from '../middleware/verify'
import User from '../model/user'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'

const router = new Router()

router
  .get('/api/auth', async (ctx, next) => {
    let user = await User.findOne({
      userName: ctx.query.userName
    })

    if (user) {
      if (user.passWord !== CryptoJS.MD5(ctx.query.passWord).toString()) {
        throw new ApiError(ApiErrorNames.UserPwError)
      }
      ctx.body = user
      // token签名 有效期为12小时
      const token = jwt.sign(
        {
          user: user.userName
        },
        jwtConfig.secret,
        { expiresIn: '12h' }
      )
      ctx.body = {
        token,
        user: user.userName
      }
    } else {
      throw new ApiError(ApiErrorNames.UserNotExist)
    }
  })
  .get('/api/auth/user', async (ctx, next) => {
    let token = await jwt.decode(ctx.query.token, jwtConfig.secret)
    try {
      token = await jwt.verify(ctx.query.token, jwtConfig.secret)
      ctx.body = {
        token: ctx.query.token,
        user: token.user
      }
    } catch (err) {
      if (err.message === 'jwt expired' && token && token.user) {
        const newToken = jwt.sign(
          {
            user: token.user
          },
          jwtConfig.secret,
          { expiresIn: '12h' }
        )
        ctx.body = {
          token: newToken,
          user: token.user
        }
      } else {
        ctx.throw(401, 'invalid token')
      }
    }
  })

export default router
