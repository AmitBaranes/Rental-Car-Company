import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
const serverURL = 'http://localhost:8080/api/Users';

interface IUser {
  FirstName: string;
  LastName: string;
  ID: string;
  DateOfBirth: string;
  Gender: string;
  Email: string;
  Password: string;
  Image: string;
  RoleType: string;
}

interface IAuthenticatedUser {
  email: string;
  password: string;
}

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }
  public async  getAllUsers() {
    return await this.http.get<IUser>(`${serverURL}/GetUsers`).toPromise();
  }

  public async register(user: IUser) {
    const body = {...user };
    const response: any = await this.http.post(`${serverURL}/adduser`, body ).toPromise();
    return response.Message;
  }

  public async login(email: string , password: string) {
    const body: IAuthenticatedUser = {'email': email, 'password': password };
    const response: any = await this.http.post(`${serverURL}/isAuthenticated`, body).toPromise().then(
      res => res , (err: HttpErrorResponse) => err);
    return response;
  }

public async deleteUser(id: string) {
const params = { id };
const deleteUserResponse = this.http.delete<any>(`${serverURL}/deleteUser`, {params} ).toPromise().then(res => res.Message);
return deleteUserResponse;
}

public async updateUser(user: IUser) {
  const updateUserResponse = this.http.put<any>(`${serverURL}/updateUser`, user ).toPromise().then(res => res.Message);
  return updateUserResponse;
  }
}
