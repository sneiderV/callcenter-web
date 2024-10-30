import { faker } from '@faker-js/faker';

describe('Pruebas del módulo del administrador', () => {
  beforeEach(() => {
    // Visita la página de inicio de sesión y se autentica como administrador
    cy.visit('http://localhost:4200');
    const adminUser = { username: 'admin', password: 'admin' };
    cy.get('#username').type(adminUser.username);
    cy.get('#password').type(adminUser.password);
    cy.get('form').submit();
    cy.url().should('include', '/admin');
  });

  it('Crea un nuevo agente correctamente', () => {
    cy.wait(5000); // Esperar para que se elimine el mensaje de bienvenida
    cy.get('#create-agent').click();

    const newAgent = {
      username: `Cypress_${faker.internet.userName()}`,
      password: faker.internet.password(),
      email: faker.internet.email(),
      dni: faker.number.int({ min: 10000000, max: 99999999 }).toString(),
      fullName: `Cypress ${faker.name.fullName()}`,
      phoneNumber: faker.phone.number()
    };

    cy.get('#username').type(newAgent.username);
    cy.get('#password').type(newAgent.password);
    cy.get('#email').type(newAgent.email);
    cy.get('#dni').type(newAgent.dni);
    cy.get('#fullName').type(newAgent.fullName);
    cy.get('#phoneNumber').type(newAgent.phoneNumber);
    
    cy.get('#btn-create-agent').click();

    // Verifica que el agente se haya creado correctamente
    cy.contains('fue creado!').should('be.visible');
  });
});
