import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Messages extends BaseSchema {
  protected tableName = 'messages'

  public async up() {
    let exist = await this.schema.hasTable(this.tableName)

    if (!exist) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('mid')
        table.string('mmodality').notNullable()
        table.string('mmessage').notNullable()
        table.string('mphone').notNullable()
        table.string('memail').notNullable()
        table.timestamps(true)
      })
    }
  }
  public async down() {
    if (await this.schema.hasTable(this.tableName)) this.schema.dropTable(this.tableName)
  }
}
