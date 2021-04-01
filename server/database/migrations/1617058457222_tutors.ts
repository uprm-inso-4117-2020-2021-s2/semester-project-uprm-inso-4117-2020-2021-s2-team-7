import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tutors extends BaseSchema {
  protected tableName = 'tutors'

  public async up() {
    let exist = await this.schema.hasTable(this.tableName)

    if (!exist) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('tid')
        table.string('tfirst_name')
        table.string('tlast_name')
        table.string('temail')
        table.string('tpassword')
        table.string('tphone')
        table.string('tnationality')
        table.integer('tage')
        table.string('tsummary')
        table.string('toverview')
        table.boolean('tweekdays_day').defaultTo(false)
        table.boolean('tweekdays_eve').defaultTo(false)
        table.boolean('tweekends').defaultTo(false)
        table.timestamps(true)
      })
    }
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
