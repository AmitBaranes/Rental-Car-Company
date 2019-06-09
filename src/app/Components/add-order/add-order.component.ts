import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/Services/cars.service';
import { MatDialog } from '@angular/material';
import { UsersService } from 'src/app/Services/users.service';
import sweetalert2 from 'sweetalert2';

export class IOrder {
  CarNumber: string;
  UserID: number;
  StartTime: Date;
  EndTime: Date;
  ReturnTime: Date;
}

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  constructor(private carsApi: CarsService, private usersApi: UsersService, public dialog: MatDialog) { }
  carsInStock: string[];
  allCarsType: any[] = [];
  allUsers: any;
  carOrder: IOrder = new IOrder();

  async addOrder() {
    const classLength = Object.keys(this.carOrder).length;
    if (classLength !== 5) {
      sweetalert2.fire({
        type: 'error',
        title: 'Oops...',
        html: '<h3>some fields on your form are invalid!<br>please check your information</h3>',
      });
      return;
    }
    const addCarToStockResponse = await this.carsApi.addRentOrder(this.carOrder);
    if (addCarToStockResponse.indexOf('successfully') > -1 ) {
      sweetalert2.fire({
        type: 'info',
        title: `Order added to stock`,
      });
    } else {
      sweetalert2.fire({
        type: 'error',
        title: 'Something went wrong!',
        text: `Failed to add Order!`,
      });
   }
  }

  async ngOnInit() {
    this.carsInStock = await this.carsApi.getAllCars().then(res => res.map(car => ({number: car.CarNumber, type: car.TypeID})));
    const getAllCarsType = await this.carsApi.getAllCarsType();
    for (const carInfo of this.carsInStock) {
      const selectedCar = getAllCarsType.find(car => car.TypeID === carInfo[`type`]);
      this.allCarsType.push(
        {manufacturer: selectedCar.Manufacturer,
        model: selectedCar.Model,
        year: selectedCar.Year,
        gear: selectedCar.Gear,
        carNumber: carInfo[`number`]},
        );
    }
    this.allUsers = await this.usersApi.getAllUsers()
    .then(res => res.map(user => (({ UserID, FirstName, LastName, ID }) => ({ FirstName, LastName, ID, UserID}))(user)));
  }

}
