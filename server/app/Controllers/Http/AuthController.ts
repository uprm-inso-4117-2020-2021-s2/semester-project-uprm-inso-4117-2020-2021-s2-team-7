import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Tutor from 'App/Models/Tutor'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const validations = await schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'tutors', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
      tfirst_name: schema.string({}),
      tlast_name: schema.string({}),
      tphone: schema.string({}),
      tnationality: schema.string({}),
      tage: schema.number([rules.unsigned()]),
      tsummary: schema.string({}),
      toverview: schema.string({}),
      tweekdays_day: schema.boolean.optional(),
      tweekdays_eve: schema.boolean.optional(),
      tweekends: schema.boolean.optional(),
    })

    // this returns an unprocessable entity with status code 422
    const data = await request.validate({
      schema: validations,
    })

    try {
      const tutor = await Tutor.create(data)
      return response.created({ message: 'Tutor registered successfully.', tutor })
    } catch (err) {
      return response.internalServerError({
        message: 'Could not create User, something went wrong.',
        error: err.toString(),
      })
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    if (!(email && password))
      return response.badRequest({ message: 'A valid email and password must be provided.' })
    try {
      // Authentication type: Bearer
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '10 days',
      })
      return response.send({ message: 'Authenticated successfully.', token: token.toJSON() })
    } catch (err) {
      return response.internalServerError({
        message: 'Server error while authentication.',
        error: err.toString(),
      })
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    try {
      await auth.use('api').logout()
      return response.send({ loggedOut: true })
    } catch (err) {
      return response.internalServerError({
        message: 'Error while user logout, something went wrong.',
      })
    }
  }
}
