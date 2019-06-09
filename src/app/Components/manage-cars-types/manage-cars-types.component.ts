import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import sweetalert2 from 'sweetalert2';
import { CarsService } from 'src/app/Services/cars.service';
import { AddCarTypeComponent } from '../add-car-type/add-car-type.component';

export interface ICarType {
  Manufacturer: string;
  Model: string;
  Gear: string;
  Image: string;
  Year: string;
  CostPerDay: number;
  CostPerDayDelay: number;
}


@Component({
  selector: 'app-manage-cars-types',
  templateUrl: './manage-cars-types.component.html',
  styleUrls: ['./manage-cars-types.component.scss']
})
export class ManageCarsTypesComponent implements OnInit {
  constructor(private carsApi: CarsService, private dialog: MatDialog) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  gears: string[] = ['Automatic', 'Manually'];
  displayedColumns: string[] = ['Manufacturer', 'Model', 'Gear', 'Year', 'CostPerDay', 'CostPerDayDelay' , 'Image', 'Actions'];
  dataSource = new MatTableDataSource<ICarType>();
  carsType: ICarType[];


  onSelectFile(event, carType: ICarType) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (e) => {
       if (e.target['result'].split(';')[0].indexOf('image') > -1 ) {
         const imageURL = e.target['result'];
         carType.Image = imageURL;
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



addCarType() {
    const dialogRef = this.dialog.open(AddCarTypeComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
}


async deleteCarType(carType: ICarType) {
  sweetalert2.fire({
    title: `Are you sure you want to delete the selected car?`,
    text: `You won't be able to revert this!`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: `Yes,I'm 100% sure!`
  }).then(async  (result) => {
    if (result.value) {
      const deleteCarTypeResponse = await this.carsApi.deleteCarType(carType);
      if (deleteCarTypeResponse.indexOf('successfully') > -1) {
        sweetalert2.fire(
          'Updated!',
          `Car Type has been deleted successfully.`,
          'success'
        );
        this.ngOnInit();
      } else {
        sweetalert2.fire({
          type: 'error',
          title: 'Something went wrong!',
          html: `Failed to delete Car Type,<br>This might happen since this car type exists under cars stock!`,
        });
      }
    }
  });
 }

async updateCarType(carType: ICarType) {
  sweetalert2.fire({
    title: `Are you sure you want to update the selected car?`,
    text: `You won't be able to revert this!`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: `Yes,I'm 100% sure!`
  }).then(async  (result) => {
    if (result.value) {
      const carTypeUpdateResponse = await this.carsApi.updateCarType(carType);
      if (carTypeUpdateResponse.indexOf('successfully') > -1) {
        sweetalert2.fire(
          'Updated!',
          `Car Type has been updated successfully.`,
          'success'
        );
        this.ngOnInit();
      } else {
        sweetalert2.fire({
          type: 'error',
          title: 'Something went wrong!',
          html: `Failed to update Car Type,<br>This might happen since car type already exists!`,
        });
      }
    }
  });
}

  async ngOnInit() {
    this.carsType = await this.carsApi.getAllCarsType();
    this.carsType.forEach(u => {
      u['isEdit'] = true;
    });
    this.dataSource.data = this.carsType;
    this.dataSource.paginator = this.paginator;
  }

}
