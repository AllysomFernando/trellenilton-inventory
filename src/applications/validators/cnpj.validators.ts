export class CNPJValidator {
  static isValid(cnpj: string): boolean {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
    return cnpjRegex.test(cnpj)
  }
}
