import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-result',
  templateUrl: './panel-result.component.html',
  styleUrls: ['./panel-result.component.scss']
})
export class PanelResultComponent implements OnInit {


  headersResult: string[] = [
  'TICKER',
  'DATA',
  'BEF/AFT',
  'TIPO',
  'PERÍODO',
  'REVENUE',
  'EBITDA',
  'NET INC',
  'PE EST',
  'NET DEBT TO EBITDA',
  'PX_TO_BOOK_RATIO',
  'PE RATIO',
  ];

  
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
  
  }

}
