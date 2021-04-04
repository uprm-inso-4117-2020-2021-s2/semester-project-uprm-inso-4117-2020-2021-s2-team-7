import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tutor from 'App/Models/Tutor'
import GenericController from 'App/Controllers/Http/GenericController'
import User from 'App/Models/User'

export default class TutorsController {
  // Get all tutors.
  public async index({ response }: HttpContextContract) {
    try {
      return await Tutor.all()
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while getting all Tutors.',
        error: err.toString(),
      })
    }
  }

  // Create new tutor.
  public async store({ request, response }: HttpContextContract) {
    const variables = GenericController.getValidVariables(request, new Tutor())
    if (!variables) {
      return response.badRequest({ message: 'Specify the required parameters to create a Tutor' })
    }
    const uid = request.input('user_id', false)
    if (uid) {
      const uniqueUser = await User.find(uid)
      if (uniqueUser !== null) return response.badRequest({ message: 'User already exists.' })
    }
    try {
      let createdTutor: Tutor = await Tutor.create(variables)
      return response.created({ message: 'Tutor created successfully.', id: createdTutor.tid })
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while creating Tutor.',
        error: err.toString(),
      })
    }
  }

  // Get tutor by id.
  public async show({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided.' })
    try {
      const tutor: Tutor | null = await Tutor.find(params.id)
      if (!tutor) {
        return response.notFound({ message: `Tutor with id ${params.id} not found.` })
      }
      return response.send(tutor)
    } catch (err) {
      return response.internalServerError({
        message: `Server error while searching for tutor with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  // Update existing tutor.
  public async update({ request, response, params }: HttpContextContract) {
    let validParams = GenericController.getValidVariables(request, new Tutor(), true)
    if (!(validParams && params.id)) {
      return response.badRequest({ message: 'A valid id and data must be provided.' })
    }
    try {
      let tutor: Tutor | null = await Tutor.find(params.id)
      if (!tutor)
        return response.notFound({ message: `Could not find tutor with id: ${params.id}` })
      tutor.merge(validParams)
      await tutor.save()
      return response.send({ message: 'Tutor updated successfully.', tutor })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while updating tutor with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  // Delete existing tutor.
  public async destroy({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided' })
    try {
      let tutor: Tutor | null = await Tutor.find(params.id)
      if (!tutor)
        return response.notFound({ message: `Could not find tutor with id: ${params.id}.` })
      await tutor.delete()
      return response.send({ message: `Tutor deleted successfully`, id: params.id })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while deleting tutor with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }
}
