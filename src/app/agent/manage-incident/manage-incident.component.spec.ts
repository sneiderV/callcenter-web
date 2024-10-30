import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageIncidentComponent } from './manage-incident.component';
import { AgentService } from '../agent.service';
import { of } from 'rxjs';
import { Incident } from '../../user/incident';

describe('ManageIncidentComponent', () => {
  let component: ManageIncidentComponent;
  let fixture: ComponentFixture<ManageIncidentComponent>;
  let mockAgentService: jasmine.SpyObj<AgentService>;

  const mockIncidents: Incident[] = [
    new Incident(
      'user1', 'Incident 1', 'Description 1', 'open', 'email', 'Solution 1', new Date('2023-01-01'), new Date('2023-01-02')
    ),
    new Incident(
      'user2', 'Incident 2', 'Description 2', 'closed', 'phone', 'Solution 2', new Date('2023-01-03'), new Date('2023-01-04')
    )
  ];

  beforeEach(async () => {
    // Crear el mock del servicio con Jasmine
    mockAgentService = jasmine.createSpyObj('AgentService', ['getIncidents']);
    mockAgentService.getIncidents.and.returnValue(of(mockIncidents));

    await TestBed.configureTestingModule({
      declarations: [ManageIncidentComponent],
      providers: [
        { provide: AgentService, useValue: mockAgentService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load incidents on initialization', () => {
    component.ngOnInit();
    expect(component.incidentsList).toEqual(mockIncidents);
    expect(mockAgentService.getIncidents).toHaveBeenCalled();
  });

  it('should set selectedIncident and showDetail when onSelect is called', () => {
    const incident = mockIncidents[0];
    component.onSelect(incident);

    expect(component.selectedIncident).toEqual(incident);
    expect(component.showDetail).toBeTrue();
  });
});
