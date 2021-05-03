import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Speaks extends BaseSchema {
  protected tableName = 'speaks'

  public async up() {
    if (!(await this.schema.hasTable(this.tableName))) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('spid')
        table
          .integer('tutor_id')
          .notNullable()
          .references('tid')
          .inTable('tutors')
          .onDelete('CASCADE')
        table
          .integer('language_id')
          .notNullable()
          .references('lid')
          .inTable('languages')
          .onDelete('CASCADE')
        table.boolean('is_native').defaultTo(false)
        table.timestamps(true)
      })
    }
  }

  public async down() {
    if (await this.schema.hasTable(this.tableName)) this.schema.dropTable(this.tableName)
  }
}
