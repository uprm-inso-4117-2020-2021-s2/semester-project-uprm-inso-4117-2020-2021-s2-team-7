import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LevelOfEducations extends BaseSchema {
  protected tableName = 'level_of_educations'

  public async up() {
    // this.schema.alterTable(this.tableName, (table) => {
    //   table.increments('id')
    //   table.timestamps(true)
    // })
  }

  public async down() {
    // if (await this.schema.hasTable(this.tableName)) this.schema.dropTable(this.tableName)
  }
}
