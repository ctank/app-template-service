import mongoose from '../dbHelper'
import { defaultSchemaExtend, defaultSchemaOptions } from '../config/index'

const Schema = mongoose.Schema

const UserSchema = new Schema(
  Object.assign(
    {
      userName: {
        type: String,
        index: true,
        unique: true // Unique index. If you specify `unique: true`
        // specifying `index: true` is optional if you do `unique: true`
      },
      passWord: {
        type: String,
        required: true
      },
      // tags: {
      //   type: Array
      // }
    },
    defaultSchemaExtend
  ),
  defaultSchemaOptions
)

const User = mongoose.model('User', UserSchema, 'Users')

export default User
