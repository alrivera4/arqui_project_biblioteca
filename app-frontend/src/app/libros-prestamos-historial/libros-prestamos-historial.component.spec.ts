import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosPrestamosHistorialComponent } from './libros-prestamos-historial.component';

describe('LibrosPrestamosHistorialComponent', () => {
  let component: LibrosPrestamosHistorialComponent;
  let fixture: ComponentFixture<LibrosPrestamosHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrosPrestamosHistorialComponent]
    });
    fixture = TestBed.createComponent(LibrosPrestamosHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
