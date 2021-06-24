import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitListComponent } from './pages/unit-list/unit-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/unit-list', pathMatch: 'full' },
  { path: 'unit-list', component: UnitListComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
