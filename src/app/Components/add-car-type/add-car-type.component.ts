import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/Services/cars.service';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import sweetalert2 from 'sweetalert2';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class ICarType {
  Manufacturer: string;
  Model: string;
  CostPerDay: number;
  CostPerDayDelay: number;
  Year: string;
  Gear: string;
  Image: string;
}


@Component({
  selector: 'app-add-car-type',
  templateUrl: './add-car-type.component.html',
  styleUrls: ['./add-car-type.component.scss']
})
export class AddCarTypeComponent implements OnInit {

  constructor(private carApi: CarsService) { }
  form: ICarType = new ICarType();
  matcher = new MyErrorStateMatcher();
  fg: FormGroup = new FormGroup({
    ManufacturerFormControl : new FormControl('', [
      Validators.required,
      Validators.pattern(/^\S*$/),
      Validators.pattern(/^[a-zA-Z]+$/)
    ]),
    ModelFormControl : new FormControl('', [
      Validators.required,
      Validators.pattern(/^\S*$/),
    ]),
    CostPerDayFormControl : new FormControl('', [
      Validators.required,
      Validators.pattern(/^\S*$/),
      Validators.pattern(/^\d+(\.\d{1,6})?$/)
    ]),
    CostPerDayDelayFormControl : new FormControl('', [
      Validators.required,
      Validators.pattern(/^\S*$/),
      Validators.pattern(/^\d+(\.\d{1,6})?$/)
    ]),
    YearFormControl : new FormControl('', [
      Validators.required,
      Validators.pattern(/^\S*$/),
      Validators.pattern(/^\d+$/)
    ])
  });

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (e) => {
       if (e.target['result'].split(';')[0].indexOf('image') > -1 ) {
         const imageURL = e.target['result'];
         this.form.Image = imageURL;
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

async addCarType() {
  if (!this.fg.valid || typeof  this.form.Gear === 'undefined' || typeof  this.form.Image === 'undefined') {
    sweetalert2.fire({
      type: 'error',
      title: 'Oops...',
      html: '<h3>Some fields are missing or incorrect!</h3>',
    });
    return;
  }
 //TODO! 
  // const addNewUser = await this.carApi.add(this.form);
  // if (addNewUser.indexOf('successfully') > -1 ) {
  //   sweetalert2.fire({
  //     type: 'info',
  //     title: `Welcome ${this.form.FirstName} ${this.form.LastName}`,
  //   });
  // }
  //TODO! 
}


  ngOnInit() {
  }

}
