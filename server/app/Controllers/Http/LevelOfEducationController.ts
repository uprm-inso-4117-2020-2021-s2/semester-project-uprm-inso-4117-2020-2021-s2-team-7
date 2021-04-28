import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LevelOfEducation from 'App/Models/LevelOfEducation'
import GenericController from 'App/Controllers/Http/GenericController'

export default class LevelOfEducationController {
  // Get all LevelOfEducation.
  public async index({ response }: HttpContextContract) {
    try {
      return await LevelOfEducation.query().preload('certifications').preload('offers').exec()
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while getting all LevelOfEducation.',
        error: err.toString(),
      })
    }
  }

  // Create new LevelOfEducation.
  public async store({ request, response }: HttpContextContract) {
    let variables = GenericController.getValidVariables(request, new LevelOfEducation())
    if (!variables) {
      return response.badRequest({
        message: 'Specify the required parameters to create a LevelOfEducation',
      })
    }
    try {
      let createdLevelOfEducation: LevelOfEducation = await LevelOfEducation.create(variables)
      return response.created({
        message: 'LevelOfEducation created successfully.',
        id: createdLevelOfEducation.leid,
      })
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while creating LevelOfEducation.',
        error: err.toString(),
      })
    }
  }

  // Get LevelOfEducation by id.
  public async show({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided.' })
    try {
      const levelOfEducation: LevelOfEducation | null = await LevelOfEducation.query()
        .preload('certifications')
        .preload('offers')
        .first()
      if (!levelOfEducation) {
        return response.notFound({ message: `LevelOfEducation with id ${params.id} not found.` })
      }
      return response.send(levelOfEducation)
    } catch (err) {
      return response.internalServerError({
        message: `Server error while searching for LevelOfEducation with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  // Update existing LevelOfEducation.
  public async update({ request, response, params }: HttpContextContract) {
    let validParams = GenericController.getValidVariables(request, new LevelOfEducation(), true)

    if (!(validParams && params.id)) {
      return response.badRequest({ message: 'A valid id and data must be provided.' })
    }
    try {
      let levelOfEducation: LevelOfEducation | null = await LevelOfEducation.find(params.id)
      if (!levelOfEducation)
        return response.notFound({
          message: `Could not find LevelOfEducation with id: ${params.id}`,
        })
      levelOfEducation.merge(validParams)
      await levelOfEducation.save()
      return response.send({ message: 'LevelOfEducation updated successfully.', levelOfEducation })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while updating LevelOfEducation with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  // Delete existing LevelOfEducation.
  public async destroy({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided' })
    try {
      let levelOfEducation: LevelOfEducation | null = await LevelOfEducation.find(params.id)
      if (!levelOfEducation)
        return response.notFound({
          message: `Could not find LevelOfEducation with id: ${params.id}.`,
        })
      await levelOfEducation.delete()
      return response.send({ message: `LevelOfEducation deleted successfully`, id: params.id })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while deleting LevelOfEducation with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }
}
