import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tutors extends BaseSchema {
  protected tableName = 'tutors'

  public async up() {
    let exist = await this.schema.hasTable(this.tableName)

    if (!exist) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('tid')
        table.string('email', 255).notNullable()
        table.string('password', 180).notNullable()
        table.string('remember_me_token').nullable()
        table.string('tfirst_name').notNullable()
        table.string('tlast_name').notNullable()
        table.string('tphone').notNullable()
        table.string('tnationality').notNullable()
        table.integer('tage').notNullable()
        table.string('tsummary').notNullable()
        table.text('toverview').notNullable()
        table.boolean('tweekdays_day').defaultTo(false)
        table.boolean('tweekdays_eve').defaultTo(false)
        table.boolean('tweekends').defaultTo(false)
        table.timestamps(true)
      })
    }
  }

  public async down() {
    if (await this.schema.hasTable(this.tableName)) this.schema.dropTable(this.tableName)
  }
}
