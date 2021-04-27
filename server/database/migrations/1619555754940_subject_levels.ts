import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SubjectLevels extends BaseSchema {
  protected tableName = 'subject_levels'

  public async up() {
    if (!(await this.schema.hasTable(this.tableName))) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('slid')
        table
          .integer('level_of_education_id')
          .unsigned()
          .notNullable()
          .references('leid')
          .inTable('level_of_educations')
          .onDelete('CASCADE')
        table
          .integer('subject_id')
          .unsigned()
          .notNullable()
          .references('sid')
          .inTable('subjects')
          .onDelete('CASCADE')
        table.string('slmodality').notNullable()
        table.double('slhourly_rate', 2).notNullable()
        table.timestamps(true)
      })
    }
  }

  public async down() {
    if (await this.schema.hasTable(this.tableName)) this.schema.dropTable(this.tableName)
  }
}
