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

  public async  getAllRentCars() {
    const allRentCars = await this.http.get<any>(`${serverURL}/getAllRentCars`).toPromise();
    return allRentCars;
  }

  public async updateCarStock(car: any) {
    const updateCarResponse = await this.http.put<any>(`${serverURL}/updateCarStock`, car).toPromise()
    .then(res => res.Message, (err: HttpErrorResponse) => err.message);
    return updateCarResponse;
  }

  public async updateCarOrder(carOrder: any) {
    const updateCarResponse = await this.http.put<any>(`${serverURL}/updateCarOrder`, carOrder).toPromise()
    .then(res => res.Message, (err: HttpErrorResponse) => err.message);
    return updateCarResponse;
  }

  public async updateCarType(carType: any) {
    const carTypeResponse = await this.http.put<any>(`${serverURL}/updateCarType`, carType).toPromise()
    .then(res => res.Message, (err: HttpErrorResponse) => err.message);
    console.log(carTypeResponse);
    return carTypeResponse;
  }


  public async addRentOrder(rentCar: any) {
    const rentCarResponse = await this.http.post<any>(`${serverURL}/addRentOrder`, rentCar).toPromise()
    .then(res => res.Message, (err: HttpErrorResponse) => err.message);
    return rentCarResponse;
  }

  public async addCarToStock(car: any) {
    const rentCarResponse = await this.http.post<any>(`${serverURL}/addCar`, car).toPromise()
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


  public async deleteCarStock(CarStock: any) {
    const deleteCarRentResponse = await this.http.post<any>(`${serverURL}/deleteCarForRent`, CarStock).toPromise()
    .then(res => res.Message, (err: HttpErrorResponse) => err.message);
    return deleteCarRentResponse;
  }

  public async deleteCarOrder(carOrder: any) {
    const deleteCarOrderResponse = await this.http.post<any>(`${serverURL}/deleteCarOrder`, carOrder).toPromise()
    .then(res => res.Message, (err: HttpErrorResponse) => err.message);
    return deleteCarOrderResponse;
  }


}
