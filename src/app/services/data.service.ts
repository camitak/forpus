import { Panel } from './../home/panel/panel';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import {  Http, RequestOptions, Headers, Response } from '@angular/http';
import { error } from 'selenium-webdriver';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';

import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: Http) { }
  private urlAPI: string = 'https://forpus.herokuapp.com';
 
  getPricesType(){
    let pricesTypes = this.getForpusAPIData(this.urlAPI + '/api/v1/price_types', true, 'pricesTypes');
    return pricesTypes;
  }

  getSecurities(){
    let securities = this.getForpusAPIData(this.urlAPI + '/api/v1/securities', true, 'securities');
    return securities;
  }

  getFrequencies(){
    let frequencies = this.getForpusAPIData(this.urlAPI + '/api/v1/frequencies', true, 'frequencies');
    return frequencies;
  }

  getTimeWeight(){
    let timeWeight = this.getForpusAPIData(this.urlAPI + '/api/v1/time_weight', true, 'timeWeight');
    return timeWeight;
  }

  getTopRankingPrices(priceTypeId: string, nValues: string){
    let rankingUrl = this.urlAPI + '/api/v1/top_n_ranking?price_type_id=' + priceTypeId + '&n=' + nValues;
    let topRankingPrices = this.getForpusAPIData(rankingUrl, false, '');
    return topRankingPrices;
  }


  getTopRankingFullH(priceType: string, nValues: string){
    let rankingUrl = this.urlAPI + '/api/v1/top_n_ranking_high?price_type_name=' + priceType + '&n=' + nValues;
    let topRankingPrices = this.getForpusAPIData(rankingUrl, false, '');
    return topRankingPrices;
  }

  getTopRankingFullL(priceType: string, nValues: string){
    let rankingUrl = this.urlAPI + '/api/v1/top_n_ranking_low?price_type_name=' + priceType + '&n=' + nValues;
    let topRankingFullL = this.getForpusAPIData(rankingUrl, false, '');
    return topRankingFullL;
  }

  getPanels(){
    let panels: Panel[] = 
    [
      {id: '1', nameP: '% 1 Hora', panelPriceType: '1_HOUR_PRICE_CHANGE_RT',
       nValuesRankingH: '10', resultTableH: '',
       nValuesRankingL: '10', resultTableL: ''},
      {id: '2', nameP: '% ALL TIME HIGH', panelPriceType: 'ALL_TIME_HIGH_PERCENT', 
       nValuesRankingH: '10', resultTableH: '',
       nValuesRankingL: '10', resultTableL: ''},
      {id: '3', nameP: '% 1 MONTH', panelPriceType: 'CHG_PCT_1M', 
       nValuesRankingH: '10', resultTableH: '',
       nValuesRankingL: '10', resultTableL: ''},
      {id: '4', nameP: '% 15 MINUTOS', panelPriceType: '15_MINUTE_PRICE_CHANGE_RT', 
       nValuesRankingH: '10', resultTableH: '',
       nValuesRankingL: '10', resultTableL: ''},
      {id: '5', nameP: '% 1D', panelPriceType: 'CHG_PCT_1D', 
       nValuesRankingH: '10', resultTableH: '',
       nValuesRankingL: '10', resultTableL: ''},
      {id: '6', nameP: '% YTD', panelPriceType: 'CHG_PCT_YTD', 
       nValuesRankingH: '10', resultTableH: '',
       nValuesRankingL: '10', resultTableL: ''},
      {id: '7', nameP: '% 2D', panelPriceType: 'CHG_PCT_2D', 
       nValuesRankingH: '10', resultTableH: '',
       nValuesRankingL: '10', resultTableL: ''},
      {id: '8', nameP: '% 3D', panelPriceType: 'CHG_PCT_3D', 
       nValuesRankingH: '10', resultTableH: '',
       nValuesRankingL: '10', resultTableL: ''},
      {id: '9', nameP: '% 5D', panelPriceType: 'CHG_PCT_5D', 
       nValuesRankingH: '10', resultTableH: '',
       nValuesRankingL: '10', resultTableL:''}
    ];
    return panels;
  }

  ensureAuth(){
    let isAuthenticated = this.getForpusAPIData(this.urlAPI + '/api/v1/securities', false, '');
    return isAuthenticated;
  }

  private getForpusAPIData(urlGet: string, saveLocal: boolean, labelLocal: string){
    return this.http.get(urlGet, this.jwt()).map((response: Response) => {
      if(response.status === 401){
        console.log('Meu erro')
      }else{
        let getData = response.json();
        if(getData){
          if(saveLocal){
            localStorage.setItem(labelLocal,JSON.stringify(getData.data || getData));
          }
          return JSON.stringify(getData.data || getData);
        }
      }
    });
  }

  // private helper method 
  private jwt(){
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser && currentUser.auth_token){
      let headers = new Headers({'Content-type':'application/json', 'Authorization': currentUser.auth_token});
      return new RequestOptions({headers: headers});
    }
  }
  
}
