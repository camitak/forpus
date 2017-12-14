import { Panel } from './../home/panel/panel';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import {  Http, RequestOptions, Headers, Response } from '@angular/http';
import { error } from 'selenium-webdriver';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: Http) { }
  
  getPricesType(){
    let pricesTypes = this.getForpusAPIData('/api/v1/price_types', true, 'pricesTypes');
    return pricesTypes;
  }

  getSecurities(){
    let securities = this.getForpusAPIData('/api/v1/securities', true, 'securities');
    return securities;
  }

  getFrequencies(){
    let frequencies = this.getForpusAPIData('/api/v1/frequencies', true, 'frequencies');
    return frequencies;
  }

  getTimeWeight(){
    let timeWeight = this.getForpusAPIData('/api/v1/time_weight', true, 'timeWeight');
    return timeWeight;
  }

  getTopRankingPrices(priceTypeId: string, nValues: string){
    let rankingUrl = '/api/v1/top_n_ranking?price_type_id=' + priceTypeId + '&n=' + nValues;
    let topRankingPrices = this.getForpusAPIData(rankingUrl, false, '');
    return topRankingPrices;
  }


  getTopRankingFullH(priceTypeId: string, nValues: string){
    let rankingUrl = '/api/v1/top_n_ranking_full?price_type_name=' + priceTypeId + '&n=' + nValues;
    let topRankingPrices = this.getForpusAPIData(rankingUrl, false, '');
    return topRankingPrices;
  }

  getTopRankingFullL(priceType: string, nValues: string){
    let rankingUrl = '/api/v1/top_n_ranking_full?price_type_name=' + priceType + '&n=' + nValues;
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
    let isAuthenticated = this.getForpusAPIData('/api/v1/securities', false, '');
    console.log(isAuthenticated);
    if(isAuthenticated){
      return true;
    }
    return false;
  }

  private getForpusAPIData(urlGet: string, saveLocal: boolean, labelLocal: string){
    return this.http.get(urlGet, this.jwt()).retry(5).map((response: Response) => {
      let getData = response.json();
      if(getData){
        if(saveLocal){
          localStorage.setItem(labelLocal,JSON.stringify(getData.data || getData));
        }
        return JSON.stringify(getData.data || getData);
      }
    },
    err => {
      console.log('meu erro ' + err);
      return err;
    }).catch(e => {
      if(e.status === 401){
        return Observable.throw('Unauthorized');
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
