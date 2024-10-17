import { CNPJValidator } from '@/applications/validators/cnpj.validators'
import { CPFValidator } from './cpf.validators'

export class IsCPForCnpj {
  static isCpf(cpfCnpj: string): boolean {
    return cpfCnpj.length === 11
  }

  static isCnpj(cpfCnpj: string): boolean {
    return cpfCnpj.length === 14
  }

  static isValid(cpfCnpj: string): boolean {
    cpfCnpj = cpfCnpj.replace(/[^\d]+/g, '')

    if (this.isCpf(cpfCnpj)) {
      return CPFValidator.isValid(cpfCnpj)
    } else if (this.isCnpj(cpfCnpj)) {
      return CNPJValidator.isValid(cpfCnpj)
    }
    return false
  }
}
