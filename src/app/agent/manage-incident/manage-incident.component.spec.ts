/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ManageIncidentComponent } from './manage-incident.component';
import { UserService } from '../../user/user.service';
import { Incident } from '../../user/incident';

class MockUserService {
  getIncidents(): Incident[] {
    return [
      { id: 1, userId: 'user1', subject: 'Incident 1', description: 'Description 1', status: 'Open', originType: 'Email', solution: 'N/A', creationDate: new Date(), updateDate: new Date() },
      { id: 2, userId: 'user2', subject: 'Incident 2', description: 'Description 2', status: 'Closed', originType: 'Phone', solution: 'N/A', creationDate: new Date(), updateDate: new Date() }
    ];
  }
}

describe('ManageIncidentComponent', () => {
  let component: ManageIncidentComponent;
  let fixture: ComponentFixture<ManageIncidentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageIncidentComponent ],
      providers: [
        { provide: UserService, useClass: MockUserService } // Proporcionar el mock del UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize incidentsList with incidents from UserService', () => {
    expect(component.incidentsList.length).toBe(2); // Verificar que hay 2 incidentes
  });

  it('should select an incident and show details', () => {
    component.onSelect(component.incidentsList[0]); // Seleccionar el primer incidente
    expect(component.selectedIncident).toEqual(component.incidentsList[0]);
    expect(component.showDetail).toBeTrue();
  });
});
