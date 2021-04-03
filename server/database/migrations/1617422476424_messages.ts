import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Messages extends BaseSchema {
  protected tableName = 'messages'

  public async up () {
    let exist = await this.schema.hasTable(this.tableName)
 
    if(!exist) {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mid')
      table.string('mmodality')
      table.string('mmessage')
      table.string('mphone')
      table.string('memail')
      table.timestamps(true)
    })
  }
}
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
