import { RequestContract } from '@ioc:Adonis/Core/Request'
import APIModel from 'App/Models/APIModel'

export default class GenericController {
  public static getValidVariables(
    request: RequestContract,
    model: APIModel,
    onUpdate: boolean = false
  ): Object {
    let data = request.only(model.requiredParams)
    if (!onUpdate && Object.keys(data).length !== model.requiredParams.length) return false
    return data
  }
}
