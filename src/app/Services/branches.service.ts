import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
const serverURL = 'http://localhost:8080/api/Branches';

// interface IUser {
//   FirstName: string;
//   LastName: string;
//   ID: string;
//   DateOfBirth: string;
//   Gender: string;
//   Email: string;
//   Password: string;
//   Image: string;
//   RoleType: string;
// }

// interface IAuthenticatedUser {
//   email: string;
//   password: string;
// }

@Injectable()
export class BranchesService {
  constructor(private http: HttpClient) { }

async getBranches() {
return await this.http.get(`${serverURL}/getBranches`).toPromise();
}

}
