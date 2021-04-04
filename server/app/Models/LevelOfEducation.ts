import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'

export default class LevelOfEducation extends BaseModel implements APIModel {
  public requiredParams: string[] = ['lename']

  @column({ isPrimary: true })
  public leid: number

  @column({ columnName: 'lename' })
  public leName: string
}
