import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

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
  dataTeste: any[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.busca();
  }

  busca(){
    this.dataService.getAll().subscribe(data => {
      this.dataTeste = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }


}
