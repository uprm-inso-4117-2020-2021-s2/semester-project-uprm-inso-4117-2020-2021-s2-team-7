import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Certification from 'App/Models/Certification'
import GenericController from 'App/Controllers/Http/GenericController'

export default class CertificationController {
  // Get all Certification.
  public async index({ response }: HttpContextContract) {
    try {
      return await Certification.all()
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while getting all Certification.',
        error: err.toString(),
      })
    }
  }

  // Create new Certification.
  public async store({ request, response }: HttpContextContract) {
    let variables = GenericController.getValidVariables(request, new Certification())
    if (!variables) {
      return response.badRequest({ message: 'Specify the required parameters to create a Certification' })
    }
    try {
      let createdCertification: Certification = await Certification.create(variables)
      return response.created({ message: 'Certification created successfully.', id: createdCertification.cid })
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while creating Certification.',
        error: err.toString(),
      })
    }
  }

  // Get Certification by id.
  public async show({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided.' })
    try {
      const certification: Certification | null = await Certification.find(params.id)
      if (!certification) {
        return response.notFound({ message: `Certification with id ${params.id} not found.` })
      }
      return response.send(certification)
    } catch (err) {
      return response.internalServerError({
        message: `Server error while searching for Certification with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  // Update existing Certification.
  public async update({ request, response, params }: HttpContextContract) {
    let validParams = GenericController.getValidVariables(request, new Certification(), true)
    
    if (!(validParams && params.id)) {
      return response.badRequest({ message: 'A valid id and data must be provided.' })
    }
    try {
      let certification: Certification | null = await Certification.find(params.id)
      if (!certification)
        return response.notFound({ message: `Could not find Certification with id: ${params.id}` })
      certification.merge(validParams)
      await certification.save()
      return response.send({ message: 'Certification updated successfully.', certification })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while updating Certification with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  // Delete existing Certification.
  public async destroy({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided' })
    try {
      let certification: Certification | null = await Certification.find(params.id)
      if (!certification)
        return response.notFound({ message: `Could not find Certification with id: ${params.id}.` })
      await certification.delete()
      return response.send({ message: `Certification deleted successfully`, id: params.id })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while deleting Certification with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }
}
