describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000');
    cy.addUser({
      username: 'apellejero',
      name: 'angel',
      password: 'abc123ABC',
    });
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
          cy.addBlog({
            title: 'REM2AsX',
            author: 's2d',
            url: 'htt2p:middleware.es',
            likes: 25,
          });
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

        it('and a the note can not be delete by other user', () => {
          cy.addUser({
            username: 'david',
            name: 'david2',
            password: 'abc123ABC',
          });

          cy.login({ username: 'david', password: 'abc123ABC' });
          cy.contains('REM2AsX').contains('view').click();
          cy.contains('Remove').should('not.exist');
        });

        describe('and we have another blog with more likes', function () {
          beforeEach(function () {
            cy.addBlog({
              title: 'note2',
              author: 'author2',
              url: 'htt2p:another.es',
              likes: 50,
            });
          });

          const getTitles = el => el.textContent.trim().split(' ')[0];

          it('the notes must be order by number or likes', () => {
            const expected = ['note2', 'REM2AsX'];
            cy.get('.blogContainer').then(elements => {
              const texts = [...elements].map(getTitles);
              expect(texts).to.deep.eq(expected);
            });
          });
        });
      });
    });
  });
});
