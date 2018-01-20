import { error } from 'selenium-webdriver';
import { Injectable } from '@angular/core';
import { Route, CanLoad, Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { CanActivateChild } from '@angular/router/src/interfaces';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
    
    private isAuth: any = false;

    constructor(
        private router: Router,
        private dataService: DataService,
    ) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        // let isAuthenticated: boolean = false;
        return true;
        // let isAuthenticated = this.dataService.ensureAuth().subscribe(res => {
        //     if(res && localStorage.getItem('currentUser')){
        //         return true;
        //     }else{
        //         return false;
        //     }
        // });

        // // not logged in so restrict to login page with the return url
        // if(isAuthenticated){
        //     return true;
        // }else{
        //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        //     return false;
        // }
       
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // this.isAuth = this.dataService.ensureAuth().subscribe(data => {
        //     console.log();
        //     console.log(data);
        // });
        // console.log(this.isAuth);

        if(localStorage.getItem('currentUser') && this.dataService.ensureAuth()){
            return true;
        }
        
        // not logged in so restrict to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }


    canLoad(route: Route):
    Observable<boolean>|Promise<boolean>|boolean {
       // return this.permissions.canLoadChildren(this.currentUser, route);
       console.log('canload: verificando acesso');
       return true;
 
    }
}