import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm' // hasManyThrough, HasManyThrough
import APIModel from 'App/Models/APIModel'
// import Tutor from 'App/Models/Tutor'
// import Offer from 'App/Models/Offer'

export default class Subject extends BaseModel implements APIModel {
  public requiredParams: string[] = ['sname']

  @column({ isPrimary: true })
  public sid: number

  @column({ columnName: 'sname' })
  public sName: string

  // @hasManyThrough([() => Offer, () => Tutor])
  // public tutors: HasManyThrough<typeof Tutor>
}
