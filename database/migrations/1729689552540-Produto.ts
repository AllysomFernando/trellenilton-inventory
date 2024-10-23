import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class Produto1729689552540 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'produto',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'price',
            type: 'decimal',
            isNullable: false
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: false
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'fornecedorId',
            type: 'int',
            isNullable: false
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      'produto',
      new TableForeignKey({
        columnNames: ['fornecedorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'fornecedor',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('produto')
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('fornecedorId') !== -1
    )
    if (foreignKey) {
      await queryRunner.dropForeignKey('produto', foreignKey)
    }

    await queryRunner.dropTable('produto')
  }
}
