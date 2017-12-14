import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './../login/user.service';
import { User } from './../login/user';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterStateSnapshot, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  currentUser: User;
  users: User[] = [];
 
  private subscriptionR: Subscription;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
  }

  ngOnInit() {
  }
  
}
