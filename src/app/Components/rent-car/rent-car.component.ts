import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/Services/cars.service';
import { BranchesService } from 'src/app/Services/branches.service';
import sweetalert2 from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonService } from 'src/app/Services/commonService';

export class RentCar {
  CarNumber: string;
  UserID: number;
  StartTime: Date;
  EndTime: Date;
  ReturnTime: Date;
}


@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.scss']
})
export class RentCarComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  carInforamtion: any;
  daysRange: number;
  relevantCar: any;
  branchInfo: any;
  branches: any;
  constructor(private router: Router, private carsApi: CarsService, private branchApi: BranchesService,
    private dialog: MatDialog, private commonService: CommonService) {
    const navigation = this.router.getCurrentNavigation();
    const car = navigation.extras as { carInforamtion: any };
    this.carInforamtion = car;
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    this.daysRange = Math.round(
      Math.abs(
        (this.carInforamtion.rentPeriod.end.getTime() - this.carInforamtion.rentPeriod.begin.getTime()) / (oneDay)));
  }

  async ngOnInit() {
    const allCars = await this.carsApi.getAllCars();
    this.relevantCar = allCars.find(car => car.TypeID === this.carInforamtion.TypeID);
    this.branches = await this.branchApi.getBranches();
    this.branchInfo = this.branches.find(branch => branch.BranchID === this.relevantCar.BranchID);
  }

  async editBranchReturn() {

  }


  async reserveCar(car: any) {
    const token = sessionStorage.getItem('token');
    if (!token) {
      sweetalert2.fire({
        title: 'Oops...',
        html: '<h3>You must be logged in order to reserve car!</h3>',
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Register',
        confirmButtonText: 'Login'
      }).then((result) => {
        result.value ?
          this.dialog.open(LoginComponent, {}) :
          this.dialog.open(RegisterComponent, {});
      });
      return;
    }
    const tokenDecoder = this.jwtHelper.decodeToken(token);
    const rentCar: RentCar = new RentCar();
    rentCar.CarNumber = car.CarNumber;
    rentCar.StartTime = this.carInforamtion.rentPeriod.begin;
    rentCar.EndTime = this.carInforamtion.rentPeriod.end;
    rentCar.UserID = tokenDecoder.userID;
    car.Available = 'N';
    const updateCarResponse = await this.carsApi.updateCarStock(car);
    const addRentCarResponse = await this.carsApi.addRentOrder(rentCar);
    if (updateCarResponse.indexOf('successfully') > -1 && addRentCarResponse.indexOf('successfully') > -1) {
      sweetalert2.fire({
        type: 'success',
        title: `Reservation Completed successfully`,
        html: `<h3> ${car.CarNumber} Rented successfully !</h3>`,
      });
      this.commonService.setNumbersOfOrders();
    }
  }
}
