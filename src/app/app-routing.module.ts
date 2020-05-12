import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullViewComponent } from './full-view/full-view.component';
import { SearchComponent } from './search/search.component';
import { AddComponent } from './add/add.component';
import {AuthGuard} from './auth-guard';

const routes: Routes = [
  { path: 'search', component: SearchComponent},
  { path: 'add', component: AddComponent},
  { path: 'definition/:id', component: FullViewComponent},
  { path: '', redirectTo: '/search', pathMatch: 'full'},
  { path: '**', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
