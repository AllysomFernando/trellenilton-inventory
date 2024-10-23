import { Module } from '@nestjs/common'
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import { UserRepositoryOrm } from './user.repository'
import { Cliente } from '../entities/cliente.entity'
import { ItemPedido } from '../entities/itemPedido.entity'
import { Fornecedor } from '../entities/fornecedor.entity'
import { Pedido } from '../entities/pedido.entity'
import { Produto } from '../entities/produto.entity'
import { Transacao } from '../entities/transacao.entity'
import { TransacaoRepositoryOrm } from './transcacao.repository'
import { ClienteRepositoryOrm } from './cliente.repository'
import { PedidoRepositoryOrm } from './pedido.repository'
import { ProdutoRepositoryOrm } from './produto.repository'
import { ItemPedidoRepositoryOrm } from './itempedido.repository'
import { FornecedorRepositoryOrm } from './fornecedor.repository'

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      User,
      Cliente,
      ItemPedido,
      Fornecedor,
      Pedido,
      Produto,
      Transacao
    ])
  ],
  providers: [
    UserRepositoryOrm,
    TransacaoRepositoryOrm,
    ClienteRepositoryOrm,
    PedidoRepositoryOrm,
    ProdutoRepositoryOrm,
    ItemPedidoRepositoryOrm,
    FornecedorRepositoryOrm
  ],
  exports: [
    UserRepositoryOrm,
    TransacaoRepositoryOrm,
    ClienteRepositoryOrm,
    PedidoRepositoryOrm,
    ProdutoRepositoryOrm,
    ItemPedidoRepositoryOrm,
    FornecedorRepositoryOrm
  ]
})
export class RepositoriesModule {}
