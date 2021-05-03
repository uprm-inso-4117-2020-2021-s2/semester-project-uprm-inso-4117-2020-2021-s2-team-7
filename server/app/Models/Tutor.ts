import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  column,
  computed,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import APIModel from 'App/Models/APIModel'
import Address from 'App/Models/Address'
import Message from 'App/Models/Message'
import Certification from 'App/Models/Certification'
import Hash from '@ioc:Adonis/Core/Hash'
import Offer from 'App/Models/Offer'
import Language from 'App/Models/Language'

export default class Tutor extends BaseModel implements APIModel {
  public serializeExtras = true
  public requiredParams: string[] = [
    'tfirst_name',
    'tlast_name',
    'tphone',
    'tage',
    'tsummary',
    'toverview',
    'email',
    'password',
    'tweekdays_day',
    'tweekdays_day',
    'tweekends',
  ]

  @column({ isPrimary: true })
  public tid: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @hasOne(() => Address, { localKey: 'tid', foreignKey: 'tutorId' })
  public address: HasOne<typeof Address>

  @hasMany(() => Message, { localKey: 'tid', foreignKey: 'tutorId' })
  public messages: HasMany<typeof Message>

  @hasMany(() => Certification, { localKey: 'tid', foreignKey: 'tutorId' })
  public certifications: HasMany<typeof Certification>

  @hasMany(() => Offer, { localKey: 'tid', foreignKey: 'tutorId' })
  public offers: HasMany<typeof Offer>

  @manyToMany(() => Language, {
    pivotTable: 'speaks',
    localKey: 'tid',
    pivotForeignKey: 'tutor_id',
    relatedKey: 'lid',
    pivotRelatedForeignKey: 'language_id',
  })
  public languages: ManyToMany<typeof Language>

  @column({ columnName: 'tfirst_name' })
  public tFirstName: string

  @column({ columnName: 'tlast_name' })
  public tLastName: string

  @column({ columnName: 'tphone' })
  public tPhone: string

  @column({ columnName: 'tage' })
  public tAge: number

  @column({ columnName: 'tsummary' })
  public tSummary: string

  @column({ columnName: 'toverview' })
  public tOverview: string

  @column({ columnName: 'tweekdays_day' })
  public tWeekdaysDay: boolean

  @column({ columnName: 'tweekdays_day' })
  public tWeekdaysEve: boolean

  @column({ columnName: 'tweekends' })
  public tWeekends: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(tutor: Tutor) {
    if (tutor.$dirty.password) {
      tutor.password = await Hash.make(tutor.password)
    }
  }

  @computed()
  public get fullName() {
    return `${this.tFirstName} ${this.tLastName}`
  }
}
