import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { IDialogData } from 'src/app/models/dialog.model';
import { IBusiness } from 'src/app/models/business.model';
import { IGetAddressOutput } from 'src/app/models/getAddress.model';
import { BusinessService } from 'src/app/services/business.service';
import { ICurrencyMaskOptions, UtilsService } from 'src/app/services/utils.service';
import { CreateForms } from 'src/app/utils/createForms.util';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {
  public businessForm = CreateForms.createBusinessForm();

  public zipCode: string = ''

  public showErrors = false;
  public invalidZipCode = false;
  public isRequesting = false;

  public business: null | IBusiness = null

  public currencyMaskConfiguration: null | ICurrencyMaskOptions = null

  constructor(
    private activatedRoute: ActivatedRoute,
    private businessService: BusinessService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.currencyMaskConfiguration = this.utilsService.getCurrencyMaskOptions()
  }

  ngOnInit() {
    const businessId = this.activatedRoute.snapshot.paramMap.get('businessId');

    // Caso não passe o Id na URL
    if (!businessId) {
      this.router.navigateByUrl('/business-list');
      this.utilsService.snackBarError($localize`Nenhum Polo selecionado`);
      return
    }

    this.businessService.fetchOneBusiness(businessId).subscribe((business) => {
      if (!business) {
        this.router.navigateByUrl('/business-list');
        this.utilsService.snackBarError($localize`Ocorreu um erro ao buscar o Polo`);
        return
      }

      this.setBusinessData({
        ...business,
        id: Number(business.id)
      });
    }, (error) => {
      // Se erro no get
      this.router.navigateByUrl('/business-list');
      this.utilsService.snackBarError(error);
    });
  }

  get formControls() {
    return this.businessForm.controls
  }

  // Preenche os dados do Polo no formulário
  private setBusinessData(businessData: IBusiness) {
    const { name, business, cnpj, active, cep, valuation } = businessData
    this.business = businessData;

    this.businessForm.patchValue({
      business: business,
      companyName: name,
      valuation,
      active,
      cnpj,
    });

    this.zipCode = cep
  }

  // Valida e confirma antes de salvar
  public saveValidate() {
    this.showErrors = true
    if (this.businessForm.invalid) {
      return
    }
    this.isRequesting = true

    if (!this.business) {
      this.snackBar.open($localize`Ocorreu um erro ao salvar o Polo`, undefined, {
        duration: 4000,
        panelClass: 'errorPanel',
      });
      return
    }

    try {
      const dialogData: IDialogData = {
        header: $localize`Deseja realmente salvar o Polo ${this.business.name || ''}?`
      }

      const dialogRef = this.dialog.open(DialogComponent, {
        width: '400px',
        height: '400px',
        data: dialogData,
      });

      dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          return this.resetBooleanFormVariables()
        }

        this.saveBusiness();
      });
    } catch (e) {
      console.log(e)
    }
    this.resetBooleanFormVariables()
  }

  private saveBusiness() {
    const business: IBusiness = {
      id: this.business!.id,
      name: this.businessForm.value.companyName,
      business: this.businessForm.value.business,
      cep: this.businessForm.value.zipCode,
      cnpj: this.businessForm.value.cnpj,
      valuation: parseFloat(this.businessForm.value.valuation),
      active: this.businessForm.value.active
    };

    const responseStoreBusiness = this.businessService.storeBusiness(business);

    this.router.navigateByUrl('/business-list');

    if (!responseStoreBusiness.status) {
      return this.utilsService.snackBarError(responseStoreBusiness.message);
    }

    this.utilsService.snackBarSuccess(responseStoreBusiness.message)
  }

  private resetBooleanFormVariables() {
    this.showErrors = false
    this.isRequesting = false
  }

  public returnGetAddress(response: IGetAddressOutput | null) {
    if (!response) {
      this.setEmptyValueOnAddressInputs()
      this.invalidZipCode = true
      return
    }

    const { uf, localidade, logradouro, bairro } = response

    this.businessForm.patchValue({
      state: uf,
      city: localidade,
      street: logradouro,
      district: bairro,
    })
  }

  private setEmptyValueOnAddressInputs() {
    this.businessForm.patchValue({
      state: '',
      city: '',
      street: '',
      district: '',
    })
  }
}
