import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullViewComponent } from './full-view/full-view.component';
import { SearchComponent } from './search/search.component';
import { AddComponent } from './add/add.component';
import {AuthGuard} from './auth-guard';
const routes: Routes = [
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'definition/:id', component: FullViewComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/search', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', component: SearchComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
