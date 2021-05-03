import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Addresses extends BaseSchema {
  protected tableName = 'addresses'

  public async up() {
    let exist = await this.schema.hasTable(this.tableName)

    if (!exist) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('aid')
        table.string('astreet1').notNullable()
        table.string('astreet2').nullable()
        table.string('acity').notNullable()
        table.string('acountry').notNullable()
        table.string('azipcode').notNullable()
        table.timestamps(true)
      })
    }
  }
  public async down() {
    if (await this.schema.hasTable(this.tableName)) this.schema.dropTable(this.tableName)
  }
}
