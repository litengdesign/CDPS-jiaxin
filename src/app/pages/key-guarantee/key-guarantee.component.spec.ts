import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyGuaranteeComponent } from './key-guarantee.component';

describe('KeyGuaranteeComponent', () => {
  let component: KeyGuaranteeComponent;
  let fixture: ComponentFixture<KeyGuaranteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyGuaranteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyGuaranteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
