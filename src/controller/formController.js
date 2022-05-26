import Form from '../model/form'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'

class FormController {
  static async getAllForm(ctx) {
    const res = await Form.find({})
    const data = []
    if (res.length) {
      res.forEach((item) => {
        data.push({
          id: item._id,
          name: item.name,
          api: item.api
        })
      })
    }
    ctx.body = data
  }

  static async getFormById(ctx) {
    let id = ctx.query.id
    let form = await Form.findOne({ id: id })
    if (form) {
      ctx.body = {
        name: form.name || form.api,
        api: form.api,
        components: form.components,
        layouts: form.layouts,
      }
    } else {
      throw new ApiError(ApiErrorNames.FormNotExist)
    }
  }

  static async getFormByApi(ctx) {
    let request = ctx.request.body
    if (!request.api) {
      throw new ApiError('表单API不能为空')
    }
    let form = await Form.findOne({ api: request.api })
    if (form) {
      ctx.body = {
        name: form.name,
        api: form.api,
        components: form.components,
        layouts: form.layouts
      }
    } else {
      throw new ApiError(ApiErrorNames.FormNotExist)
    }
  }

  static async saveForm(ctx) {
    let request = ctx.request.body
    if (!request.api) {
      throw new ApiError('表单API不能为空')
    }
    let form = new Form({
      name: request.name || request.api,
      api: request.api,
      components: request.components,
      layouts: request.layouts
    })
    form = await form.save()
    ctx.body = form
  }

  static async updateForm(ctx) {
    let request = ctx.request.body
    let form = await Form.findOne({ api: request.api })
    if (form) {
      form.name = request.name || request.api
      form.api = request.api
      form.components = request.components
      form.layouts = request.layouts
      form = await form.save()
      ctx.body = form
    } else {
      throw new ApiError(ApiErrorNames.FormNotExist)
    }
  }
}

export default FormController
