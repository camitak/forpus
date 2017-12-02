import { DataService } from './../../services/data.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-detail',
  templateUrl: './panel-detail.component.html',
  styleUrls: ['./panel-detail.component.scss']
})
export class PanelDetailComponent implements OnInit {

  subscriptionR: Subscription;
  panelsInfo: any;

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    //get parent activated route info
    this.subscriptionR = this.route.params.subscribe((params: any) => {
      let id = params['nameP'];
      this.panelsInfo = this.dataService.getPanels();
      if(this.panelsInfo === null){
        this.panelsInfo = [];
      }
    });   
  }

  ngOnDestroy(){
    this.subscriptionR.unsubscribe();
  }

}
