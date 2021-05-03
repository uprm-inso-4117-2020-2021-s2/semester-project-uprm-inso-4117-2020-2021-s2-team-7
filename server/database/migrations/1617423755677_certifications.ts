import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Certifications extends BaseSchema {
  protected tableName = 'certifications'

  public async up() {
    let exist = await this.schema.hasTable(this.tableName)

    if (!exist) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('cid')
        table.string('cschool').notNullable()
        table.string('csubject').notNullable()
        table.string('cserial_name').notNullable()
        table.timestamps(true)
      })
    }
  }

  public async down() {
    if (await this.schema.hasTable(this.tableName)) this.schema.dropTable(this.tableName)
  }
}
