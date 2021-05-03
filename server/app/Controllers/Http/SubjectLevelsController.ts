import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SubjectLevel from 'App/Models/SubjectLevel'
import GenericController from 'App/Controllers/Http/GenericController'

export default class SubjectLevelsController {
  public async index({ response }: HttpContextContract) {
    try {
      return await SubjectLevel.all()
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while getting all Subject Level.',
        error: err.toString(),
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    let variables = GenericController.getValidVariables(request, new SubjectLevel())
    if (!variables) {
      return response.badRequest({
        message: 'Specify the required parameters to create a Subject Level',
      })
    }
    try {
      let createdSubjectLevel: SubjectLevel = await SubjectLevel.create(variables)
      return response.created({
        message: 'Subject level created successfully.',
        id: createdSubjectLevel.slid,
      })
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while creating Subject Level.',
        error: err.toString(),
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided.' })
    try {
      const subjectLevel: SubjectLevel | null = await SubjectLevel.find(params.id)
      if (!subjectLevel) {
        return response.notFound({ message: `Subject Level with id ${params.id} not found.` })
      }
      return response.send(subjectLevel)
    } catch (err) {
      return response.internalServerError({
        message: `Server error while searching for Subject Level with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    let validParams = GenericController.getValidVariables(request, new SubjectLevel(), true)
    if (!(validParams && params.id)) {
      return response.badRequest({ message: 'A valid id and data must be provided.' })
    }
    try {
      let subjectLevel: SubjectLevel | null = await SubjectLevel.find(params.id)
      if (!subjectLevel)
        return response.notFound({ message: `Could not find Subject Level with id: ${params.id}` })
      subjectLevel.merge(validParams)
      await subjectLevel.save()
      return response.send({ message: 'Subject Level updated successfully.', subjectLevel })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while updating Subject Level with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided' })
    try {
      let subjectLevel: SubjectLevel | null = await SubjectLevel.find(params.id)
      if (!subjectLevel)
        return response.notFound({ message: `Could not find subject level with id: ${params.id}.` })
      await subjectLevel.delete()
      return response.send({ message: `Subject Level deleted successfully`, id: params.id })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while deleting subject level with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }
}
