import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'
import Tutor from 'App/Models/Tutor'
import LevelOfEducation from 'App/Models/LevelOfEducation'

export default class Certification extends BaseModel implements APIModel {
  public requiredParams: string[] = ['cschool', 'csubject', 'cserial_name', 'tutor_id']

  @column({ isPrimary: true })
  public cid: number

  @column({ columnName: 'tutor_id' })
  public tutorId: number

  @column({ columnName: 'level_of_education_id' })
  public levelOfEducationId: number

  @belongsTo(() => Tutor, { localKey: 'tid', foreignKey: 'tutorId' })
  public tutor: BelongsTo<typeof Tutor>

  @belongsTo(() => LevelOfEducation, { localKey: 'leid', foreignKey: 'levelOfEducationId' })
  public levelOfEducation: BelongsTo<typeof LevelOfEducation>

  @column({ columnName: 'cschool' })
  public cSchool: string

  @column({ columnName: 'csubject' })
  public cSubject: string

  @column({ columnName: 'cserial_name' })
  public cSerial_Name: string
}
