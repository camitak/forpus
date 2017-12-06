import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './../login/user.service';
import { User } from './../login/user';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  currentUser: User;
  users: User[] = [];
  refreshTimes = [
    { time: -1, timeLabel: 'Selecione'},
    { time: 10, timeLabel: '10 segundos'},
    { time: 15, timeLabel: '15 segundos'},
    { time: 0, timeLabel: 'Customizar tempo'}
  ];
  showCustomTimeInput: boolean = false;
  refreshValueSelected: number;
  customValueInp: number;

  private subscriptionR: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.refreshValueSelected = 0;
    // this.subscriptionR = this.route.paramMap.switchMap((params: ParamMap) => {

    // })  
  }

  onChangeSelect(value){
    if( value == 0){
      this.showCustomTimeInput = true;
      this.refreshValueSelected = 0;
    } else{
      this.showCustomTimeInput = false;
      this.refreshValueSelected = value;
    }
    console.log(this.refreshValueSelected);
  }

  onClickPause(){
    console.log(this.refreshValueSelected);
  }

  
}
