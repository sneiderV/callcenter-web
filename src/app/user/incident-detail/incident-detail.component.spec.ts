import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentDetailComponent } from './incident-detail.component';
import { Incident } from '../incident';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('IncidentDetailComponent', () => {
  let component: IncidentDetailComponent;
  let fixture: ComponentFixture<IncidentDetailComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentDetailComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentDetailComponent);
    component = fixture.componentInstance;

    // Creamos un mock de Incident para usar en los tests
    const mockIncident: Incident = {
      id: 1,
      userId: 'user123',
      subject: 'Test Subject',
      description: 'Test Description',
      status: 'Open',
      originType: 'Email',
      solution: 'No solution',
      creationDate: new Date('2023-10-01'),
      updateDate: new Date('2023-10-02')
    };

    // Asignamos el incidente al componente
    component.incidetDetail = mockIncident;

    fixture.detectChanges(); // Detectar los cambios para que se actualice la vista
    debugElement = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the incident id in the header', () => {
    const headerElement: HTMLElement = debugElement.query(By.css('h2')).nativeElement;
    expect(headerElement.textContent).toContain('Detalle del incidente # 1');
  });

});
