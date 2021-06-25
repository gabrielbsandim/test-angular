import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessListComponent } from './pages/business-list/business-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/business-list', pathMatch: 'full' },
  { path: 'business-list', component: BusinessListComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
