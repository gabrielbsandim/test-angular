import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

export interface ICurrencyMaskOptions {
  prefix: string;
  thousands: string;
  decimal: string;
  align: string;
}

export interface ICurrencyLocalePipeOptions {
  locale: string;
  currency: string;
  language: 'PT' | 'EN';
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private snackBar: MatSnackBar,
    @Inject(LOCALE_ID) protected localeId: string
  ) {
  }

  public snackBarError(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 4000,
      panelClass: 'errorPanel',
    });
  }

  public snackBarSuccess(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 4000,
      panelClass: 'successPanel',
    });
  }

  public getCurrencyMaskOptions(): ICurrencyMaskOptions {
    return {
      prefix: this.localeId === 'pt' ? 'R$ ' : '$ ',
      thousands: this.localeId === 'pt' ? '.' : ',',
      decimal: this.localeId === 'pt' ? ',' : ',',
      align: 'left'
    }
  }

  public getCurrencyLocaleOptions(): ICurrencyLocalePipeOptions {
    console.log(this.localeId)
    return {
      locale: this.localeId === 'pt' ? 'pt-BR' : 'en-US',
      currency: this.localeId === 'pt' ? 'BRL' : 'USD',
      language: this.localeId === 'pt' ? 'PT' : 'EN'
    }
  }
}
