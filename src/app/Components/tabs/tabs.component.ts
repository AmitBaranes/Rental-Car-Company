import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  // username = 'Amit Baranes';
  // logout() {}
  // isLoggedIn(): boolean {
  // return false;
  // }

  // signUp() {
  //   this.router.navigate(['/signUp']);
  // }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
