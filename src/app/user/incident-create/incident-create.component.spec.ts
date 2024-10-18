import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { IncidentCreateComponent } from './incident-create.component';
import { AuthService } from '../../login/auth.service';
import { UserService } from '../user.service';
import { of } from 'rxjs';
import { Incident } from '../incident';

describe('IncidentCreateComponent', () => {
  let component: IncidentCreateComponent;
  let fixture: ComponentFixture<IncidentCreateComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(waitForAsync(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getLoggedUser']);
    mockUserService = jasmine.createSpyObj('UserService', ['createIncident']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      declarations: [ IncidentCreateComponent ],
      imports: [ 
        ToastrModule.forRoot(),
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form correctly', () => {
    expect(component.incidentForm).toBeDefined();
    expect(component.incidentForm.controls['subject']).toBeDefined();
    expect(component.incidentForm.controls['description']).toBeDefined();
    expect(component.incidentForm.valid).toBeFalse();
  });

  it('should create an incident and show success message', () => {
    const incident = { subject: 'Test Subject', description: 'Test Description' } as Incident;
  
    // Configuramos el mock para que retorne un observable que emita un Incident válido
    mockAuthService.getLoggedUser.and.returnValue({ id: 1 });
    mockUserService.createIncident.and.returnValue(of(incident));
  
    component.createIncident(incident);
  
    expect(mockUserService.createIncident).toHaveBeenCalledWith(jasmine.objectContaining({
      ...incident,
      originType: 'web',
      userId: 1
    }));
    expect(mockToastrService.success).toHaveBeenCalledWith('La incidencia fue creada', 'Confirmacion');
    expect(component.incidentForm.value).toEqual({ subject: null, description: null });
  });
  

  it('should cancel creation and reset the form', () => {
    component.incidentForm.setValue({ subject: 'Test', description: 'Test Description' });
    component.cancelCreation();

    expect(component.incidentForm.value).toEqual({ subject: null, description: null });
  });
});
