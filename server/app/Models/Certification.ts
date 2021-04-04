import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'

export default class Certification extends BaseModel implements APIModel {
  public requiredParams: string[] = ['cschool', 'csubject', 'cserial_name']

  @column({ isPrimary: true })
  public cid: number

  @column({ columnName: 'cschool' })
  public cSchool: string

  @column({ columnName: 'csubject' })
  public cSubject: string

  @column({ columnName: 'cserial_name' })
  public cSerial_Name: string
}
