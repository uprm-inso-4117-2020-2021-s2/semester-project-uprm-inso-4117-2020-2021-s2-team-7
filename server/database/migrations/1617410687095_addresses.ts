import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Addresses extends BaseSchema {
  protected tableName = 'addresses'

  public async up() {
    let exist = await this.schema.hasTable(this.tableName)

    if (!exist) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('aid')
        table.string('astreet1')
        table.string('astreet2')
        table.string('acity')
        table.string('acountry')
        table.string('azipcode')
        table.timestamps(true)
      })
    }
  }
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
