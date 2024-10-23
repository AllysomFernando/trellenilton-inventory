import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class ItemPedido1729689542388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'item_pedido',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'pedidoId',
            type: 'int',
            isNullable: false
          },
          {
            name: 'produtoId',
            type: 'int',
            isNullable: false
          },
          {
            name: 'quantidade',
            type: 'int',
            isNullable: false
          },
          {
            name: 'precoUnitario',
            type: 'decimal',
            isNullable: false
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      'item_pedido',
      new TableForeignKey({
        columnNames: ['pedidoId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pedido',
        onDelete: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey(
      'item_pedido',
      new TableForeignKey({
        columnNames: ['produtoId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'produto',
        onDelete: 'CASCADE' 
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('item_pedido')
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('pedidoId') !== -1
    )
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('produtoId') !== -1
    )

    if (foreignKey1) {
      await queryRunner.dropForeignKey('item_pedido', foreignKey1)
    }

    if (foreignKey2) {
      await queryRunner.dropForeignKey('item_pedido', foreignKey2)
    }

    await queryRunner.dropTable('item_pedido')
  }
}
