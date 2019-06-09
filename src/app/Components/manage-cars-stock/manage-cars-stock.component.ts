import { Component, OnInit, ViewChild } from '@angular/core';
import { CarsService } from 'src/app/Services/cars.service';
import { MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import sweetalert2 from 'sweetalert2';
import { BranchesService } from 'src/app/Services/branches.service';
import { AddCarStockComponent } from '../add-car-stock/add-car-stock.component';

export interface ICarStock {
  CarNumber: string;
  TypeID: number;
  Mileage: number;
  Proper: string;
  Available: string;
  BranchID: number;
}

@Component({
  selector: 'app-manage-cars-stock',
  templateUrl: './manage-cars-stock.component.html',
  styleUrls: ['./manage-cars-stock.component.scss']
})
export class ManageCarsStockComponent implements OnInit {
  constructor(private carsApi: CarsService, private branchApi: BranchesService, public dialog: MatDialog) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  carsStock: ICarStock[];
  branches: any;
  gears: string[] = ['Automatic', 'Manually'];
  displayedColumns: string[] = ['CarNumber', 'Mileage', 'Proper', 'Available', 'BranchID', 'Actions'];
  dataSource = new MatTableDataSource<ICarStock>();
  YesNo: string[] = ['Yes', 'No'];

  addCarToStock() {
    const dialogRef = this.dialog.open(AddCarStockComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  deleteCarToStock(car: ICarStock) {
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
        const deleteCarStockResponse = await this.carsApi.deleteCarStock(car);
        if (deleteCarStockResponse.indexOf('successfully') > -1) {
          sweetalert2.fire(
            'Updated!',
            `Car has been deleted successfully.`,
            'success'
          );
          this.ngOnInit();
        } else {
          sweetalert2.fire({
            type: 'error',
            title: 'Something went wrong!',
            html: `Failed to delete selected Car,<br>This might happen since this car is ordered ! `,
          });
        }
      }
    });



  }
  updateCarToStock(car: ICarStock) {
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
        const carStockUpdateResponse = await this.carsApi.updateCarStock(car);
        if (carStockUpdateResponse.indexOf('successfully') > -1) {
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
            html: `Failed to update Car!`,
          });
        }
      }
    });
  }

  async ngOnInit() {
    this.carsStock = await this.carsApi.getAllCars();
    this.carsStock.forEach(u => {
      u['isEdit'] = true;
    });
    this.branches = await this.branchApi.getBranches();
    this.dataSource.data = this.carsStock;
    this.dataSource.paginator = this.paginator;
  }

}
