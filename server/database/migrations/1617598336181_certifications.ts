import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Certifications extends BaseSchema {
  protected tableName = 'certifications'

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
      table
        .integer('level_of_education_id')
        .unsigned()
        .nullable()
        .defaultTo(null)
        .references('leid')
        .inTable('level_of_educations')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    if (await this.schema.hasTable(this.tableName)) this.schema.dropTable(this.tableName)
  }
}
