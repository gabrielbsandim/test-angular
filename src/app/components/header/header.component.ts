import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public language = 'EN'

  constructor(private utilsService: UtilsService, private router: Router) {
    this.language = this.utilsService.getCurrencyLocaleOptions().language;
  }
}
