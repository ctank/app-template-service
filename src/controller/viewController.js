import View from '../model/view'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'

class ViewController {
  static async getAllView(ctx) {
    const res = await View.find({})
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

  static async getViewById(ctx) {
    const { id } = ctx.params
    const view = await View.findById(id)
    if (view) {
      ctx.body = {
        name: view.name || view.api,
        api: view.api,
        components: view.components,
        layouts: view.layouts
      }
    } else {
      throw new ApiError(ApiErrorNames.ViewNotExist)
    }
  }

  static async getViewByApi(ctx) {
    let request = ctx.request.body
    if (!request.api) {
      throw new ApiError('表单API不能为空')
    }
    let view = await View.findOne({ api: request.api })
    if (view) {
      ctx.body = {
        name: view.name,
        api: view.api,
        components: view.components,
        layouts: view.layouts
      }
    } else {
      throw new ApiError(ApiErrorNames.ViewNotExist)
    }
  }

  static async saveView(ctx) {
    let request = ctx.request.body
    if (!request.api) {
      throw new ApiError('表单API不能为空')
    }
    let view = new View({
      name: request.name || request.api,
      api: request.api,
      components: request.components,
      layouts: request.layouts
    })
    view = await view.save()
    ctx.body = view
  }

  static async updateView(ctx) {
    let request = ctx.request.body
    let view = await View.findById(request.id)
    if (view) {
      view.name = request.name || request.api
      view.api = request.api
      view.components = request.components
      view.layouts = request.layouts
      view = await view.save()
      ctx.body = view
    } else {
      throw new ApiError(ApiErrorNames.ViewNotExist)
    }
  }
}

export default ViewController
