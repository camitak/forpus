import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFundComponent } from './panel-fund.component';

describe('PanelFundComponent', () => {
  let component: PanelFundComponent;
  let fixture: ComponentFixture<PanelFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
