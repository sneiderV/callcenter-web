import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './login/auth.service';
import { RouterTestingModule } from '@angular/router/testing';  // Importamos RouterTestingModule
import { of } from 'rxjs';

class AuthServiceMock {
  logout = jasmine.createSpy('logout');
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceMock: AuthServiceMock;

  beforeEach(async () => {
    // Configuración del TestBed
    authServiceMock = new AuthServiceMock();

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],  // Añadimos RouterTestingModule para que funcione router-outlet
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Dispara la detección de cambios
  });

  // 1. **Verificar la creación del componente**
  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  // 2. **Verificar que el método logout invoque el método logout del AuthService**
  it('should call AuthService.logout when logout() is called', () => {
    // Llamamos al método logout del componente
    component.logout();

    // Verificamos que el método logout del AuthService fue llamado
    expect(authServiceMock.logout).toHaveBeenCalled();
  });
});
