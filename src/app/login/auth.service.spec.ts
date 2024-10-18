import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AuthService } from "./auth.service";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  const baseUrl = environment.backendUser;

  const mockLoginData = {
    username: 'testUser',
    password: 'password123'
  };

  const mockAuthResponse = {
    token: 'mockToken'
  };

  const mockMeInfo = {
    id: 1,
    username: 'testUser',
    email: 'test@example.com'
  };

  // Mock de localStorage
  beforeEach(() => {
    let store: { [key: string]: string } = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return store[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      store[key] = value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete store[key];
    });
    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy } // Mockeamos el router
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden solicitudes pendientes
    localStorage.clear(); // Limpia el localStorage después de cada test
  });

  // Prueba: Verifica que logout elimine la autenticación y redirija a la página de inicio
  it('should logout, remove tokens and navigate to the home page', () => {
    // Configura el estado de autenticación
    localStorage.setItem('token', 'mockToken');
    localStorage.setItem('meInfo', JSON.stringify(mockMeInfo));
    service.isAuthenticated = true;

    // Llama al método de logout
    service.logout();

    expect(service.isAuthenticated).toBeFalse(); // Verifica que ya no esté autenticado
    expect(localStorage.getItem('token')).toBeNull(); // Verifica que el token sea eliminado
    expect(localStorage.getItem('meInfo')).toBeNull(); // Verifica que la información del usuario sea eliminada
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']); // Verifica que se redirige a la página de inicio
  });

  // Prueba: Verifica que isActive redirige si no está autenticado
  it('should navigate to home if not authenticated', () => {
    service.isAuthenticated = false;
    service.isActive();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['']); // Verifica que se redirige si no está autenticado
  });

  // Prueba: Verifica que getLoggedUser retorne la información del usuario almacenada en localStorage
  it('should return the logged user info from localStorage', () => {
    localStorage.setItem('meInfo', JSON.stringify(mockMeInfo));

    const loggedUser = service.getLoggedUser();
    expect(loggedUser).toEqual(mockMeInfo); // Verifica que retorne la información correcta
  });
});
