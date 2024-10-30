import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AgentService } from './agent.service';
import { Incident } from '../user/incident';
import { environment } from '../../environments/environment';

describe('AgentService', () => {
  let service: AgentService;
  let httpMock: HttpTestingController;

  const mockIncidents: Incident[] = [
    new Incident(
      'user1', 'Incident 1', 'Description 1', 'open', 'email', 'Solution 1', new Date('2023-01-01'), new Date('2023-01-02')
    ),
    new Incident(
      'user2', 'Incident 2', 'Description 2', 'closed', 'phone', 'Solution 2', new Date('2023-01-03'), new Date('2023-01-04')
    )
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AgentService]
    });
    service = TestBed.inject(AgentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes HTTP pendientes
  });

  it('should create the service', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio fue creado exitosamente
  });

  it('should perform GET request to retrieve incidents', () => {
    service.getIncidents().subscribe((incidents) => {
      expect(incidents).toEqual(mockIncidents); // Verifica que los datos recibidos son los esperados
    });

    // Simula la solicitud HTTP y responde con los datos simulados
    const req = httpMock.expectOne(environment.backendIncidents);
    expect(req.request.method).toBe('GET'); // Verifica que el método sea GET
    req.flush(mockIncidents); // Responde con el mock de incidentes
  });
});
