import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { CarsService } from 'src/app/Services/cars.service';
import { BranchesService } from 'src/app/Services/branches.service';
import sweetalert2 from 'sweetalert2';

export class ICarStock {
  CarNumber: string;
  TypeID: number;
  Mileage: number;
  Proper: string;
  Available: string;
  BranchID: number;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-car-stock',
  templateUrl: './add-car-stock.component.html',
  styleUrls: ['./add-car-stock.component.scss']
})
export class AddCarStockComponent implements OnInit {
  constructor(private carApi: CarsService, private branchApi: BranchesService, public dialog: MatDialog) {}
  carsType: any;
  branches: any;
  rentCar: ICarStock = new ICarStock();
  YesNo: string[] = ['Yes', 'No'];
  matcher = new MyErrorStateMatcher();
    CarNumberFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^\S*$/),
      Validators.pattern( /^\d+$/)
    ]);
    MileageFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9.,]+$/)
    ]);

  async addCarStock() {
    const classLength = Object.keys(this.rentCar).length;
    if (classLength !== 6  || !this.CarNumberFormControl.valid || !this.MileageFormControl.valid) {
      sweetalert2.fire({
        type: 'error',
        title: 'Oops...',
        html: '<h3>some fields on your form are invalid!<br>please check your information</h3>',
      });
      return;
    }
    const addCarToStockResponse = await this.carApi.addCarToStock(this.rentCar);
    if (addCarToStockResponse.indexOf('successfully') > -1 ) {
      sweetalert2.fire({
        type: 'info',
        title: `Car successfully added to stock`,
      });
    } else {
      sweetalert2.fire({
        type: 'error',
        title: 'Something went wrong!',
        text: `Failed to add car!`,
      });
   }
  }

  async ngOnInit() {
    this.carsType = await this.carApi.getAllCarsType();
    this.branches = await this.branchApi.getBranches();
  }

}
