describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.get('[data-cy=search-input]').should('exist');
    cy.get('[data-cy=title]').should('exist');
    cy.get('[data-cy=recomendRestaurant]').should('exist');
    cy.get('[data-cy=name]').should('exist');
  });

  it('search foods', () => {
    cy.visit('/');
    cy.get('[data-cy=search-input]').type('sushi{enter}');
    cy.contains('Saito');
  });

  it('restaurant detail', () => {
    cy.visit('/');
    cy.get('[data-cy=search-input]').type('sushi{enter}');
    cy.wait(4000);
    cy.get('[data-cy=display-listitem]').click({ force: true });
    cy.wait(4000);
    cy.get('[data-cy=name]').contains('Sushi Saito (鮨 さいとう)');
    cy.get('[data-cy=restaurant-address]').should('exist');
    cy.get('[data-cy=restaurant-rating]').should('exist');
    cy.get('[data-cy=restaurant-working-time]').should('exist');
    cy.get('[data-cy=restaurant-tel]').should('exist');
    cy.get('[data-cy=restaurant-website]').should('exist');
  });
});
