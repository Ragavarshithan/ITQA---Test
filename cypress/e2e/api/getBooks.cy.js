import { adminAuthHeader, baseURL } from "../../support/data";

describe('GET /api/books - Get All Books', () => {
    it('Valid Case: Get All Books', () => {
        cy.request({
            method: 'GET',
            url: `${baseURL}/api/books`,
            headers: adminAuthHeader,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            if (response.body.length > 0) {
                response.body.forEach((book) => {
                    expect(book).to.have.property('id');
                    expect(book).to.have.property('title');
                    expect(book).to.have.property('author');
                });
            }
        });
    });

    it('Edge Case: When no books exist', () => {
        cy.request({
            method: 'GET',
            url: `${baseURL}/api/books`,
            headers: adminAuthHeader,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            if (response.body.length == 0) {
                expect(response.body.length).to.eq(0);
            }
        });
    });
});
