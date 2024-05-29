import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { TransactionListComponent } from './Component/transaction-list/transaction-list.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'TransactionList', component: TransactionListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
