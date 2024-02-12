import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccauntComponent } from './accaunt.component';

describe('AccauntComponent', () => {
  let component: AccauntComponent;
  let fixture: ComponentFixture<AccauntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccauntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccauntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
