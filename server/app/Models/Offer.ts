import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'
import Tutor from 'App/Models/Tutor'
import Subject from 'App/Models/Subject'
import LevelOfEducation from 'App/Models/LevelOfEducation'

export default class Offer extends BaseModel implements APIModel {
  public serializeExtras = true
  public requiredParams: string[] = [
    'tutor_id',
    'subject_id',
    'level_of_education_id',
    'modality',
    'hourly_rate',
  ]

  @column({ isPrimary: true })
  public oid: number

  @column({ columnName: 'tutor_id' })
  public tutorId: number

  @belongsTo(() => Tutor, { localKey: 'tid', foreignKey: 'tutorId' })
  public tutor: BelongsTo<typeof Tutor>

  @column({ columnName: 'subject_id' })
  public subjectId: number

  @column({ columnName: 'level_of_education_id' })
  public levelOfEducationId: number

  @column({ columnName: 'modality' })
  public modality: string

  @column({ columnName: 'hourly_rate' })
  public hourlyRate: number

  @belongsTo(() => Subject, { localKey: 'sid', foreignKey: 'subjectId' })
  public subject: BelongsTo<typeof Subject>

  @belongsTo(() => LevelOfEducation, { localKey: 'leid', foreignKey: 'levelOfEducationId' })
  public levelOfEducation: BelongsTo<typeof LevelOfEducation>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
