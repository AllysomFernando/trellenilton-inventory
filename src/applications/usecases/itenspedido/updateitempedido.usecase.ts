export namespace UpdateItemPedidoUseCase {
  export type Input = {
    id: string
    pedidoId: number, 
    produtoId: number,
    quantidade: number,
    precoUnitario: number
  }
}
