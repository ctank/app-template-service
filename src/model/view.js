import mongoose from '../dbHelper'
import { defaultSchemaExtend, defaultSchemaOptions } from '../config/index'

const Schema = mongoose.Schema

const ViewSchema = new Schema(
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
      config: String
    },
    defaultSchemaExtend
  ),
  defaultSchemaOptions
)

const View = mongoose.model('View', ViewSchema, 'Views')

export default View
