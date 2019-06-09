import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CarsService } from './cars.service';
import { Router } from '@angular/router';

@Injectable()
export class CommonService {
    constructor(private carsApi: CarsService, private router: Router) { }
    jwtHelper = new JwtHelperService();

    signOut() {
        sessionStorage.clear();
        this.router.navigate(['/home']);
    }

    getToken() {
        return sessionStorage.getItem('token');
    }

    getUserName(): string {
        const token = this.getToken();
        return token ? this.jwtHelper.decodeToken(token).userName : null;
    }

    getRole(): string {
        const token = this.getToken();
        return token ? this.jwtHelper.decodeToken(token).role : null;
    }

    getUserID(): number {
        const token = this.getToken();
        return this.jwtHelper.decodeToken(token).userID;
    }

    async setNumbersOfOrders() {
        const userID = this.getUserID();
        if (userID) {
            const numberOfOrders = await this.carsApi.getRentCarsByUserID(userID).then(res => res.length);
            sessionStorage.removeItem('numberOfOrders');
            sessionStorage.setItem('numberOfOrders', numberOfOrders);
        }
    }

}
