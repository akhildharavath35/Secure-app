import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinihomeComponent } from './minihome.component';

describe('MinihomeComponent', () => {
  let component: MinihomeComponent;
  let fixture: ComponentFixture<MinihomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinihomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinihomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
