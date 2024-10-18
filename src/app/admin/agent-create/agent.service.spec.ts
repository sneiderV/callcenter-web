import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AgentService } from './agent.service';
import { Agent } from './agent';
import { environment } from '../../../environments/environment';

describe('AgentService', () => {
  let service: AgentService;
  let httpMock: HttpTestingController;

  const baseUrl = environment.backendUser; // URL del backend desde el environment
  const mockAgent: Agent = {
    username: 'JohnDoe',
    password: 'Password123',
    email: 'john.doe@example.com',
    dni: '12345678',
    fullName: 'John Doe',
    phoneNumber: '1234567890',
    role: 'agent'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Importa el módulo de testing HTTP
      providers: [AgentService]
    });

    service = TestBed.inject(AgentService); // Inyecta el servicio a testear
    httpMock = TestBed.inject(HttpTestingController); // Inyecta el controlador HTTP mock
  });

  afterEach(() => {
    // Verifica que no haya solicitudes HTTP pendientes al final de cada test
    httpMock.verify();
  });

  // Prueba 1: Verificar que el método `createAgent` hace una solicitud POST correctamente
  it('should create an agent and return the agent data', () => {
    const expectedResponse = { ...mockAgent }; // Respuesta esperada

    // Llamada al servicio
    service.createAgent(mockAgent).subscribe((res) => {
      // Verifica que la respuesta sea igual al mock
      expect(res).toEqual(expectedResponse);
    });

    // Verifica que se haya hecho una solicitud a la URL correcta
    const req = httpMock.expectOne(baseUrl); // Usa la URL correcta del `environment`
    expect(req.request.method).toBe('POST'); // Verifica que el método sea POST
    expect(req.request.body).toEqual(mockAgent); // Verifica el cuerpo de la solicitud

    // Simula una respuesta del servidor con el mock de agente
    req.flush(expectedResponse);
  });

  // Prueba 2: Verificar el manejo de errores en `createAgent`
  it('should handle error when the request fails', () => {
    const errorMessage = 'Error con el servicio: 400 Bad Request';

    // Llamada al servicio
    service.createAgent(mockAgent).subscribe({
      next: () => fail('should have failed with a 400 error'),
      error: (error) => {
        // Verifica que el mensaje de error contenga la respuesta esperada
        expect(error.message).toContain('Error con el servicio');
      }
    });

    // Verifica que se haya hecho una solicitud a la URL correcta
    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST'); // Verifica que el método sea POST

    // Simula una respuesta de error con código 400 desde el servidor
    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
  });

});
