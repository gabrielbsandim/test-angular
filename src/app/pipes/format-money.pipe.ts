import { Pipe, PipeTransform } from '@angular/core'
import { UtilsService } from '../services/utils.service'

@Pipe({
  name: 'formatMoney',
})
export class FormatMoneyPipe implements PipeTransform {
  constructor(private utilsService: UtilsService) { }

  transform(value: number) {
    const { currency, locale } = this.utilsService.getCurrencyLocaleOptions()

    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    })
    const reais = value

    const formattedValue = formatter.format(reais)

    return formattedValue
  }
}
