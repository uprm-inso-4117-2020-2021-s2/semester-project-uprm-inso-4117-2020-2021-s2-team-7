import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Offer from 'App/Models/Offer'
import GenericController from 'App/Controllers/Http/GenericController'

export default class OffersController {
  public async index({ response }: HttpContextContract) {
    try {
      return await Offer.all()
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while getting all Offers.',
        error: err.toString(),
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const variables = GenericController.getValidVariables(request, new Offer())
    if (!variables) {
      return response.badRequest({ message: 'Specify the required parameters to create an Offer.' })
    }
    try {
      let createdOffer: Offer = await Offer.create(variables)
      return response.created({ message: 'Offer created successfully.', id: createdOffer.oid })
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while creating Offer.',
        error: err.toString(),
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided.' })
    try {
      const offer: Offer | null = await Offer.find(params.id)
      if (!offer) {
        return response.notFound({ message: `Offer with id ${params.id} not found.` })
      }
      return response.send(offer)
    } catch (err) {
      return response.internalServerError({
        message: `Server error while searching for offer with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    let validParams = GenericController.getValidVariables(request, new Offer(), true)
    if (!(validParams && params.id)) {
      return response.badRequest({ message: 'A valid id and data must be provided.' })
    }
    try {
      let offer: Offer | null = await Offer.find(params.id)
      if (!offer)
        return response.notFound({ message: `Could not find Offer with id: ${params.id}` })
      offer.merge(validParams)
      await offer.save()
      return response.send({ message: 'Offer updated successfully.', offer })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while updating Offer with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided' })
    try {
      let offer: Offer | null = await Offer.find(params.id)
      if (!offer)
        return response.notFound({ message: `Could not find offer with id: ${params.id}.` })
      await offer.delete()
      return response.send({ message: `Offer deleted successfully`, id: params.id })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while deleting Offer with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }
}
