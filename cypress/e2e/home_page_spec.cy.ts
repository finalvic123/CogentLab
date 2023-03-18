describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.get('[data-cy=search-input]').should('exist');
    cy.get('[data-cy=title]').should('exist');
    cy.get('[data-cy=recomendRestaurant]').should('exist');
    cy.get('[data-cy=googleMap]').should('exist');
    cy.get('[data-cy=name]').should('exist');
  });

  it('search foods', () => {
    cy.visit('/');
    cy.get('[data-cy=search-input]').type('sushi{enter}');
    cy.contains('Saito');
  });
});
