import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'
import Tutor from 'App/Models/Tutor'

export default class User extends BaseModel implements APIModel {
  public requiredParams = ['email', 'password']

  @column({ isPrimary: true })
  public uid: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @hasOne(() => Tutor, { localKey: 'uid', foreignKey: 'userId' })
  public tutor: HasOne<typeof Tutor>

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
