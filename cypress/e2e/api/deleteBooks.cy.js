import { adminAuthHeader, baseURL, invalidAuthHeader, userAuthHeader } from "../../support/data";

describe('DELETE /api/books/{id} - Delete Book by ID', () => {
    let validBookId;

    // Create a book before tests to ensure a valid ID exists
    before(() => {
        const bookTitle = `Book Title ${Date.now()}`;
        const bookAuthor = `Author Name ${Date.now()}`;

        cy.request({
            method: 'POST',
            url: `${baseURL}/api/books`,
            headers: adminAuthHeader,
            body: {
                id:validBookId,
                title: bookTitle,
                author: bookAuthor
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            validBookId = response.body.id; // Store valid ID for testing
        });
    });

    // Valid Case
    it('Valid Case: Delete a book with a valid ID', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseURL}/api/books/${validBookId}`,
            headers: adminAuthHeader
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.eq('Successfully deleted the book.');
        });
    });

    // Invalid Case - Non-existent ID
    it('Invalid Case: Delete a book with a non-existent ID', () => {
        const nonExistentId = 9999;
        cy.request({
            method: 'DELETE',
            url: `${baseURL}/api/books/${nonExistentId}`,
            headers: adminAuthHeader,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.eq('Book is not found.');
        });
    });

    // Invalid Case - Invalid ID Format
    it('Invalid Case: Delete a book with an invalid ID format', () => {
        const invalidId = 'invalid';
        cy.request({
            method: 'DELETE',
            url: `${baseURL}/api/books/${invalidId}`,
            headers: adminAuthHeader,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq('Invalid Input Parameters.');
        });
    });

    // Authorization Case
    it('Authorization Case: Delete a book without authorization headers', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseURL}/api/books/${validBookId}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.eq('You are not authorized to delete the book.');
        });
    });

    // Forbidden Case - User without delete permissions
    it('Forbidden Case: Delete a book with insufficient permissions', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseURL}/api/books/${validBookId}`,
            headers: userAuthHeader, // Use user role with no delete permissions
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body).to.eq('Request API call is forbidden.');
        });
    });
});
