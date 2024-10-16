import { ProdutoRepository } from "@/domain/repository/produto.repository";

const mockProdutoRepository: ProdutoRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
}

describe('GetAllProdutoUseCase', () => {
    let getAllProdutoUseCase: GetAllProdutoUseCase.UseCase

    beforeEach(() => {
        getAllProdutoUseCase = new GetAllProdutoUseCase.UseCase(mockProdutoRepository)
    })

    it('should return a list of products successfully', async () => {
        const products: ProdutoModel[] = [
            {
                id: 1,
                name: 'sabão',
                description: 'Um sabão de uma marca boa',
                price: 10,
                quantity: 10,
                image: 'url.da.imagem',
                fornecedorId: 1
            },
            {
                
            }
        ]
    })
})