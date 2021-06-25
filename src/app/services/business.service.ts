import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBusiness } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private httpClient: HttpClient) { }

  public fetchAllBusiness(): Observable<IBusiness[]> {
    return this.httpClient.get<IBusiness[]>(environment.fetchBusinessBaseUrl);
  }
}
