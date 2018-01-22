import { TableConfigComponent } from './../../configs/table-config/table-config.component';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Panel } from './panel';

import "rxjs/Rx";
import { Router, ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';

// import 'rxjs/add/operator/retry';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})

export class PanelComponent implements OnInit {

  panelsType1: any = 
    { panelBenchmark: {
        code: 'Código',
        volume: 'Volume Projetado',
        percVol: '% Volume'},
      biggerVol30: {
        code: 'Código',
        volume: 'Quantidade',
        percVol: '% Vol'}};

  typeLabel: string[] = [
    'Altas',
    'Baixas'
  ]

  typeLabel2: string[] = [
    'DATA X',
    'DATA Y'
  ]
  private pricesType: any;
  private securities: any;
  private dataRanking: any;
  private timeR: any;
  countdown: any;
  private timecount: any;

  dataPanel1Hr: any;
  securitySelected: string;
  securitySInfo: any;
// 
// Configuracoes - que ficarao parametrizaveis
// 
// 
  private subscriptionR: Subscription; 
  private nRanking: string = '10';
  panels: Panel[];

  refreshTimes = [
    { time: -1, timeLabel: 'Selecione'},
    { time: 10, timeLabel: '10 segundos'},
    { time: 15, timeLabel: '15 segundos'},
    { time: 0, timeLabel: 'Customizar tempo'}
  ];
  showCustomTimeInput: boolean = false;
  refreshValueSelected: number;
  customValueInp: number;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.refreshValueSelected = 10;
    this.panels = this.dataService.getPanels();
    
    this.getPricesTypes();
    this.getSecurities();
    // this.getPanels();
    // this.countdownTimer();

    this.refreshPanel(); 
  }

  getPanels(){
    for(let i=0; i<this.panels.length; i++ ){

      (function (parent, idx) {
        parent.dataService.getTopRankingFullH(
          parent.panels[idx].panelPriceType, 
          parent.panels[idx].nValuesRankingH)
          .subscribe(rkdataH => {
            parent.panels[idx].resultTableH = JSON.parse(rkdataH || '');  
          });
        parent.dataService.getTopRankingFullL(
          parent.panels[idx].panelPriceType,
          parent.panels[idx].nValuesRankingL).subscribe(rkdataL => {
            parent.panels[idx].resultTableL = JSON.parse(rkdataL || '');
          })
      })(this, i);
    }
  }

  getPricesTypes(){
    this.dataService.getPricesType().subscribe(tpPrices => 
      { this.pricesType = JSON.parse(tpPrices)},
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });
  }

  onChangeInput(){
    this.refreshPanel();
  }

  getSecurities(){
    this.dataService.getSecurities().subscribe(data =>
      {this.securities = JSON.parse(data)},
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal(valueSelected: any) {
    this.modalActions.emit({action:"modal",params:['open']});
    this.securitySelected = valueSelected;
    let securities = localStorage.getItem('securities');
    
    let secInfo = this.securities.reduce((a, security) => {
      if (security.attributes.ticker == this.securitySelected) {
        a.tickerBloomberg = security.attributes['ticker-bloomberg'];
        let nameB = a.tickerBloomberg.split(" ");
        let url = 'https://www.bloomberg.com/quote/'
        a.siteBloomberg = url.concat(nameB[0],':', nameB[1]);
      }
      return a;
    },{});
    this.securitySInfo = secInfo;
  }

  onChangeSelect(value){
    if( value == 0){
      this.showCustomTimeInput = true;
      this.refreshValueSelected = 10;
    } else{
      this.showCustomTimeInput = false;
      this.refreshValueSelected = value;
    }
    this.refreshPanel();
  }

  
  onClickPause(){
    clearInterval(this.timeR);
  }
  
  onClickRefresh(){  
    this.refreshPanel();  
  }

  onClickResume(){
    this.refreshPanel();
  }

  refreshPanel(){
    clearInterval(this.timeR);
    this.countdownTimer();
    this.getPanels();
    this.timeR = setInterval(()=>{
      this.countdownTimer();
      this.getPanels();
    }, this.refreshValueSelected * 1000);
     
  }

  countdownTimer(){
    this.countdown = this.refreshValueSelected;
    clearInterval(this.timecount);
    this.timecount = setInterval(()=>{
      this.countdown--; 
      if(this.countdown < -1){
        clearInterval(this.timecount);
      }  
    }, 1000); 
    
  }
  ngOnDestroy(){
    // this.subscriptionR.unsubscribe();
  }


  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }



  clickTeste(){
  }
}
