import { getTestBed } from '@angular/core/testing';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http';

import {MaterializeAction} from 'angular2-materialize';
import { Panel } from './panel';

import 'rxjs/add/operator/retry';

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

  dataPanel1Hr: any;

// 
// Configuracoes - que ficarao parametrizaveis
// 
// 

  private nRanking: string = '10';
  panels: Panel[] = 
  [
    {nameP: '1', panelPriceType: '1_HOUR_PRICE_CHANGE_RT',
     nValuesRankingH: '10', resultTableH: '',
     nValuesRankingL: '10', resultTableL: ''},
    {nameP: '2', panelPriceType: '15_MINUTE_PRICE_CHANGE_RT', 
     nValuesRankingH: '10', resultTableH: '',
     nValuesRankingL: '10', resultTableL: ''},
    {nameP: '3', panelPriceType: 'CHG_PCT_2D', 
     nValuesRankingH: '10', resultTableH: '',
     nValuesRankingL: '10', resultTableL: ''},
    {nameP: '4', panelPriceType: 'ALL_TIME_HIGH_PERCENT', 
     nValuesRankingH: '10', resultTableH: '',
     nValuesRankingL: '10', resultTableL: ''},
    {nameP: '5', panelPriceType: 'CHG_PCT_1D', 
     nValuesRankingH: '10', resultTableH: '',
     nValuesRankingL: '10', resultTableL: ''},
    {nameP: '6', panelPriceType: 'CHG_PCT_3D', 
     nValuesRankingH: '10', resultTableH: '',
     nValuesRankingL: '10', resultTableL: ''},
    {nameP: '7', panelPriceType: 'CHG_PCT_1M', 
     nValuesRankingH: '10', resultTableH: '',
     nValuesRankingL: '10', resultTableL: ''},
    {nameP: '8', panelPriceType: 'CHG_PCT_YTD', 
     nValuesRankingH: '10', resultTableH: '',
     nValuesRankingL: '10', resultTableL: ''},
    {nameP: '9', panelPriceType: 'CHG_PCT_5D', 
     nValuesRankingH: '10', resultTableH: '',
     nValuesRankingL: '10', resultTableL:''}
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    
    this.getPricesTypes();
    this.getSecurities();
    for(let i=0; i<this.panels.length; i++ ){

      (function (parent, idx) {
        parent.dataService.getTopRankingFullH(
          parent.panels[idx].panelPriceType, 
          parent.panels[idx].nValuesRankingH).subscribe(rkdataH => {
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
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }




  clickTeste(){
  //  let teste = this.getTopRankingPrices('1', this.panels[0].nValuesRanking);
    // console.log(this.panels);
    // console.log(this.panels);
  //   let tempDataPanel = this.dataRanking;

  //   // treat table
  //   for(let i=0; i<10; i++){
  //     let id_search = tempDataPanel[i]["attributes"]["security-id"];
  //     let ticker = this.securities.reduce((a, security) => {
  //       if (security.id == id_search) {
  //         a.ticker = security.attributes.ticker;

  //       }
  //       return a;
  //     },{});
  //     console.log(ticker);

      
  //     // console.log(tempDataPanel[i]["attributes"]["price-value"]);
  //   }
  }
}
