import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tutors extends BaseSchema {
  protected tableName = 'tutors'

  public async up() {
    let exist = await this.schema.hasTable(this.tableName)

    if (!exist) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('tid')
        table
          .integer('user_id')
          .notNullable()
          .unsigned()
          .references('uid')
          .inTable('users')
          .onDelete('CASCADE')
        table.string('tfirst_name').notNullable()
        table.string('tlast_name').notNullable()
        table.string('tphone').notNullable()
        table.string('tnationality').notNullable()
        table.integer('tage').notNullable()
        table.string('tsummary').notNullable()
        table.string('toverview').notNullable()
        table.boolean('tweekdays_day').defaultTo(false)
        table.boolean('tweekdays_eve').defaultTo(false)
        table.boolean('tweekends').defaultTo(false)
        table.timestamps(true)
      })
    }
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
