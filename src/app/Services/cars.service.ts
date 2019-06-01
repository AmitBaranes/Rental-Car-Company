import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
const serverURL = 'http://localhost:8080/api/Cars';

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
export class CarsService {

  constructor(private http: HttpClient) { }
  public async  getAllCarsType() {
    const cars =  await this.http.get<any>(`${serverURL}/getAllCarsType`).toPromise();
    return cars;
  }

  public async  getAllCars() {
    const cars =  await this.http.get<any>(`${serverURL}/getAllCars`).toPromise();
    return cars;
  }

public async updateCar(car: any) {
const updateCarResponse = await this.http.put<any>(`${serverURL}/updateCar`, car).toPromise().then(res => res.Message);
return updateCarResponse ;
}


public async updateRentCar(car: any) {

  //TODO ! 
  const updateCarResponse = await this.http.put<any>(`${serverURL}/updateRentCar`, car).toPromise().then(res => res.Message);
  return updateCarResponse ;
  //TODO !
  }

}
