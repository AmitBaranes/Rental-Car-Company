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
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';
import { AuthGuard } from './Gurds/auth.guard';

const routes: Routes = [
  { path: 'Cars/selectCar', component: PickCarComponent },
  { path: 'Cars/Payment', component: RentCarComponent , canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Managment/Users', component: MangeUsersComponent , canActivate: [AuthGuard]},
  { path: 'Managment/Cars/Types', component: ManageCarsTypesComponent , canActivate: [AuthGuard]},
  { path: 'Managment/Cars/Stock', component: ManageCarsStockComponent , canActivate: [AuthGuard]},
  { path: 'Managment/Cars/Orders', component: ManageOrdersComponent , canActivate: [AuthGuard]},
  { path: 'Managment/MyOrders', component: MyOrdersComponent , canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
