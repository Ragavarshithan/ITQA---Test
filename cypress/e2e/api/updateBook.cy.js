import { adminAuthHeader, baseURL, userAuthHeader} from "../../support/data";

describe('PUT /api/books/{id} - Update Book by ID', () => {
    let validBookId ;
    let bookTitle;
    let bookAuthor;

    // Create a book before tests to ensure a valid ID exists
    before(() => {
        bookTitle = `Book Title ${Date.now()}`;
        bookAuthor = `Author Name ${Date.now()}`;

        cy.request({
            method: 'POST',
            url: `${baseURL}/api/books`,
            headers: adminAuthHeader,
            body: {
                title: bookTitle,
                author: bookAuthor
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            validBookId = response.body.id; // Store valid ID for testing
        });
    });

    // Valid Case
    it('Valid Case: Update a book with valid parameters', () => {
        const updatedTitle = `Updated Title ${Date.now()}`;
        const updatedAuthor = `Updated Author ${Date.now()}`;

        cy.request({
            method: 'PUT',
            url: `${baseURL}/api/books/${validBookId}`,
            headers: adminAuthHeader,
            body: {
                id: validBookId,
                title: updatedTitle,
                author: updatedAuthor
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', validBookId);
            expect(response.body).to.have.property('title', updatedTitle);
            expect(response.body).to.have.property('author', updatedAuthor);
        });
    });

    // Invalid Case - Non-existent ID
    it('Invalid Case: Update with a non-existent ID', () => {
        const nonExistentId = 9999;

        cy.request({
            method: 'PUT',
            url: `${baseURL}/api/books/${nonExistentId}`,
            headers: adminAuthHeader,
            body: {
                id: nonExistentId,
                title: 'Updated Title',
                author: 'Updated Author'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.eq('Book not found');
        });
    });

    // Invalid Case - Empty Body
    it('Invalid Case: Update with an empty request body', () => {
        cy.request({
            method: 'PUT',
            url: `${baseURL}/api/books/${validBookId}`,
            headers: adminAuthHeader,
            body: {},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq('Empty Input Parameters.');
        });
    });

    // Invalid Case - Invalid ID Format
    it('Invalid Case: Update with an invalid ID format', () => {
        const invalidId = 'invalid';

        cy.request({
            method: 'PUT',
            url: `${baseURL}/api/books/${invalidId}`,
            headers: adminAuthHeader,
            body: {
                title: 'Updated Title',
                author: 'Updated Author'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq('Invalid Input Parameters.');
        });
    });

    // Authorization Case
    it('Authorization Case: Update without authorization headers', () => {
        cy.request({
            method: 'PUT',
            url: `${baseURL}/api/books/${1}`,
            body: {
                id:1,
                title: 'Unauthorized Update',
                author: 'No Auth'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.eq('You are not authorized to update the book.');
        });
    });

    // Forbidden Case
    it('Forbidden Case: Update with insufficient permissions', () => {
        cy.request({
            method: 'PUT',
            url: `${baseURL}/api/books/${validBookId}`,
            headers: userAuthHeader,
            body: {
                id:validBookId,
                title: 'Forbidden Update',
                author: 'No Permissions'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body).to.eq('User is not permitted.');
        });
    });
});
