import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'

export default class Address extends BaseModel implements APIModel {
  public requiredParams: string[] = [
    'astreet1',
    'acity',
    'acountry',
    'azipcode',
  ]

  @column({ isPrimary: true })
  public aid: number

  @column({ columnName: 'astreet1' })
  public aStreet1: string

  @column({ columnName: 'astreet2' })
  public aStreet2: string

  @column({ columnName: 'acity' })
  public aCity: string

  @column({ columnName: 'acountry' })
  public aCountry: string

  @column({ columnName: 'azipcode' })
  public azipcode: string
  
}
