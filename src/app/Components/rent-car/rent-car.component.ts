import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/Services/cars.service';
import { BranchesService } from 'src/app/Services/branches.service';
import sweetalert2 from 'sweetalert2';

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
car.Available = 'N';
const res =  await this.carsApi.updateCar(car);
if (res.indexOf('successfully') > -1 ) {
  sweetalert2.fire({
    type: 'success',
    title: `Reservation Completed successfully`,
    html: `<h3> ${car.CarNumber} Rent successfully !</h3>`,
  });
}
// TO DO - updateRentCar !! 
console.log(res);
}
}
