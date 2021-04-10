describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000');
    const user = {
      username: 'apellejero',
      name: 'angel',
      password: 'abc123ABC',
    };

    cy.request('POST', 'http://localhost:3001/api/users', user);
  });

  it('Login form is shown', function () {
    cy.contains('log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[placeholder="username"]').type('apellejero');
      cy.get('[placeholder="password"]').type('abc123ABC');
      cy.get('#form-login-button').click();
      cy.contains('logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('[placeholder="username"]').type('david');
      cy.get('[placeholder="password"]').type('123456');
      cy.get('#form-login-button').click();
      cy.contains('logged in').should('not.exist');
    });

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'apellejero', password: 'abc123ABC' });
      });

      it('A blog can be created', function () {
        cy.contains('new blog').click();
        cy.get('#title').type('some title apellejero');
        cy.get('#author').type('apellejero');
        cy.get('#url').type('www.apellejero.es');
        cy.get('#form-blog-button').click();
        cy.contains('some title apellejero');
      });

      describe('and a blog exists', function () {
        beforeEach(function () {
          cy.request({
            method: 'POST',
            url: 'http://localhost:3001/api/blogs',
            body: {
              title: 'REM2AsX',
              author: 's2d',
              url: 'htt2p:middleware.es',
              likes: 25,
            },
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('loggedUser')).token
              }`,
            },
          });
          cy.visit('http://localhost:3000');
        });

        it('it can give like to the blog', () => {
          cy.contains('REM2AsX').contains('view').click();

          cy.contains('like').click();
          cy.contains('26');
        });

        it('and a the note can be delete by his owner', () => {
          cy.contains('REM2AsX').contains('view').click();
          cy.contains('Remove').click();
          cy.contains('REM2AsX').should('not.exist');
        });
      });
    });
  });
});
