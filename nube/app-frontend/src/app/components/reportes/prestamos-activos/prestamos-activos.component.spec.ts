import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosActivosComponent } from './prestamos-activos.component';

describe('PrestamosActivosComponent', () => {
  let component: PrestamosActivosComponent;
  let fixture: ComponentFixture<PrestamosActivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestamosActivosComponent]
    });
    fixture = TestBed.createComponent(PrestamosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
