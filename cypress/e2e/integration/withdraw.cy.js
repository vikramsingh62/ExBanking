describe('Withdraw API Tests', () => {
    const apiUrl = Cypress.env('URL');

    it('should withdraw money from a user account', () => {
        const userId = 2;  // Using dummy data of user singh
        cy.request('POST', `${apiUrl}/withdraw`, { userId, amount: 50 })
            .then((response) => {
                //verifing status code and the new balance after withdrawing money
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('userId', userId);
                expect(response.body).to.have.property('newBalance', 3050);  // Initial 3100 - 50 withdrawal
            });
    });

    it('should handle insufficient funds on withdraw', () => {
        const userId = 3;  // Using dummy data for user3
        cy.request({
            method: 'POST',
            url: `${apiUrl}/withdraw`,
            body: { userId, amount: 10000 }, //user3 have 7000 but trying to withdraw 10000
            failOnStatusCode: false
        }).then((response) => {
            //Verifing the status code and the error
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error', 'Insufficient funds');
        });
    });

    it('should handle user not found on withdraw', () => {
        //case when user is not found with the provided userID
        cy.request({
            method: 'POST',
            url: `${apiUrl}/withdraw`,
            body: { userId: 999, amount: 100 }, //providing random userID 999 which is not available
            failOnStatusCode: false
        }).then((response) => {
            //verifing the status code and the error
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('error', 'User not found');
        });
    });
});
