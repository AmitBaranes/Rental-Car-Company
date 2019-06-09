import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import sweetalert2 from 'sweetalert2';
import { UsersService } from 'src/app/Services/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material';
import { CommonService } from 'src/app/Services/commonService';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
   animations: [
    trigger('shakeit', [
      state('shakestart', style({
        transform: 'scale(1)',
      })),
      state('shakeend', style({
        transform: 'scale(1)',
      })),
      transition('shakestart => shakeend', animate('1200ms ease-in',     keyframes([
        style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.1 }),
        style({ transform: 'translate3d(2px, 0, 0)', offset: 0.2 }),
        style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.3 }),
        style({ transform: 'translate3d(4px, 0, 0)', offset: 0.4 }),
        style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.5 }),
        style({ transform: 'translate3d(4px, 0, 0)', offset: 0.6 }),
        style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.7 }),
        style({ transform: 'translate3d(2px, 0, 0)', offset: 0.8 }),
        style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.9 }),
      ]))),
    ])]
})
export class LoginComponent {
  jwtHelper = new JwtHelperService();
  states = {};
  showFailedLogin = false;
  hide = true;
  constructor(private router: Router, private users: UsersService, private dialog: MatDialog, private commonService: CommonService) {
    this.states['state1'] = 'shakestart';
    this.states['state2'] = 'shakestart';
  }

  matcher = new MyErrorStateMatcher();

  whiteSpacesValidationEmail = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(/^\S*$/)
  ]);

  whiteSpacesValidationPassword = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\S*$/)
  ]);

  async getUserNamePassword(email: string, password: string) {
    if (!email || !password) {
      sweetalert2.fire({
        type: 'error',
        title: 'Oops...',
        html: '<h3>User name or password are missing!</h3>',
      });
      return;
    }
    this.showFailedLogin = false;
    const loginResponse = await this.users.login(email, password);
    if (!loginResponse.status) {
      sessionStorage.setItem('token', loginResponse.Message);
      this.commonService.setNumbersOfOrders();
      if (this.router.url.indexOf('login') > -1) {
        this.router.navigate(['/home']);
      } else {
        this.dialog.closeAll();
      }
    } else {
      this.shakeMe('state1');
      this.showFailedLogin = true;
    }
  }

  shakeMe(stateVar: string) {
    this.states[stateVar] = (this.states[stateVar] === 'shakestart' ? 'shakeend' : 'shakestart');
  }

  shakeEnd(stateVar: string) {
    this.states[stateVar] = 'shakeend';
  }

}
