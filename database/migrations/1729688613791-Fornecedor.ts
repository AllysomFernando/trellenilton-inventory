import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class FornecedorMigration1629688613791 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fornecedor',
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
            name: 'cnpj',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'endereco',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'contato',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fornecedor')
  }
}
