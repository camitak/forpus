import { LoginComponent } from './login/login.component';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './login/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  private showLogin: boolean =  true;
  login: string = 'Login';
  showMenu: boolean;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.showLoginEmmiter.subscribe(
      showLogoutLogin => {
        this.showLogin = showLogoutLogin;
        this.showMenu = !showLogoutLogin;
        if(this.showLogin){
          this.login = 'Login';
        } else{
          this.login = 'Logout';
        }
      }
    )

    if(localStorage.getItem('currentUser')){
      // logged in so return true
      this.login = 'Logout';
      this.showMenu = true;
    } else{
      this.login = 'Login';
      this.showMenu = false;
    }

  }
}
