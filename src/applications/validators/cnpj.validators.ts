export class CNPJValidator {
  static isValid(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '')

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
      return false
    }

    let soma = 0
    let resto

    const pesosPrimeiroDV = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * pesosPrimeiroDV[i]
    }

    resto = soma % 11
    if (resto < 2) {
      resto = 0
    } else {
      resto = 11 - resto
    }

    if (resto !== parseInt(cnpj.charAt(12))) {
      return false
    }

    soma = 0
    const pesosSegundoDV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj.charAt(i)) * pesosSegundoDV[i]
    }

    resto = soma % 11
    if (resto < 2) {
      resto = 0
    } else {
      resto = 11 - resto
    }

    if (resto !== parseInt(cnpj.charAt(13))) {
      return false
    }

    return true
  }
}
