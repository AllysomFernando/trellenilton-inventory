export class CPFValidator {
  static isValid(cpf: string): boolean {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    return cpfRegex.test(cpf)
  }
}
