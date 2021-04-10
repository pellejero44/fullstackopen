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

Cypress.Commands.add('addUser', ({ username, name, password }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/users',
    body: { username, name, password },
  });
});

Cypress.Commands.add('addBlog', ({ title, author, url, likes }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    body: { title, author, url, likes },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
  });
  cy.visit('http://localhost:3000');
});

