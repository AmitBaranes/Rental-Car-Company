import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import {MatTabsModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatIconModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatSelectModule, MatExpansionModule, MatTableModule, MatTooltipModule, MatDialogModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { TabsComponent } from './Components/tabs/tabs.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UsersService } from './Services/users.service';
import { PickCarComponent } from './Components/pick-car/pick-car.component';
import { CarsService } from './Services/cars.service';
import { FiltermultiPipe } from './Pipes/filterByMultiArgs';
import { CarCardComponent } from './Components/car-card/car-card.component';
import { BranchesService } from './Services/branches.service';
import { MangeUsersComponent } from './Components/mange-users/mange-users.component';
import { RentCarComponent } from './Components/rent-car/rent-car.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TabsComponent,
    LoginComponent,
    RegisterComponent,
    PickCarComponent,
    FiltermultiPipe,
    CarCardComponent,
    MangeUsersComponent,
    RentCarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatRadioModule,
    HttpClientModule,
    MatDialogModule,
    FileUploadModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule ,
    MatFormFieldModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [UsersService, CarsService, BranchesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
