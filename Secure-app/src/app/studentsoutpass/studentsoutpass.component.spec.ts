import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsoutpassComponent } from './studentsoutpass.component';

describe('StudentsoutpassComponent', () => {
  let component: StudentsoutpassComponent;
  let fixture: ComponentFixture<StudentsoutpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsoutpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsoutpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
