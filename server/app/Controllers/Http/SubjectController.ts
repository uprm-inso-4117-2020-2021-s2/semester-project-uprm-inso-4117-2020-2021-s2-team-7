import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subject from 'App/Models/Subject'
import GenericController from 'App/Controllers/Http/GenericController'

export default class SubjectController {
  // Get all Subject.
  public async index({ response }: HttpContextContract) {
    try {
      return await Subject.query().preload('levelOfEducations').exec()
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while getting all Subject.',
        error: err.toString(),
      })
    }
  }

  // Create new Subject.
  public async store({ request, response }: HttpContextContract) {
    let variables = GenericController.getValidVariables(request, new Subject())
    if (!variables) {
      return response.badRequest({ message: 'Specify the required parameters to create a Subject' })
    }
    try {
      let createdSubject: Subject = await Subject.create(variables)
      return response.created({ message: 'Subject created successfully.', id: createdSubject.sid })
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while creating Subject.',
        error: err.toString(),
      })
    }
  }

  // Get Subject by id.
  public async show({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided.' })
    try {
      const subject: Subject | null = await Subject.query()
        .preload('levelOfEducations')
        .where('sid', params.id)
        .first()
      if (!subject) {
        return response.notFound({ message: `Subject with id ${params.id} not found.` })
      }
      return response.send(subject)
    } catch (err) {
      return response.internalServerError({
        message: `Server error while searching for Subject with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  // Update existing Subject.
  public async update({ request, response, params }: HttpContextContract) {
    let validParams = GenericController.getValidVariables(request, new Subject(), true)
    if (!(validParams && params.id)) {
      return response.badRequest({ message: 'A valid id and data must be provided.' })
    }
    try {
      let subject: Subject | null = await Subject.query()
        .preload('levelOfEducations')
        .where('sid', params.id)
        .first()
      if (!subject)
        return response.notFound({ message: `Could not find Subject with id: ${params.id}` })
      subject.merge(validParams)
      await subject.save()
      return response.send({ message: 'Subject updated successfully.', subject })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while updating Subject with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  // Delete existing Subject.
  public async destroy({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided' })
    try {
      let subject: Subject | null = await Subject.find(params.id)
      if (!subject)
        return response.notFound({ message: `Could not find subject with id: ${params.id}.` })
      await subject.delete()
      return response.send({ message: `Subject deleted successfully`, id: params.id })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while deleting subject with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }
}
