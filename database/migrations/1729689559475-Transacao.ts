import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class Transacao1729689559475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criação da tabela transacao
    await queryRunner.createTable(
      new Table({
        name: 'transacao',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'tipo',
            type: 'enum',
            enum: ['Entrada', 'Saída'], 
            isNullable: false
          },
          {
            name: 'data',
            type: 'datetime',
            isNullable: false
          },
          {
            name: 'valor',
            type: 'int', 
            isNullable: false
          },
          {
            name: 'produtoId',
            type: 'int',
            isNullable: false
          },
          {
            name: 'pedidoId',
            type: 'int',
            isNullable: false
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      'transacao',
      new TableForeignKey({
        columnNames: ['produtoId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'produto',
        onDelete: 'CASCADE' 
      })
    )

    await queryRunner.createForeignKey(
      'transacao',
      new TableForeignKey({
        columnNames: ['pedidoId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pedido',
        onDelete: 'CASCADE' 
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('transacao')

    const foreignKeyProduto = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('produtoId') !== -1
    )
    if (foreignKeyProduto) {
      await queryRunner.dropForeignKey('transacao', foreignKeyProduto)
    }

    const foreignKeyPedido = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('pedidoId') !== -1
    )
    if (foreignKeyPedido) {
      await queryRunner.dropForeignKey('transacao', foreignKeyPedido)
    }

    await queryRunner.dropTable('transacao')
  }
}
