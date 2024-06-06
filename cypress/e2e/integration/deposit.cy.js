describe('Deposit API Tests', () => {
    const apiUrl = Cypress.env('URL');

    it('should deposit money into a user account', () => {
        const userId = 1;  // Using dummy data user vikram
        cy.request('POST', `${apiUrl}/deposit`, { userId, amount: 100 }) // depositing money to vikram's account 
            .then((response) => {
                //verifying response status code ,properties and the balance after depositing 100
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('userId', userId);
                expect(response.body).to.have.property('newBalance', 5100);  // Initially the vikram is having 5000 + 100 deposit
            });
    });

    it('should handle user not found on deposit', () => {  //For the case when User is not available in db
        cy.request({
            method: 'POST',
            url: `${apiUrl}/deposit`,
            body: { userId: 999, amount: 100 }, //providing random userID 999 for the user which is not present
            failOnStatusCode: false
        }).then((response) => {
            // Verifying the status code and the error 
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('error', 'User not found');
        });
    });
});
