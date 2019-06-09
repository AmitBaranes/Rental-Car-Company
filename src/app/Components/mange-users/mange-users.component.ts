import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import { MatTableDataSource, MatPaginator, MatDatepickerInputEvent, MatDialog } from '@angular/material';
import sweetalert2 from 'sweetalert2';
import { RegisterComponent } from '../register/register.component';



interface IUser {
  UserID: number;
  FirstName: string;
  LastName: string;
  ID: string;
  DateOfBirth: string;
  Gender: string;
  Email: string;
  Password: string;
  Image: string;
  RoleType: string;
  isEdit: boolean;
  icon: boolean;
}


@Component({
  selector: 'app-mange-users',
  templateUrl: './mange-users.component.html',
  styleUrls: ['./mange-users.component.scss']
})
export class MangeUsersComponent implements OnInit {
  constructor(private userApi: UsersService, private dialog: MatDialog) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  allUsers: any;
  genders: string[] = ['Male', 'Female', 'Other'];
  displayedColumns: string[] = ['FirstName', 'LastName', 'ID', 'DateOfBirth', 'Gender', 'Email', 'RoleType', 'Image', 'Actions'];
  dataSource = new MatTableDataSource<any>();


  onSelectFile(event, user: IUser) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (e) => {
       if (e.target['result'].split(';')[0].indexOf('image') > -1 ) {
         const imageURL = e.target['result'];
         user.Image = imageURL;
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


  async deleteUser(user: IUser) {
    sweetalert2.fire({
      title: `Are you sure you want to delete ${user.FirstName} ${user.LastName}?`,
      text: `You won't be able to revert this!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes,I'm 100% sure!`
    }).then(async  (result) => {
      if (result.value) {
        const deleteResponse = await this.userApi.deleteUser(user.ID);
        if (deleteResponse.indexOf('successfully') > -1) {
          sweetalert2.fire(
            'Deleted!',
            `${user.FirstName} ${user.LastName} has been deleted successfully.`,
            'success'
          );
        } else {
          sweetalert2.fire({
            type: 'error',
            title: 'Something went wrong!',
            text: `Failed to delete ${user.FirstName} ${user.LastName}`,
          });
        }
      }
    });
    this.ngOnInit();
}

async updateUser(user: IUser) {
  sweetalert2.fire({
    title: `Are you sure you want to update User ID: ${user.ID}?`,
    text: `You won't be able to revert this!`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: `Yes,I'm 100% sure!`
  }).then(async  (result) => {
    if (result.value) {
  const userResponse = await this.userApi.updateUser(user);
      if (userResponse.indexOf('successfully') > -1) {
        sweetalert2.fire(
          'Updated!',
          `${user.ID} has been updated successfully.`,
          'success'
        );
        this.ngOnInit();
      } else {
        sweetalert2.fire({
          type: 'error',
          title: 'Something went wrong!',
          text: `Failed to update ${user.ID}`,
        });
      }
    }
  });

}


userDateOfBirth(event: MatDatepickerInputEvent<Date>, user: IUser) {
const newDateOfBirth: string = event.value.toLocaleString('en-US');
user.DateOfBirth = newDateOfBirth;
}



addUser(): void {
  const dialogRef = this.dialog.open(RegisterComponent, {
  });

  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
  });
}



  async ngOnInit() {
    this.allUsers = await this.userApi.getAllUsers();
    this.allUsers.forEach(u => {
      u['isEdit'] = true;
    });
    this.dataSource.data = this.allUsers;
    this.dataSource.paginator = this.paginator;

  }

}
