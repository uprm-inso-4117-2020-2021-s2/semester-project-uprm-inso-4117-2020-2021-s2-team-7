import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'

export default class Subject extends BaseModel implements APIModel {
  public requiredParams: string[] = ['sname']

  @column({ isPrimary: true })
  public sid: number

  @column({ columnName: 'sname' })
  public sName: string
}
