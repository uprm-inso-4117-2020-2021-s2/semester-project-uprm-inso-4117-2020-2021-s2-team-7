import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'
import Tutor from 'App/Models/Tutor'

export default class Address extends BaseModel implements APIModel {
  public requiredParams: string[] = [
    'astreet1',
    'astreet2',
    'acity',
    'acountry',
    'azipcode',
    'tutor_id',
  ]

  @column({ isPrimary: true })
  public aid: number

  @column({ columnName: 'tutor_id' })
  public tutorId: number

  @belongsTo(() => Tutor, { localKey: 'tid', foreignKey: 'tutorId' })
  public tutor: BelongsTo<typeof Tutor>

  @column({ columnName: 'astreet1' })
  public aStreet1: string

  @column({ columnName: 'astreet2' })
  public aStreet2?: string

  @column({ columnName: 'acity' })
  public aCity: string

  @column({ columnName: 'acountry' })
  public aCountry: string

  @column({ columnName: 'azipcode' })
  public azipcode: string
}
