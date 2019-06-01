import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.scss']
})
export class RentCarComponent implements OnInit {

  constructor(private router: Router) {
    // const navigation = this.router.getCurrentNavigation();

  }
  


  ngOnInit() {
  }

}
