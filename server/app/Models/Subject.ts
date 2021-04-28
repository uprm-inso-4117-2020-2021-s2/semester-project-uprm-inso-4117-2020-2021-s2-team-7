import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm' // hasManyThrough, HasManyThrough
import APIModel from 'App/Models/APIModel'
import LevelOfEducation from 'App/Models/LevelOfEducation'
import { DateTime } from 'luxon'
// import Tutor from 'App/Models/Tutor'
// import Offer from 'App/Models/Offer'

export default class Subject extends BaseModel implements APIModel {
  public serializeExtras = true
  public requiredParams: string[] = ['sname']

  @column({ isPrimary: true })
  public sid: number

  @column({ columnName: 'sname' })
  public sName: string

  @manyToMany(() => LevelOfEducation, {
    pivotTable: 'subject_levels',
    localKey: 'sid',
    pivotForeignKey: 'subject_id',
    relatedKey: 'leid',
    pivotRelatedForeignKey: 'level_of_education_id',
  })
  public levelOfEducations: ManyToMany<typeof LevelOfEducation>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // @hasManyThrough([() => Offer, () => Tutor])
  // public tutors: HasManyThrough<typeof Tutor>
}
