export class CreateProdutoDto {
  name: string
  description: string
  price: number
  quantity: number
  image: Express.Multer.File
  fornecedorId: number
}
