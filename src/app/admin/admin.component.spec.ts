import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// Mocking Router
class RouterMock {
  navigate = jasmine.createSpy('navigate');
}

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: RouterMock;

  beforeEach(async () => {
    // Creación de un spy para AuthService
    authServiceMock = jasmine.createSpyObj('AuthService', ['isActive']);
    
    // Configuración del TestBed
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useClass: RouterMock } // Mockeamos el router también
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    routerMock = TestBed.inject(Router) as unknown as RouterMock;
    fixture.detectChanges(); // Dispara la detección de cambios
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.isActive on ngOnInit', () => {
    // Verifica que el método isActive fue llamado
    expect(authServiceMock.isActive).toHaveBeenCalled();
  });

  it('should show plan component when showPlanComponent is called', () => {
    component.showPlanComponent();
    expect(component.showPlan).toBeTrue();
    expect(component.showCreateAgent).toBeFalse();
    expect(component.showBack).toBeTrue();
    expect(component.showMenu).toBeFalse();
  });

  it('should show create agent component when showCreateAgentComponent is called', () => {
    component.showCreateAgentComponent();
    expect(component.showPlan).toBeFalse();
    expect(component.showCreateAgent).toBeTrue();
    expect(component.showBack).toBeTrue();
    expect(component.showMenu).toBeFalse();
  });

  it('should reset to show menu when showBackOption is called', () => {
    component.showBackOption();
    expect(component.showPlan).toBeFalse();
    expect(component.showCreateAgent).toBeFalse();
    expect(component.showBack).toBeFalse();
    expect(component.showMenu).toBeTrue();
  });
});
