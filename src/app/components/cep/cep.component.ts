import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IGetAddressOutput } from 'src/app/models/getAddress.model';
import { CepService } from 'src/app/services/cep.service';
import { CreateForms } from 'src/app/utils/createForms.util';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.scss']
})
export class CepComponent {
  public cepForm = CreateForms.createCEPForm();
  public invalidZipCode = false;

  @Input() zipCode: string = ''
  @Output() returnGetAddress: EventEmitter<IGetAddressOutput | null> = new EventEmitter();

  constructor(private cepService: CepService) { }

  // recebe as mudanças do cep após receber os dados do Polo e busca o cep
  ngOnChanges(changes: SimpleChanges) {
    this.cepForm.get('zipCode')!.setValue(changes.zipCode.currentValue)
    this.getAddress()
  }


  public getAddress() {
    if (this.cepForm.get('zipCode')!.invalid) {
      this.returnGetAddress.emit(null)
      this.invalidZipCode = true
      return
    }

    this.invalidZipCode = false

    this.cepService
      .getAddress(this.cepForm.value.zipCode)
      .subscribe(this.onCheckCep)
  }

  private onCheckCep = (response: IGetAddressOutput | null) => {
    this.returnGetAddress.emit(response)
  }
}
