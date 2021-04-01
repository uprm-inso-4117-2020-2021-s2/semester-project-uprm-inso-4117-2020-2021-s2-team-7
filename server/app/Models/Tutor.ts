import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Encryption from '@ioc:Adonis/Core/Encryption'
import APIModel from 'App/Models/APIModel'

export default class Tutor extends BaseModel implements APIModel {
  public requiredParams: string[] = [
    'tfirst_name',
    'tlast_name',
    'temail',
    'tpassword',
    'tphone',
    'tnationality',
    'tage',
    'tsummary',
    'toverview',
  ]

  @column({ isPrimary: true })
  public tid: number

  @column({ columnName: 'tfirst_name' })
  public tFirstName: string

  @column({ columnName: 'tlast_name' })
  public tLastName: string

  @column({ columnName: 'temail' })
  public tEmail: string

  @column({
    prepare: (value: string) => Encryption.encrypt(value),
    consume: (value: string) => Encryption.decrypt(value),
    columnName: 'tpassword',
  })
  public tPassword: string

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
