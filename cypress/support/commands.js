import { adminAuthHeader, baseURL } from "./data";


// Command for UI Test Login
Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-test=username]').type(username);
    cy.get('[data-test=password]').type(password);
    cy.get('#login-button').click();
});


// Command for creating a new book by using API
Cypress.Commands.add('createBook', (bookData) => {
    cy.request({
        method: 'POST',
        url: `${baseURL}/api/books`,
        headers: adminAuthHeader,
        body: { title: bookData.title, author: bookData.author },
    }).then((response) => {
        expect(response.status).to.eq(201);
        const bookId = response.body.id;
        return bookId;
    });
});