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
    const carsType = await this.http.get<any>(`${serverURL}/getAllCarsType`).toPromise();
    return carsType;
  }

  public async  getAllCars() {
    const allCars = await this.http.get<any>(`${serverURL}/getAllCars`).toPromise();
    return allCars;
  }

  public async updateCar(car: any) {
    const updateCarResponse = await this.http.put<any>(`${serverURL}/updateCar`, car).toPromise()
    .then(res => res.Message, (err: HttpErrorResponse) => err.message);
    return updateCarResponse;
  }

  public async updateCarType(carType: any) {
    const carTypeResponse = await this.http.put<any>(`${serverURL}/updateCarType`, carType).toPromise()
    .then(res => res.Message, (err: HttpErrorResponse) => err.message);
    console.log(carTypeResponse);
    return carTypeResponse;
  }


  public async addRentCar(rentCar: any) {
    const rentCarResponse = await this.http.post<any>(`${serverURL}/addRent`, rentCar).toPromise()
    .then(res => res.Message, (err: HttpErrorResponse) => err.message);
    return rentCarResponse;
  }


  public async addCarType(rentCar: any) {
    const addCarTypeResponse = await this.http.post<any>(`${serverURL}/addCarType`, rentCar).toPromise()
    .then(res => res.Message, (err: HttpErrorResponse) => err.message);
    return addCarTypeResponse;
  }


  public async deleteCarType(carType: any) {
    const deleteCarTypeResponse = await this.http.post<any>(`${serverURL}/deleteCarType`, carType).toPromise()
    .then(res => res.Message, (err: HttpErrorResponse) => err.message);
    return deleteCarTypeResponse;
  }




}
