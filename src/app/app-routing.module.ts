import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { PickCarComponent } from './Components/pick-car/pick-car.component';
import { MangeUsersComponent } from './Components/mange-users/mange-users.component';
import { RentCarComponent } from './Components/rent-car/rent-car.component';
import { ManageCarsTypesComponent } from './Components/manage-cars-types/manage-cars-types.component';
import { ManageCarsStockComponent } from './Components/manage-cars-stock/manage-cars-stock.component';
import { ManageOrdersComponent } from './Components/manage-orders/manage-orders.component';
import { AddOrderComponent } from './Components/add-order/add-order.component';

const routes: Routes = [
  { path: 'Cars/selectCar', component: PickCarComponent },
  { path: 'Cars/Payment', component: RentCarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Managment/Users', component: MangeUsersComponent },
  { path: 'Managment/Cars/Types', component: ManageCarsTypesComponent },
  { path: 'Managment/Cars/Stock', component: ManageCarsStockComponent },
  { path: 'Managment/Cars/Orders', component: ManageOrdersComponent },
  { path: 'test', component: AddOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
