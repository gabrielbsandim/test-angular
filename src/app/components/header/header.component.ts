import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public language = 'EN'

  constructor(private utilsService: UtilsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.language = this.utilsService.getCurrencyLocaleOptions().language;
  }

  public changeLanguage() {
    if (!this.verifyProductionMode()) {
      const errorMessage = $localize`Para trocar a língua é necessário estar em produção`;
      return this.utilsService.snackBarError(errorMessage)
    }

    const newLanguage = this.language === 'PT' ? 'pt' : 'en';

  }

  private verifyProductionMode(): boolean {
    return environment.production;
  }
}
