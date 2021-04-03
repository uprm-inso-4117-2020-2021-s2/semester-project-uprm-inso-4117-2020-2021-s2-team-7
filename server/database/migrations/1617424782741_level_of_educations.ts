import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LevelOfEducations extends BaseSchema {
  protected tableName = 'level_of_educations'

  public async up() {
    let exist = await this.schema.hasTable(this.tableName)

    if (!exist) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('leid')
        table.string('lename')
        table.timestamps(true)
      })
    }
  }
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
