export class ProdutoModel {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  image: Express.Multer.File
  fornecedorId: number
}
