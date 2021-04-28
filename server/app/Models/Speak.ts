import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'

export default class Speak extends BaseModel implements APIModel {
  public serializeExtras = true
  public requiredParams: string[] = ['tutor_id', 'language_id', 'is_native']

  @column({ isPrimary: true })
  public spid: number

  @column({ columnName: 'tutor_id' })
  public tutorId: number

  @column({ columnName: 'language_id' })
  public languageId: number

  @column({ columnName: 'is_native' })
  public is_native: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
