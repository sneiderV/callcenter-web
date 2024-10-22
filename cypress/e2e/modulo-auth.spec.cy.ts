describe('Pruebas del módulo de autenticación', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('#username').clear();
    cy.get('#password').clear();
  });

  const users: { [key in 'admin' | 'agent' | 'user']: { username: string; password: string; redirect: string } } = {
    admin: { username: 'admin', password: 'admin', redirect: '/admin' },
    agent: { username: 'agent', password: 'agent', redirect: '/agent' },
    user: { username: 'user', password: 'user', redirect: '/user' },
  };

  for (const role in users) {
    it(`Inicia sesión correctamente como un ${role} y hace logout.`, () => {
      const { username, password, redirect } = users[role as 'admin' | 'agent' | 'user'];

      cy.get('#username').type(username);
      cy.get('#password').type(password);
      cy.get('form').submit();
      cy.wait(5000); // Esperar para que se elimine el mensaje de bienvenida
      
      cy.url().should('include', redirect);
      
      
      // Validar que se redirige a la página de inicio de sesión
      cy.get('#btn-logout').click();
      cy.url().should('eq', 'http://localhost:4200/');
    });
  }

  it('Muestra un mensaje para un usuario no registrado', () => {
    const invalidUser = {
      username: 'usuarioInvalido',
      password: 'contraseñaIncorrecta'
    };

    cy.get('#username').type(invalidUser.username);
    cy.get('#password').type(invalidUser.password);
    cy.get('form').submit();

    cy.contains('Verifique sus datos').should('be.visible');
  });
});
