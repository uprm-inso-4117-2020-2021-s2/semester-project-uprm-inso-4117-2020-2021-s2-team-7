import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'
import GenericController from 'App/Controllers/Http/GenericController'

export default class MessageController {
  // Get all Message.
  public async index({ response }: HttpContextContract) {
    try {
      return await Message.query().preload('tutor').exec()
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while getting all Message.',
        error: err.toString(),
      })
    }
  }

  // Create new Message.
  public async store({ request, response }: HttpContextContract) {
    let variables = GenericController.getValidVariables(request, new Message())
    if (!variables) {
      return response.badRequest({ message: 'Specify the required parameters to create a Message' })
    }
    try {
      let createdMessage: Message = await Message.create(variables)
      return response.created({ message: 'Message created successfully.', id: createdMessage.mid })
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while creating Message.',
        error: err.toString(),
      })
    }
  }

  // Get Message by id.
  public async show({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided.' })
    try {
      const mmessage: Message | null = await Message.query()
        .preload('tutor')
        .where('mid', params.id)
        .first()
      if (!mmessage) {
        return response.notFound({ message: `Message with id ${params.id} not found.` })
      }
      return response.send(mmessage)
    } catch (err) {
      return response.internalServerError({
        message: `Server error while searching for message with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  // Update existing Message.
  public async update({ request, response, params }: HttpContextContract) {
    let validParams = GenericController.getValidVariables(request, new Message(), true)

    if (!(validParams && params.id)) {
      return response.badRequest({ message: 'A valid id and data must be provided.' })
    }
    try {
      let mmessage: Message | null = await Message.find(params.id)
      if (!mmessage)
        return response.notFound({ message: `Could not find Message with id: ${params.id}` })
      mmessage.merge(validParams)
      await mmessage.save()
      return response.send({ message: 'Message updated successfully.', mmessage })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while updating Message with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  // Delete existing Message.
  public async destroy({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided' })
    try {
      let mmessage: Message | null = await Message.find(params.id)
      if (!mmessage)
        return response.notFound({ message: `Could not find mmessage with id: ${params.id}.` })
      await mmessage.delete()
      return response.send({ message: `Message deleted successfully`, id: params.id })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while deleting Message with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }
}
