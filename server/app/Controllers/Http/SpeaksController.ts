import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Speak from 'App/Models/Speak'
import GenericController from 'App/Controllers/Http/GenericController'

export default class SpeaksController {
  public async index({ request, response }: HttpContextContract) {
    const { tutorId, languageId } = request.all()
    try {
      if (tutorId && languageId) {
        return await Speak.query()
          .where('tutor_id', '=', tutorId)
          .andWhere('language_id', '=', languageId)
      } else if (tutorId || languageId) {
        let column = tutorId ? 'tutor_id' : 'language_id'
        return await Speak.query().where(column, '=', tutorId || languageId)
      }
      return await Speak.all()
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while getting all Languages.',
        error: err.toString(),
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    let variables = GenericController.getValidVariables(request, new Speak())
    if (!variables) {
      return response.badRequest({
        message: 'Specify the required parameters to create a spoken language.',
      })
    }
    try {
      let createdSpeak: Speak = await Speak.create(variables)
      return response.created({
        message: 'Language spoken created successfully.',
        id: createdSpeak.spid,
      })
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while creating language spoken.',
        error: err.toString(),
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided.' })
    try {
      const speak: Speak | null = await Speak.find(params.id)
      if (!speak) {
        return response.notFound({ message: `Spoken language with id ${params.id} not found.` })
      }
      return response.send(speak)
    } catch (err) {
      return response.internalServerError({
        message: `Server error while searching for spoken language with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    let validParams = GenericController.getValidVariables(request, new Speak(), true)
    if (!(validParams && params.id)) {
      return response.badRequest({ message: 'A valid id and data must be provided.' })
    }
    try {
      let speak: Speak | null = await Speak.find(params.id)
      if (!speak)
        return response.notFound({
          message: `Could not find spoken language with id: ${params.id}`,
        })
      speak.merge(validParams)
      await speak.save()
      return response.send({ message: 'Spoken language updated successfully.', speak })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while updating spoken language with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided' })
    try {
      let speak: Speak | null = await Speak.find(params.id)
      if (!speak)
        return response.notFound({
          message: `Could not find spoken language with id: ${params.id}.`,
        })
      await speak.delete()
      return response.send({ message: `Spoken language deleted successfully`, id: params.id })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while deleting spoken language with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }
}
