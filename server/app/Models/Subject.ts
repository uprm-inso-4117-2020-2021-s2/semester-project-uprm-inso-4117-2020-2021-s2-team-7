import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm' // hasManyThrough, HasManyThrough
import APIModel from 'App/Models/APIModel'
import { DateTime } from 'luxon'
import Offer from 'App/Models/Offer'

export default class Subject extends BaseModel implements APIModel {
  public serializeExtras = true
  public requiredParams: string[] = ['sname']

  @column({ isPrimary: true })
  public sid: number

  @hasMany(() => Offer, { localKey: 'sid', foreignKey: 'subjectId' })
  public offers: HasMany<typeof Offer>

  @column({ columnName: 'sname' })
  public sName: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // @hasManyThrough([() => Offer, () => Tutor])
  // public tutors: HasManyThrough<typeof Tutor>
}
