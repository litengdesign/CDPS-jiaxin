import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataForecastComponent } from './data-forecast.component';

describe('DataForecastComponent', () => {
  let component: DataForecastComponent;
  let fixture: ComponentFixture<DataForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
