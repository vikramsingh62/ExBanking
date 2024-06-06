describe('Send API Tests', () => {
    const apiUrl = Cypress.env('URL');

    it('should transfer money from one user to another', () => {
        const fromUserId = 1;  // Using dummy data user vikram
        const toUserId = 2;    // Using dummy data user singh
        cy.request('POST', `${apiUrl}/send`, { fromUserId, toUserId, amount: 100 }) //sending amout 100 from vikram to sing
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('fromUserId', fromUserId);
                expect(response.body).to.have.property('toUserId', toUserId);
                expect(response.body).to.have.property('amount', 100);
                expect(response.body).to.have.property('fromUserNewBalance', 5000);  // 5100(initial 5000+100 from deposit api) - 100 sent to singh
                expect(response.body).to.have.property('toUserNewBalance', 3100);   // 3000(intial) + 100 
            });
    });

    it('should handle user not found on send', () => {
        //case where user is not available for the ID provided
        cy.request({
            method: 'POST',
            url: `${apiUrl}/send`,
            body: { fromUserId: 999, toUserId: 1, amount: 100 }, // using random ID 999 to send 100 to user with Id 1
            failOnStatusCode: false
        }).then((response) => {
            //verifying status code and the error 
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('error', 'User not found');
        });
    });

    it('should handle insufficient funds on send', () => {
        //verifying the case where funds are not sufficient to send to any user
        const fromUserId = 3;  // Using dummy data user user3
        const toUserId = 2;    // Using dummy data user user4
        cy.request({
            method: 'POST',
            url: `${apiUrl}/send`,
            body: { fromUserId, toUserId, amount: 10000 }, //user3 only have 7000 but trying to send 10000
            failOnStatusCode: false
        }).then((response) => {
            //Verifying the status code and the error
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error', 'Insufficient funds');
        });
    });


});
