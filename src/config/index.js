export const DB_URL = 'mongodb://192.168.141.132:31017/appTemplate'

export const defaultSchemaExtend = {
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
}

export const defaultSchemaOptions = {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
}

export const jwtConfig = {
  secret: 'myjwtsecret'
}
