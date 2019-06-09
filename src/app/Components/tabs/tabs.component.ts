import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CarsService } from 'src/app/Services/cars.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  constructor(private router: Router, private carsApi: CarsService) { }
  jwtHelper = new JwtHelperService();
  tokenDecoder: any;
  userName: string;

  async getNumberOfOrders() {
    const userID = this.tokenDecoder.userID;
    return await this.carsApi.getAllRentCars().then(res => res.filter(order => order.UserID === userID).length);
  }

  async ngOnInit() {
    const token = sessionStorage.getItem('token');
    this.tokenDecoder = this.jwtHelper.decodeToken(token);
    this.userName = this.tokenDecoder.userName;
  }

}
