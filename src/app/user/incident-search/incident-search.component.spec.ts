import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { IncidentSearchComponent } from './incident-search.component';
import { UserService } from '../user.service';
import { AuthService } from '../../login/auth.service';
import { Incident } from '../incident';

describe('IncidentSearchComponent', () => {
  let component: IncidentSearchComponent;
  let fixture: ComponentFixture<IncidentSearchComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(waitForAsync(() => {
    // Crear objetos simulados
    mockUserService = jasmine.createSpyObj('UserService', ['getIncidentByUser']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getLoggedUser']);

    TestBed.configureTestingModule({
      declarations: [IncidentSearchComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentSearchComponent);
    component = fixture.componentInstance;

    // Mock de usuario logueado
    mockAuthService.getLoggedUser.and.returnValue({ id: 1 });

    // Mock de incidentes devueltos por el servicio
    const mockIncidents: Incident[] = [
      {
        id: 1, subject: 'Incident 1', description: 'Description 1', userId: '1', originType: 'web',
        status: '',
        solution: '',
        creationDate: new Date(),
        updateDate: new Date()
      },
      {
        id: 2, subject: 'Incident 2', description: 'Description 2', userId: '1', originType: 'web',
        status: '',
        solution: '',
        creationDate: new Date(),
        updateDate: new Date()
      }
    ];
    mockUserService.getIncidentByUser.and.returnValue(of(mockIncidents));

    fixture.detectChanges();  // Llama a ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize incidentsList with data from the service', () => {
    // Verificar que los incidentes se asignaron correctamente desde el servicio
    expect(component.incidentsList.length).toBe(2);
    expect(component.incidentsList[0].subject).toBe('Incident 1');
  });

  it('should set selectedIncident and showDetail to true when onSelect is called', () => {
    const incident: Incident = {
      id: 1, subject: 'Incident 1', description: 'Description 1', userId: '1', originType: 'web',
      status: '',
      solution: '',
      creationDate: new Date(),
      updateDate: new Date()
    };

    component.onSelect(incident);

    // Verificar que el incidente fue seleccionado y showDetail es true
    expect(component.selectedIncident).toBe(incident);
    expect(component.showDetail).toBeTrue();
  });
});
