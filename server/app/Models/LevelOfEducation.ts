import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'
import Certification from 'App/Models/Certification'
import Offer from 'App/Models/Offer'

export default class LevelOfEducation extends BaseModel implements APIModel {
  public requiredParams: string[] = ['lename']

  @column({ isPrimary: true })
  public leid: number

  @column({ columnName: 'lename' })
  public leName: string

  @hasMany(() => Certification, { localKey: 'leid', foreignKey: 'levelOfEducationId' })
  public certifications: HasMany<typeof Certification>

  @hasMany(() => Offer, { localKey: 'leid', foreignKey: 'levelOfEducationId' })
  public offers: HasMany<typeof Offer>
}
