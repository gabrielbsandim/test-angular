import { FormBuilder, Validators } from "@angular/forms"
import { Validation } from "./validation.util"

export class CreateForms {
  static createBusinessForm() {
    const formBuilder = new FormBuilder()
    return formBuilder.group({
      street: ['', Validators.compose([Validators.required])],
      district: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      companyName: ['', Validators.compose([Validators.required])],
      business: ['', Validators.compose([Validators.required])],
      valuation: ['', Validators.compose([Validators.required])],
      cnpj: ['', Validators.compose([Validation.validaCnpj])],
      active: [null, Validators.compose([Validators.required])],
    })
  }

  static createCEPForm() {
    const formBuilder = new FormBuilder()
    return formBuilder.group({
      zipCode: ['', Validators.compose([Validation.zipCodeValidation, Validators.required])],
    })
  }
}
