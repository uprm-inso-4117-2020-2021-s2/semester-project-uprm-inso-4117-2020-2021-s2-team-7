import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'

export default class SubjectLevel extends BaseModel implements APIModel {
  public requiredParams: string[] = [
    'subject_id',
    'level_of_education_id',
    'slmodality',
    'slhourly_rate',
  ]

  @column({ isPrimary: true })
  public slid: number

  @column({ columnName: 'level_of_education_id' })
  public leid: number

  @column({ columnName: 'subject_id' })
  public sId: number

  @column({ columnName: 'slmodality' })
  public slModality: string

  @column({ columnName: 'slhourly_rate' })
  public slHourlyRate: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
