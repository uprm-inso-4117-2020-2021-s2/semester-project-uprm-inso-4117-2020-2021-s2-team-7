import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tutor from 'App/Models/Tutor'
import GenericController from 'App/Controllers/Http/GenericController'
import { tutorDAO } from 'App/dao/TutorDAO'

export default class TutorsController {
  // Get all tutors.
  public async index({ request, response }: HttpContextContract) {
    let { subjectId, levelOfEducation, languageId } = request.all()
    try {
      if (subjectId && levelOfEducation) {
        return await tutorDAO.getAllRelationshipInId(subjectId, levelOfEducation)
      } else if (subjectId || levelOfEducation)
        return await tutorDAO.getAllRelationshipInId(subjectId || levelOfEducation)
      else if (languageId) return await tutorDAO.getByLanguage(languageId)
      else return await tutorDAO.getAll()
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while getting all Tutors.',
        error: err.toString(),
      })
    }
  }

  // Create new tutor.
  // public async store({ request, response }: HttpContextContract) {
  //   const variables = GenericController.getValidVariables(request, new Tutor())
  //   if (!variables) {
  //     return response.badRequest({ message: 'Specify the required parameters to create a Tutor' })
  //   }
  //   try {
  //     let createdTutor: Tutor = await tutorDAO.create(variables)
  //     return response.created({ message: 'Tutor created successfully.', id: createdTutor.tid })
  //   } catch (err) {
  //     return response.internalServerError({
  //       message: 'Server error while creating Tutor.',
  //       error: err.toString(),
  //     })
  //   }
  // }

  // Get tutor by id.
  public async show({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided.' })
    try {
      const tutor: Tutor | null = await tutorDAO.getById(params.id)
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
      let tutor: Tutor | boolean = await tutorDAO.update(params.id, validParams)
      if (!tutor)
        return response.notFound({ message: `Could not find tutor with id: ${params.id}` })
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
      let tutor: boolean = await tutorDAO.delete(params.id)
      if (!tutor)
        return response.notFound({ message: `Could not find tutor with id: ${params.id}.` })
      return response.send({ message: `Tutor deleted successfully`, id: params.id })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while deleting tutor with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }
}
