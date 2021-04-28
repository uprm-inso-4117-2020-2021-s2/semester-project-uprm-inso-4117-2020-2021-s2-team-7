import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Offers extends BaseSchema {
  protected tableName = 'offers'

  public async up() {
    if (await this.schema.hasTable(this.tableName)) {
      this.schema.alterTable(this.tableName, (table) => {
        table
          .integer('level_of_education_id')
          .unsigned()
          .notNullable()
          .references('leid')
          .inTable('level_of_educations')
          .onDelete('CASCADE')
        table.string('modality').notNullable()
        table.double('hourly_rate', 2).notNullable()
      })
    }
  }

  public async down() {
    if (await this.schema.hasTable(this.tableName)) this.schema.dropTable(this.tableName)
  }
}
