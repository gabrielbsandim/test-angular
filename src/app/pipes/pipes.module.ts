import { NgModule } from '@angular/core'

import { FormatMoneyPipe } from './format-money.pipe'

@NgModule({
  declarations: [
    FormatMoneyPipe,
  ],
  imports: [],
  exports: [
    FormatMoneyPipe,
  ],
})
export class PipesModule {}
