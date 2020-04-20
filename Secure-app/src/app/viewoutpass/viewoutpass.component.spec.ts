import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewoutpassComponent } from './viewoutpass.component';

describe('ViewoutpassComponent', () => {
  let component: ViewoutpassComponent;
  let fixture: ComponentFixture<ViewoutpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewoutpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewoutpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
