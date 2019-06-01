import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { PickCarComponent } from './Components/pick-car/pick-car.component';
import { MangeUsersComponent } from './Components/mange-users/mange-users.component';
import { RentCarComponent } from './Components/rent-car/rent-car.component';

const routes: Routes = [
  { path: 'Cars/selectCar', component: PickCarComponent },
  { path: 'Cars/Payment', component: RentCarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Managment/Users', component: MangeUsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
