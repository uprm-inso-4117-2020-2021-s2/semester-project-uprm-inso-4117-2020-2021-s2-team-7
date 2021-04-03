import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import GenericController from 'App/Controllers/Http/GenericController'

export default class AddressController {
  // Get all Address.
  public async index({ response }: HttpContextContract) {
    try {
      return await Address.all()
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while getting all Address.',
        error: err.toString(),
      })
    }
  }

  // Create new Address.
  public async store({ request, response }: HttpContextContract) {
    let variables = GenericController.getValidVariables(request, new Address())
    if (!variables) {
      return response.badRequest({ message: 'Specify the required parameters to create a Address' })
    }
    try {
      let createdAddress: Address = await Address.create(variables)
      return response.created({ message: 'Address created successfully.', id: createdAddress.aid })
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while creating Address.',
        error: err.toString(),
      })
    }
  }

  // Get Address by id.
  public async show({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided.' })
    try {
      const address: Address | null = await Address.find(params.id)
      if (!address) {
        return response.notFound({ message: `Address with id ${params.id} not found.` })
      }
      return response.send(address)
    } catch (err) {
      return response.internalServerError({
        message: `Server error while searching for address with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  // Update existing Address.
  public async update({ request, response, params }: HttpContextContract) {
    let validParams = GenericController.getValidVariables(request, new Address(), true)
    
    if (!(validParams && params.id)) {
      return response.badRequest({ message: 'A valid id and data must be provided.' })
    }
    try {
      let address: Address | null = await Address.find(params.id)
      if (!address)
        return response.notFound({ message: `Could not find Address with id: ${params.id}` })
      address.merge(validParams)
      await address.save()
      return response.send({ message: 'Address updated successfully.', address })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while updating Address with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }

  // Delete existing Address.
  public async destroy({ response, params }: HttpContextContract) {
    if (!params.id) return response.badRequest({ message: 'A valid id must be provided' })
    try {
      let address: Address | null = await Address.find(params.id)
      if (!address)
        return response.notFound({ message: `Could not find address with id: ${params.id}.` })
      await address.delete()
      return response.send({ message: `Address deleted successfully`, id: params.id })
    } catch (err) {
      return response.internalServerError({
        message: `Server error while deleting Address with id: ${params.id}`,
        error: err.toString(),
      })
    }
  }
}
