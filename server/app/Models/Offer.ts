import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'
// import Tutor from 'App/Models/Tutor'
// import Subject from 'App/Models/Subject'

export default class Offer extends BaseModel implements APIModel {
  public serializeExtras = true
  public requiredParams: string[] = ['tutor_id', 'subject_id']

  @column({ isPrimary: true })
  public oid: number

  @column({ columnName: 'tutor_id' })
  public tutorId: number

  @column({ columnName: 'subject_id' })
  public subjectId: number

  // @belongsTo(() => Tutor, { localKey: 'tid', foreignKey: 'tutorId' })
  // public tutor: BelongsTo<typeof Tutor>
  //
  // @belongsTo(() => Subject, { localKey: 'sid', foreignKey: 'subjectId' })
  // public subject: BelongsTo<typeof Subject>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
