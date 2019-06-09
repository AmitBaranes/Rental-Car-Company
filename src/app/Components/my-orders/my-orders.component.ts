import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/Services/cars.service';
import { CommonService } from 'src/app/Services/commonService';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(private carsApi: CarsService, private commonService: CommonService) { }
  myOrders: any = [];

   diffDays(from, to) {
     const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((from.getTime() - to.getTime()) / (oneDay)));
  }

  async ngOnInit() {
    const userID = this.commonService.getUserID();
    const all = await this.carsApi.getAllCars();
    const types = await this.carsApi.getAllCarsType();
    const orders = await this.carsApi.getRentCarsByUserID(userID);
    const mapWithTypes = orders.map(x => Object.assign(x, all.find(y => y.CarNumber === x.CarNumber)));
    this.myOrders = mapWithTypes.map(x => Object.assign(x, types.find(y => y.TypeID === x.TypeID)));
    this.myOrders.forEach(order => {
      order['diffDaysRentTime'] = this.diffDays(new Date(order.StartTime), new Date(order.EndTime));
        order['diffDaysReturn'] =  order.ReturnTime ?  this.diffDays(new Date(order.EndTime), new Date(order.ReturnTime)) : 0;
    });
    console.log(this.myOrders);
  }
}
