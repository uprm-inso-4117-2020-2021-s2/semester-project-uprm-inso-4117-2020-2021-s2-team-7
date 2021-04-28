import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Language from 'App/Models/Language'

export default class LanguagesController {
  public async index({ response }: HttpContextContract) {
    try {
      return await Language.all()
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while getting all Languages.',
        error: err.toString(),
      })
    }
  }
}
