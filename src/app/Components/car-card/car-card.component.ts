import { Component, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

interface IRentPeriod {
  begin: Date;
  end: Date;
}


@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent  {
  constructor(private router: Router) {}
@Input() carsInput: any;
@Input() filter: boolean;
@Input() daysRange: any;
@Input() manufacturer: any;
@Input() model: any;
@Input() year: any;
@Input() gear: any;
@Input() rentPeriod: IRentPeriod;
documentReady: boolean;
defaultElevation = 2;


rentCar(car: any, rentPeriod: IRentPeriod) {
const navigationExtras: NavigationExtras = {... car};
console.log(car);
console.log(rentPeriod);
this.router.navigate(['Cars/Payment'], navigationExtras);

}

}
