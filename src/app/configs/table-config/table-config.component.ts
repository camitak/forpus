import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Panel } from '../../home/panel/panel';

@Component({
  selector: 'app-table-config',
  templateUrl: './table-config.component.html',
  styleUrls: ['./table-config.component.scss']
})
export class TableConfigComponent implements OnInit {

  panels: Panel[];

  constructor(
    private dataService: DataService) { }

  ngOnInit() {
    this.panels = this.dataService.getPanels();
  }

}
