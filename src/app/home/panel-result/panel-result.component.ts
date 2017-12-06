import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-panel-result',
  templateUrl: './panel-result.component.html',
  styleUrls: ['./panel-result.component.scss']
})
export class PanelResultComponent implements OnInit {

  private subscriptionR: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscriptionR = this.route.params.subscribe((params: any) => {
      let id = params['result'];
    });
    console.log(this.router.routerState);
  }

  ngOnDestroy(){
    this.subscriptionR.unsubscribe();
  }

}
