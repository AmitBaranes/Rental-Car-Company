import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/Services/cars.service';
import { BranchesService } from 'src/app/Services/branches.service';

interface IRentPeriod {
  begin: Date;
  end: Date;
}


@Component({
  selector: 'app-pick-car',
  templateUrl: './pick-car.component.html',
  styleUrls: ['./pick-car.component.scss'],
})
export class PickCarComponent implements OnInit {
  constructor(private carsApi: CarsService, private branchesApi: BranchesService) { }
  allCars: any;
  allCarsType: any;
  gears: string[] = ['Automatic', 'Manually'];
  manufacturers: string[];
  models: string[];
  years: string[];
  branches: any;
  manufacturer: string;
  model: string;
  gear: string;
  year: string;
  daysRange: number;
  currentDate: Date = new Date();
  filter: boolean ;
  rentPeriod: IRentPeriod;

  calculateDaysDiff(rentPeriod: any) {
    this.rentPeriod = rentPeriod;
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    this.daysRange = Math.round(Math.abs((rentPeriod.end.getTime() - rentPeriod.begin.getTime()) / (oneDay)));
}
  getModelByManufacturer(manufacturer: string): void {
    this.manufacturer = manufacturer;
    this.models = this.allCarsType
    .filter(car => car.Gear === this.gear && car.Year === this.year && car.Manufacturer === this.manufacturer)
    .map(({Model}) => Model);
  }

  updateModel(model: string) {
    this.model = model;
  }

  updateManufacturerByYearAndGear(year: string) {
    this.year = year;
    this.manufacturers = Array.from(new Set(this.allCarsType.filter
    (car => car.Gear === this.gear && car.Year === this.year)
    .map(({Manufacturer})  => Manufacturer)));
  }

updateFilterStatus() {
  this.filter = !this.filter;
}

  updateGear(gear: string) {
    this.gear = gear[0];
    this.years =  Array.from(new Set(this.allCarsType.filter(car => car.Gear === this.gear).map(({Year})  => Year)));
  }


  async ngOnInit() {
    this.allCars  = await this.carsApi.getAllCars();
    this.allCarsType =  this.allCars.filter(s => s.Available === 'Y' && s.Proper === 'Y' ).map(car => car.CarType);
  }

}
