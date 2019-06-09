import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/Services/cars.service';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialog, MatDatepickerInputEvent } from '@angular/material';
import sweetalert2 from 'sweetalert2';
import { NativeDateAdapter, DateAdapter,  } from '@angular/material';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    const formatString = 'YYYY';
    return moment(date).format(formatString);
  }
}


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
  styleUrls: ['./add-car-type.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter
    }
  ]
})
export class AddCarTypeComponent implements OnInit {

  constructor(private carApi: CarsService, public dialog: MatDialog) { }
  form: ICarType = new ICarType();
  matcher = new MyErrorStateMatcher();
  nextYear = new Date().getFullYear() + 1;
  maxDate = new Date(this.nextYear, 0, 1);
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
    DateFormControl : new FormControl('', [
      Validators.required,
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


addYearToForm(event: Date) {
  this.fg.get('DateFormControl').setValue(event);
  this.form.Year  = event.getFullYear().toString();
}

async addCarType() {
  if (!this.fg.valid || typeof  this.form.Gear === 'undefined' || typeof  this.form.Image === 'undefined') {
    sweetalert2.fire({
      type: 'error',
      title: 'Oops...',
      html: '<h3>some fields on your form are invalid!<br>please check your information</h3>',
    });
    return;
  }
  const addCarTypeResponse = await this.carApi.addCarType(this.form);
  if (addCarTypeResponse.indexOf('successfully') > -1 ) {
    sweetalert2.fire({
      type: 'info',
      title: `Car Type added successfully`,
    });
  } else {
    sweetalert2.fire({
      type: 'error',
      title: 'Something went wrong!',
      text: `Failed to add car type!`,
    });
 }
}


  ngOnInit() {
  }

}
