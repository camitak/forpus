import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel-fund',
  templateUrl: './panel-fund.component.html',
  styleUrls: ['./panel-fund.component.scss']
})
export class PanelFundComponent implements OnInit {

  private subscriptionR: Subscription;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscriptionR = this.route.params.subscribe((params: any) => {
      console.log(params);
      let id = params['fund'];
    });
  }

  ngOnDestroy(){
    this.subscriptionR.unsubscribe();
  }
}
