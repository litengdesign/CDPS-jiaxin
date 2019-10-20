import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoastalComponent } from './coastal.component';

describe('CoastalComponent', () => {
  let component: CoastalComponent;
  let fixture: ComponentFixture<CoastalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoastalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoastalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
