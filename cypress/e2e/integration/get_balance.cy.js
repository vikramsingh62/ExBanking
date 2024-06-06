describe('Get Balance API Tests', () => {
    const apiUrl = Cypress.env('URL');

    it('should get the balance of a user account', () => {
        const userId = 3;  // Using dummy data user user3
        cy.request('GET', `${apiUrl}/get_balance/${userId}`)
            .then((response) => {
                //verifying the status code and available balance 
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('balance', 7000);  // Initial balance 
            });
    });

    it('should handle user not found on get_balance', () => {
        // For the case then user is not found for the User ID provided
        cy.request({
            method: 'GET',
            url: `${apiUrl}/get_balance/999`,// providing random user ID 999 to fetch the balance of the user which is not available
            failOnStatusCode: false
        }).then((response) => {
            //Verifying status code and the error message
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('error', 'User not found');
        });
    });
});
