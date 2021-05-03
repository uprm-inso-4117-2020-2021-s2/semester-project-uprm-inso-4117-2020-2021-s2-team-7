import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Languages extends BaseSchema {
  protected tableName = 'languages'

  public async up() {
    if (!(await this.schema.hasTable(this.tableName))) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('lid')
        table.string('type').notNullable().unique()
        table.timestamps(true)
      })
    }
  }

  public async down() {
    if (await this.schema.hasTable(this.tableName)) this.schema.dropTable(this.tableName)
  }
}
