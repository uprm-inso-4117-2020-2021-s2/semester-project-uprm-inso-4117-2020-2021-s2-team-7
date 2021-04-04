import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'
import User from 'App/Models/User'

export default class Tutor extends BaseModel implements APIModel {
  public requiredParams: string[] = [
    'tfirst_name',
    'tlast_name',
    'tphone',
    'tnationality',
    'tage',
    'tsummary',
    'toverview',
    'user_id',
  ]

  @column({ isPrimary: true })
  public tid: number

  @column({ columnName: 'user_id' })
  public userId: number

  @belongsTo(() => User, { localKey: 'uid', foreignKey: 'userId' })
  public user: BelongsTo<typeof User>

  @column({ columnName: 'tfirst_name' })
  public tFirstName: string

  @column({ columnName: 'tlast_name' })
  public tLastName: string

  @column({ columnName: 'tphone' })
  public tPhone: string

  @column({ columnName: 'tnationality' })
  public tNationality: string

  @column({ columnName: 'tage' })
  public tAge: number

  @column({ columnName: 'tsummary' })
  public tSummary: string

  @column({ columnName: 'toverview' })
  public tOverview: string

  @column({ columnName: 'tweekdays_day' })
  public tWeekdaysDay: boolean

  @column({ columnName: 'tweekdays_eve' })
  public tWeekdaysEve: boolean

  @column({ columnName: 'tweekends' })
  public tWeekends: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public get fullName() {
    return `${this.tFirstName} ${this.tLastName}`
  }
}
