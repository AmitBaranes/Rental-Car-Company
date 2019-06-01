import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent, ErrorStateMatcher } from '@angular/material';
import sweetalert2 from 'sweetalert2';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';
import { Router } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


export class IUser {
  FirstName: string;
  LastName: string;
  ID: string;
  DateOfBirth: string;
  Gender: string;
  Email: string;
  Password: string;
  Image: string;
  RoleType: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
  constructor(private usersApi: UsersService, public router: Router ) {}
  submitted: boolean;
  roleTypes: string[] = ['Customer', 'Manager', 'Admin'];
  matcher = new MyErrorStateMatcher();
  form: IUser = new IUser();
  // Validation - Minimum date for regeister is 16.
  maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 16));
  fg: FormGroup = new FormGroup({
  emailFormControl : new FormControl('', [
    Validators.required,
    Validators.email,
  ]),
  firstNameFormControl : new FormControl('', [
    Validators.required,
    Validators.pattern(/^\S*$/),
    Validators.pattern(/^[a-zA-Z]+$/)
  ]),
  lastNameFormControl : new FormControl('', [
    Validators.required,
    Validators.pattern(/^\S*$/),
    Validators.pattern(/^[a-zA-Z]+$/)
  ]),
  IDFormControl : new FormControl('', [
    Validators.required,
    Validators.pattern(/^\S*$/),
    Validators.pattern(/^\d+$/)
  ]),
  userNameFormControl : new FormControl('', [
    Validators.required,
    Validators.pattern(/^\S*$/),
  ]),
  passwordFormControl : new FormControl('', [
    Validators.required,
    Validators.pattern(/^\S*$/),
  ])
});

  async register() {
    if (!this.form.RoleType && this.router.url.indexOf('register') > -1) {
      this.form.RoleType = 'C';
    }
    if (!this.fg.valid || typeof  this.form.Gender === 'undefined' || typeof  this.form.RoleType === 'undefined') {
      sweetalert2.fire({
        type: 'error',
        title: 'Oops...',
        html: '<h3>Some fields are missing or incorrect!</h3>',
      });
      return;
    }
  const addNewUser = await this.usersApi.register(this.form);
  if (addNewUser.indexOf('successfully') > -1 ) {
    sweetalert2.fire({
      type: 'info',
      title: `Welcome ${this.form.FirstName} ${this.form.LastName}`,
    });
  }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (e) => { // called once readAsDataURL is completed
       if (e.target['result'].split(';')[0].indexOf('image') > -1 ) {
        this.form.Image = e.target['result'];
       } else {
        sweetalert2.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Invalid file,Please upload Image.',
        });
       }
      };
    }
}

addDate(event: MatDatepickerInputEvent<Date>) {
  this.form.DateOfBirth = event.value.toISOString().split('T')[0];
}

SelectedValue(key: string, value: string) {
  this.form[`${key}`] = value;
}

  uploadFile() {
    document.getElementById('btn-uploadfile').click();
  }

  ngOnInit() {

}

}
