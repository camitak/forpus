import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import {  Http, RequestOptions, Headers, Response } from '@angular/http';
import { error } from 'selenium-webdriver';

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
