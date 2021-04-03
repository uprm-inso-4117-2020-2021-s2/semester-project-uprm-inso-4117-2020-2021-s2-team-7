import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Subjects extends BaseSchema {
  protected tableName = 'subjects'

  public async up () {
    let exist = await this.schema.hasTable(this.tableName)
 
    if(!exist) {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('sid')
      table.string('sname')
      table.timestamps(true)
    })
  }
}
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
