import mongoose from '../dbHelper'
import { defaultSchemaExtend, defaultSchemaOptions } from '../config/index'

const Schema = mongoose.Schema

const FormSchema = new Schema(
  Object.assign(
    {
      name: {
        type: String,
        required: true,
        index: true,
        unique: true
      },
      api: {
        type: String,
        required: true,
        index: true,
        unique: true
      },
      components: {
        type: Array
      },
      layouts: {
        type: Array
      }
    },
    defaultSchemaExtend
  ),
  defaultSchemaOptions
)

const Form = mongoose.model('Form', FormSchema, 'Forms')

export default Form
