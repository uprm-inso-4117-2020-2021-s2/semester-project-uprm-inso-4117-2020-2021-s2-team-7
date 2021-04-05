import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Offers extends BaseSchema {
  protected tableName = 'offers'

  public async up() {
    if (!(await this.schema.hasTable(this.tableName))) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('oid')
        table
          .integer('tutor_id')
          .unsigned()
          .notNullable()
          .references('tid')
          .inTable('tutors')
          .onDelete('CASCADE')
        table
          .integer('subject_id')
          .unsigned()
          .notNullable()
          .references('sid')
          .inTable('subjects')
          .onDelete('CASCADE')
        table.timestamps(true)
      })
    }
  }

  public async down() {
    if (await this.schema.hasTable(this.tableName)) this.schema.dropTable(this.tableName)
  }
}
