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
import Subject from 'App/Models/Subject'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Tutor extends BaseModel implements APIModel {
  public serializeExtras = true
  public requiredParams: string[] = [
    'tfirst_name',
    'tlast_name',
    'tphone',
    'tnationality',
    'tage',
    'tsummary',
    'toverview',
    'email',
    'password',
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

  @manyToMany(() => Subject, {
    pivotTable: 'offers',
    localKey: 'tid',
    pivotForeignKey: 'tutor_id',
    relatedKey: 'sid',
    pivotRelatedForeignKey: 'subject_id',
  })
  public subjects: ManyToMany<typeof Subject>

  @column({ columnName: 'tfirst_name' })
  public tFirstName: string

  @column({ columnName: 'tlast_name' })
  public tLastName: string

  @column({ columnName: 'tphone' })
  public tPhone: string

  @column({ columnName: 'tnationality' })
  public tNationality: string

  @column({ columnName: 'tage' })
  public tAge: number

  @column({ columnName: 'tsummary' })
  public tSummary: string

  @column({ columnName: 'toverview' })
  public tOverview: string

  @column({ columnName: 'tweekdays_day' })
  public tWeekdaysDay: boolean

  @column({ columnName: 'tweekdays_eve' })
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
