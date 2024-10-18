/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentCreateComponent } from './agent-create.component';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AgentService } from './agent.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

// Mock de AgentService
class AgentServiceMock {
  createAgent = jasmine.createSpy('createAgent').and.returnValue(of({}));
}

// Mock de ToastrService
class ToastrServiceMock {
  success = jasmine.createSpy('success');
}

describe('AgentCreateComponent', () => {
  let component: AgentCreateComponent;
  let fixture: ComponentFixture<AgentCreateComponent>;
  let agentServiceMock: AgentServiceMock;
  let toastrServiceMock: ToastrServiceMock;

  beforeEach(async () => {
    // Configuración del TestBed con mocks
    agentServiceMock = new AgentServiceMock();
    toastrServiceMock = new ToastrServiceMock();

    await TestBed.configureTestingModule({
      declarations: [AgentCreateComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AgentService, useValue: agentServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Dispara la detección de cambios
  });

  // 1. **Verificar si el componente se crea correctamente**
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // 2. **Verificar la inicialización del formulario**
  it('should create the form with controls', () => {
    expect(component.agentForm).toBeTruthy();
    expect(component.agentForm.contains('username')).toBeTrue();
    expect(component.agentForm.contains('password')).toBeTrue();
    expect(component.agentForm.contains('email')).toBeTrue();
    expect(component.agentForm.contains('dni')).toBeTrue();
    expect(component.agentForm.contains('fullName')).toBeTrue();
    expect(component.agentForm.contains('phoneNumber')).toBeTrue();
  });

  // 3. **Verificar validaciones en los campos del formulario**
  it('should require username, password, email, dni, fullName, and phoneNumber', () => {
    const form = component.agentForm;
    
    let username = form.controls['username'];
    let password = form.controls['password'];
    let email = form.controls['email'];
    let dni = form.controls['dni'];
    let fullName = form.controls['fullName'];
    let phoneNumber = form.controls['phoneNumber'];

    // Test de que los campos son inválidos cuando están vacíos
    expect(username.valid).toBeFalse();
    expect(password.valid).toBeFalse();
    expect(email.valid).toBeFalse();
    expect(dni.valid).toBeFalse();
    expect(fullName.valid).toBeFalse();
    expect(phoneNumber.valid).toBeFalse();

    // Test de que los campos son válidos cuando tienen valores correctos
    username.setValue('JohnDoe');
    password.setValue('Password123');
    email.setValue('john.doe@example.com');
    dni.setValue('12345678');
    fullName.setValue('John Doe');
    phoneNumber.setValue('1234567890');

    expect(username.valid).toBeTrue();
    expect(password.valid).toBeTrue();
    expect(email.valid).toBeTrue();
    expect(dni.valid).toBeTrue();
    expect(fullName.valid).toBeTrue();
    expect(phoneNumber.valid).toBeTrue();
  });

  // 4. **Verificar el comportamiento del método `createAgent`**
  it('should call createAgent method and show success toastr', () => {
    const agent = {
      username: 'JohnDoe',
      password: 'Password123',
      email: 'john.doe@example.com',
      dni: '12345678',
      fullName: 'John Doe',
      phoneNumber: '1234567890',
      role: 'agent'
    };
    
    component.createAgent(agent);
    
    // Verificar que el servicio createAgent haya sido llamado con el agente correcto
    expect(agentServiceMock.createAgent).toHaveBeenCalledWith(agent);
    
    // Verificar que el toastrService.show haya sido llamado
    expect(toastrServiceMock.success).toHaveBeenCalledWith(`El agente ${agent.username} fue creado!`, 'Confirmacion');
  });

  // 5. **Verificar el comportamiento del método `cancelCreation`**
  it('should reset the form when cancelCreation is called', () => {
    // Rellenamos el formulario con algunos valores
    component.agentForm.controls['username'].setValue('JohnDoe');
    component.agentForm.controls['email'].setValue('john.doe@example.com');
    
    // Verificamos que los valores no estén vacíos
    expect(component.agentForm.controls['username'].value).toBe('JohnDoe');
    expect(component.agentForm.controls['email'].value).toBe('john.doe@example.com');
    
    // Llamamos al método de cancelación
    component.cancelCreation();
    
    // Verificamos que el formulario se haya reseteado
    expect(component.agentForm.controls['username'].value).toBeNull();
    expect(component.agentForm.controls['email'].value).toBeNull();
  });
});

