import { Component, OnInit} from '@angular/core';

import { AlertService } from './alert.service';
// import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  message: any;
  toast: any = {
    duration: 1000,
    message: this.message, 
    position: 'center',

  }


  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {this.message = message;});
  }

}
