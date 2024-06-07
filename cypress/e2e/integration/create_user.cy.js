describe('Create User API Tests', () => {
    const apiUrl = Cypress.env('URL');

    it('should create a new user', () => {
        // creating new user with name = Vikram1 and Keeping balance 0
        cy.request('POST', `${apiUrl}/create_user`, { name: 'Vikram1' })
            .then((response) => {
                //verifying response data to have expected properties and  
                //created user name should be Vikram1
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('userId');
                expect(response.body).to.have.property('name', 'Vikram1');
            });
    });
});
