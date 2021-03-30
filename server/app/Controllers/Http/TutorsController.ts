import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tutor from 'App/Models/Tutor'

export default class TutorsController {
  // Get all tutors.
  public async index({}: HttpContextContract) {
    return await Tutor.all()
  }

  // Create new tutor.
  public async store({}: HttpContextContract) {}

  // Get tutor by id.
  public async show({}: HttpContextContract) {
    return await Tutor.findBy('id', 3)
  }

  // Update existing tutor.
  public async update({}: HttpContextContract) {}

  // Delete existing tutor.
  public async destroy({}: HttpContextContract) {}
}
