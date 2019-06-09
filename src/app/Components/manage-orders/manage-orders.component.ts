import { Component, OnInit, ViewChild } from '@angular/core';
import { CarsService } from 'src/app/Services/cars.service';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import sweetalert2 from 'sweetalert2';
import { AddOrderComponent } from '../add-order/add-order.component';

export interface ICarOrder {
CarNumber: string;
UserID: number;
StartTime: Date;
EndTime: Date;
ReturnTime: Date;
}




@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private carsApi: CarsService, public dialog: MatDialog) { }
  orders: ICarOrder[];
  gears: string[] = ['Automatic', 'Manually'];
  displayedColumns: string[] = ['CarNumber', 'UserID', 'StartTime', 'EndTime', 'ReturnTime', 'Actions'];
  dataSource = new MatTableDataSource<ICarOrder>();

  addOrder() {
    const dialogRef = this.dialog.open(AddOrderComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  updateOrder(order: ICarOrder) {
    sweetalert2.fire({
      title: `Are you sure you want to update the selected order?`,
      text: `You won't be able to revert this!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes,I'm 100% sure!`
    }).then(async  (result) => {
      if (result.value) {
        const carOrderUpdateResponse = await this.carsApi.updateCarOrder(order);
        if (carOrderUpdateResponse.indexOf('successfully') > -1) {
          sweetalert2.fire(
            'Updated!',
            `Car Order has been updated successfully.`,
            'success'
          );
          this.ngOnInit();
        } else {
          sweetalert2.fire({
            type: 'error',
            title: 'Something went wrong!',
            html: `Failed to update Car Order!`,
          });
        }
      }
    });
  }
  deleteOrder(order: ICarOrder) {
    sweetalert2.fire({
      title: `Are you sure you want to delete the selected order?`,
      text: `You won't be able to revert this!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes,I'm 100% sure!`
    }).then(async  (result) => {
      if (result.value) {
        const deleteCarTypeResponse = await this.carsApi.deleteCarOrder(order);
        if (deleteCarTypeResponse.indexOf('successfully') > -1) {
          sweetalert2.fire(
            'Updated!',
            `Order has been deleted successfully.`,
            'success'
          );
          this.ngOnInit();
        } else {
          sweetalert2.fire({
            type: 'error',
            title: 'Something went wrong!',
            html: `Failed to delete Order!`,
          });
        }
      }
    });
  }


  async ngOnInit() {
    this.orders = await this.carsApi.getAllRentCars();
    this.orders.forEach(u => {
      u['isEdit'] = true;
    });
    this.dataSource.data = this.orders;
    this.dataSource.paginator = this.paginator;
  }

}
