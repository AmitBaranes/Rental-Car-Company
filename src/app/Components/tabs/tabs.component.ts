import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/commonService';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor(private commonService: CommonService) {
  }

  signOut() {
    this.commonService.signOut();
  }

  getUserName(): string {
    return this.commonService.getUserName();
  }

  getRole(): string {
    return this.commonService.getRole();
  }

  getNumberOfOrders() {
    return sessionStorage.getItem('numberOfOrders');
  }

  ngOnInit() {
  }
}
