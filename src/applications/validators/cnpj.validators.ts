export class CNPJValidator {
  static isValid(cnpj: string): boolean {
    if (cnpj.length !== 14) {
      return false
    }
    if (cnpj === '00000000000000') {
      return false
    }
    let soma = 0
    let resto
    for (let i = 1; i <= 12; i++) {
      soma = soma + parseInt(cnpj.substring(i - 1, i)) * (14 - i)
    }
    resto = soma % 11
    if (resto < 2) {
      resto = 0
    } else {
      resto = 11 - resto
    }
    if (resto !== parseInt(cnpj.substring(12, 13))) {
      return false
    }
    soma = 0
    for (let i = 1; i <= 13; i++) {
      soma = soma + parseInt(cnpj.substring(i - 1, i)) * (15 - i)
    }
    resto = soma % 11
    if (resto < 2) {
      resto = 0
    } else {
      resto = 11 - resto
    }
    if (resto !== parseInt(cnpj.substring(13, 14))) {
      return false
    }
  }
}
