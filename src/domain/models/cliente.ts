import { PedidoModel } from "./pedido"

export class ClienteModel {
  id: number
  name: string
  cpf_cnpj: string
  endereco: string
  contato: string
  archived: boolean
  pedidos?: PedidoModel[]
}
