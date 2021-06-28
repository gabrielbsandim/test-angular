import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessDetailComponent } from './pages/business-detail/business-detail.component';
import { BusinessListComponent } from './pages/business-list/business-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'business-list', pathMatch: 'full' },
  { path: 'business-list', component: BusinessListComponent, },
  { path: 'business-detail/:businessId', component: BusinessDetailComponent, },
  { path: '**', redirectTo: 'business-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
