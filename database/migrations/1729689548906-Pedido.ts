import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class Pedido1729689548906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pedido',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'clienteId',
            type: 'int',
            isNullable: false
          },
          {
            name: 'data',
            type: 'datetime',
            isNullable: false
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PENDING', 'COMPLETED', 'CANCELLED'], 
            isNullable: false
          },
          {
            name: 'total',
            type: 'decimal',
            isNullable: false
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      'pedido',
      new TableForeignKey({
        columnNames: ['clienteId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cliente',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('pedido')
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('clienteId') !== -1
    )
    if (foreignKey) {
      await queryRunner.dropForeignKey('pedido', foreignKey)
    }

    await queryRunner.dropTable('pedido')
  }
}
