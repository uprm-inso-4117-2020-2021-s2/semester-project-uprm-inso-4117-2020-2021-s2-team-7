import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SubjectLevels extends BaseSchema {
  protected tableName = 'subject_levels'

  public async up() {
    if (await this.schema.hasTable(this.tableName)) {
      this.schema.dropTable(this.tableName)
    }
  }

  public async down() {
    if (await this.schema.hasTable(this.tableName)) {
      this.schema.dropTable(this.tableName)
    }
  }
}
