import View from '../model/view'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'

class ViewController {
  static async getAllView(ctx) {
    ctx.body = await View.find({})
  }

  static async getViewById(ctx) {
    let id = ctx.query.id
    let view = await View.findOne({ id: id })
    if (view) {
      ctx.body = view
    } else {
      throw new ApiError(ApiErrorNames.ViewNotExist)
    }
  }

  static async saveView(ctx) {
    let request = ctx.request.body
    if (!request.viewName) {
      throw new ApiError(ApiErrorNames.ViewNameNotNull)
    }
    let view = new View({
      viewName: request.viewName,
      age: request.age,
      tags: request.tags
    })
    view = await view.save()
    ctx.body = view
  }
}

export default ViewController
