import { AlertService } from './../alert/alert.service';
import { UserService } from './../login/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  ngOnInit(): void {
  }

  model: any = {};
  loading = false;

  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) { }

  register() {
      this.loading = true;
      this.userService.create(this.model)
          .subscribe(
              data => {
                  // set success message and pass true paramater to persist the message after redirecting to the login page
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}
