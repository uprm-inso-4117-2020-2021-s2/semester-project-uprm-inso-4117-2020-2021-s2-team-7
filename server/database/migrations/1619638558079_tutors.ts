import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tutors extends BaseSchema {
  protected tableName = 'tutors'

  public async up() {
    if (await this.schema.hasTable(this.tableName)) {
      this.schema.alterTable(this.tableName, (table) => {
        table.dropColumn('tnationality')
      })
    }
  }

  public async down() {
    // if (await this.schema.hasTable(this.tableName)) this.schema.dropTable(this.tableName)
  }
}
