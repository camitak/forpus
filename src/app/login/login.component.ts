import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AlertService } from './../alert/alert.service';
import { AuthenticationService } from './authentication.service';

// Others
import { User } from './user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading: boolean = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private authenticationService: AuthenticationService, 
    private alertService: AlertService
    ) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.queryParams['returnUrl'] || '/';
  }

  login(){
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
      .subscribe(data => {
        this.router.navigate([this.returnUrl]);
      }, 
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

}
