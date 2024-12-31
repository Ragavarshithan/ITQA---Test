import { uiAuth, uiBaseURL } from "../../support/data";

describe('Product Listing Page Testing', () => {
  beforeEach(() => {
    cy.visit(uiBaseURL);
    cy.login(uiAuth.username, uiAuth.password);
  });

  it('Verify Product Sorting (A to Z)', () => {
    cy.get('.product_sort_container').select('Name (A to Z)');
    cy.get('.inventory_item_name').then(($items) => {
      const names = [...$items].map(item => item.innerText);
      expect(names).to.deep.equal([...names].sort());
    });
  });

  it('Verify Product Sorting (Z to A)', () => {
    cy.get('.product_sort_container').select('Name (Z to A)');
    cy.get('.inventory_item_name').then(($items) => {
      const names = [...$items].map(item => item.innerText);
      expect(names).to.deep.equal([...names].sort().reverse());
    });
  });

  it('Verify Sorting by Price (Low to High)', () => {
    cy.get('.product_sort_container').select('Price (low to high)');
    cy.get('.inventory_item_price').then(($prices) => {
      const prices = [...$prices].map(price => parseFloat(price.innerText.replace('$', '')));
      expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
    });
  });

  it('Verify Sorting by Price (High to Low)', () => {
    cy.get('.product_sort_container').select('Price (high to low)');
    cy.get('.inventory_item_price').then(($prices) => {
      const prices = [...$prices].map(price => parseFloat(price.innerText.replace('$', '')));
      expect(prices).to.deep.equal([...prices].sort((a, b) => b - a));
    });
  });

  it('Validate Product Image Display', () => {
    cy.get('.inventory_item_img').should('be.visible');
    cy.get('.inventory_item_img').first().click();
    cy.url().should('include', '/inventory-item.html');
  });
});
