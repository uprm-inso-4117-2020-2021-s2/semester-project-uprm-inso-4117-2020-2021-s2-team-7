import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'
import Tutor from 'App/Models/Tutor'

export default class Message extends BaseModel implements APIModel {
  public requiredParams: string[] = ['mmodality', 'mmessage', 'mphone', 'memail', 'tutor_id']

  @column({ isPrimary: true })
  public mid: number

  @column({ columnName: 'tutor_id' })
  public tutorId: number

  @belongsTo(() => Tutor, { localKey: 'tid', foreignKey: 'tutorId' })
  public tutor: BelongsTo<typeof Tutor>

  @column({ columnName: 'mmodality' })
  public mModality: string

  @column({ columnName: 'mmessage' })
  public mMessage: string

  @column({ columnName: 'mphone' })
  public mPhone: string

  @column({ columnName: 'memail' })
  public mEmail: string
}
