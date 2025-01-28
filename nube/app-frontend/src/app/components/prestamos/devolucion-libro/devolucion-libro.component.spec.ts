import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionLibroComponent } from './devolucion-libro.component';

describe('DevolucionLibroComponent', () => {
  let component: DevolucionLibroComponent;
  let fixture: ComponentFixture<DevolucionLibroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevolucionLibroComponent]
    });
    fixture = TestBed.createComponent(DevolucionLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
