import { AbstractControl } from '@angular/forms'

import { cnpj } from 'cpf-cnpj-validator'

export class Validation {
  static validaCnpj(controle: AbstractControl) {
    if (!controle.value || controle.value === null || controle.value === '') {
      return { invalidCNPJ: true }
    }

    if (!cnpj.isValid(controle.value.toString())) {
      return { invalidCNPJ: true }
    }

    return null
  }

  static zipCodeValidation(controle: AbstractControl) {
    if (!controle.value || controle.value === null || controle.value === '') {
      return { invalidZipCode: true }
    }

    const cep = controle.value.replace(/\D/g, '')

    const regexp = new RegExp(/^([0-9]|\s+)+$/)
    if (cep.length !== 8 || !regexp.test(cep)) {
      return { invalidZipCode: true }
    }

    return null
  }
}
