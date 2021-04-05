import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Messages extends BaseSchema {
  protected tableName = 'messages'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('tutor_id')
        .unsigned()
        .nullable()
        .defaultTo(null)
        .references('tid')
        .inTable('tutors')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    if (await this.schema.hasTable(this.tableName)) this.schema.dropTable(this.tableName)
  }
}
