import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'

export default class Message extends BaseModel implements APIModel {
  public requiredParams: string[] = [
    'mmodality',
    'mmessage',
    'mphone',
    'memail',
  ]

  @column({ isPrimary: true })
  public mid: number

  @column({ columnName: 'mmodality' })
  public mModality: string

  @column({ columnName: 'mmessage' })
  public mMessage: string

  @column({ columnName: 'mphone' })
  public mPhone: string

  @column({ columnName: 'memail' })
  public mEmail: string

  
}
