import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/Services/cars.service';
import { BranchesService } from 'src/app/Services/branches.service';
import sweetalert2 from 'sweetalert2';

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
carInforamtion: any;
daysRange: number;
relevantCar: any;
branchInfo: any;
branches: any;
 constructor(private router: Router, private carsApi: CarsService, private branchApi: BranchesService ) {
    const navigation = this.router.getCurrentNavigation();
    const car = navigation.extras as {carInforamtion: any};
    this.carInforamtion = car;
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    this.daysRange = Math.round(
      Math.abs(
      (this.carInforamtion.rentPeriod.end.getTime() - this.carInforamtion.rentPeriod.begin.getTime()) / (oneDay)));
  }

  async ngOnInit() {
    const allCars = await this.carsApi.getAllCars();
    this.relevantCar = allCars.filter(car => car.CarType.TypeID === this.carInforamtion.TypeID)[0];
    this.branches  = await this.branchApi.getBranches();
    this.branchInfo = this.branches.filter(branch => branch.BranchID === this.relevantCar.BranchID )[0];
  }

  async editBranchReturn() {

  }


async reserveCar(car: any) {
const rentCar: RentCar = new RentCar();
rentCar.CarNumber = car.CarNumber;
rentCar.StartTime = this.carInforamtion.rentPeriod.begin;
rentCar.EndTime = this.carInforamtion.rentPeriod.end;
// TO DO : Get UserID From user
rentCar.UserID = 21;
// TO DO : Get UserID From user
car.Available = 'N';
const updateCarResponse =  await this.carsApi.updateCar(car);
const addRentCarResponse =  await this.carsApi.addRentCar(rentCar);

if (updateCarResponse.indexOf('successfully') > -1 &&  addRentCarResponse.indexOf('successfully') > -1) {
  sweetalert2.fire({
    type: 'success',
    title: `Reservation Completed successfully`,
    html: `<h3> ${car.CarNumber} Rent successfully !</h3>`,
  });
}

}
}
