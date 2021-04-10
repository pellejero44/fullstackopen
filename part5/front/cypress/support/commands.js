Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/login',
    body: { username, password },
  }).then((response) => {    
    window.localStorage.setItem('loggedUser', JSON.stringify(response.body));
    cy.visit('http://localhost:3000');
  });
});
