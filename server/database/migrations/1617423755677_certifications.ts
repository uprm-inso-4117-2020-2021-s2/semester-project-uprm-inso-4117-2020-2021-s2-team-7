import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Certifications extends BaseSchema {
  protected tableName = 'certifications'

  public async up() {
    let exist = await this.schema.hasTable(this.tableName)

    if (!exist) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('cid')
        table.string('cschool')
        table.string('csubject')
        table.string('cserial_name')
        table.timestamps(true)
      })
    }
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
