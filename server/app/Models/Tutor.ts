import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Encryption from '@ioc:Adonis/Core/Encryption'

export default class Tutor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tFirstName: string

  @column()
  public tLastName: string

  @column()
  public tEmail: string

  @column({
    prepare: (value: string) => Encryption.encrypt(value),
    consume: (value: string) => Encryption.decrypt(value),
  })
  public tPassword: string

  @column()
  public tPhone: string

  @column()
  public tNationality: string

  @column()
  public tAge: number

  @column()
  public tSummary: string

  @column()
  public tOverview: string

  // @column()
  // public tNationality: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public get fullName() {
    return `${this.tFirstName} ${this.tLastName}`
  }
}
