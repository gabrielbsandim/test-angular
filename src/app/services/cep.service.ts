import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IGetAddressOutput, IViaCepError } from '../models/getAddress.model';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private httpClient: HttpClient) { }

  // request Via CEP para buscar o endereço
  public getAddress(cep: string): Observable<IGetAddressOutput | null> {
    const safeCep = cep.replace(/\D/g, '')
    return this.httpClient
      .get<IGetAddressOutput | IViaCepError>(`https://viacep.com.br/ws/${safeCep}/json/`)
      .pipe(map(this.adaptResponse))
  }

  private adaptResponse(
    response: IGetAddressOutput | IViaCepError,
  ): IGetAddressOutput | null {
    if ((response as IViaCepError).erro) {
      return null
    }
    return response as IGetAddressOutput
  }
}
