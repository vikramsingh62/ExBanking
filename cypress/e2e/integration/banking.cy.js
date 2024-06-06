// describe('Banking Service API Tests', () => {
//   const apiUrl = 'http://localhost:3000';

//   it('should create a new user', () => {
//       cy.request('POST', `${apiUrl}/create_user`, { name: 'David' })
//           .then((response) => {
//               expect(response.status).to.eq(200);
//               expect(response.body).to.have.property('userId');
//               expect(response.body).to.have.property('name', 'David');
//           });
//   });

//   it('should deposit money into a user account', () => {
//       const userId = 1;  // Using dummy data user Alice
//       cy.request('POST', `${apiUrl}/deposit`, { userId, amount: 100 })
//           .then((response) => {
//               expect(response.status).to.eq(200);
//               expect(response.body).to.have.property('userId', userId);
//               expect(response.body).to.have.property('newBalance', 5100);  // Initial np500 + 100 deposit
//           });
//   });

//   it('should withdraw money from a user account', () => {
//       const userId = 2;  // Using dummy data user Bob
//       cy.request('POST', `${apiUrl}/withdraw`, { userId, amount: 50 })
//           .then((response) => {
//               expect(response.status).to.eq(200);
//               expect(response.body).to.have.property('userId', userId);
//               expect(response.body).to.have.property('newBalance', 2950);  // Initial 3000 - 50 withdrawal
//           });
//   });

//   it('should get the balance of a user account', () => {
//       const userId = 3;  // Using dummy data user Charlie
//       cy.request('GET', `${apiUrl}/get_balance/${userId}`)
//           .then((response) => {
//               expect(response.status).to.eq(200);
//               // expect(response.body).to.have.property('userId', userId);
//               expect(response.body).to.have.property('balance', 7000);  // Initial balance
//           });
//   });

//   it('should transfer money from one user to another', () => {
//       const fromUserId = 1;  // Using dummy data user Alice
//       const toUserId = 2;    // Using dummy data user Bob
//       cy.request('POST', `${apiUrl}/send`, { fromUserId, toUserId, amount: 100 })
//           .then((response) => {
//               expect(response.status).to.eq(200);
//               expect(response.body).to.have.property('fromUserId', fromUserId);
//               expect(response.body).to.have.property('toUserId', toUserId);
//               expect(response.body).to.have.property('amount', 100);
//               expect(response.body).to.have.property('fromUserNewBalance', 5000);  // 6000 - 100 (previous deposit)
//               expect(response.body).to.have.property('toUserNewBalance', 3050);   // 250 + 100 (previous withdrawal)
//           });
//   });

//   it('should handle insufficient funds on withdraw', () => {
//       const userId = 3;  // Using dummy data user Charlie
//       cy.request({
//           method: 'POST',
//           url: `${apiUrl}/withdraw`,
//           body: { userId, amount: 10000 },
//           failOnStatusCode: false
//       }).then((response) => {
//           expect(response.status).to.eq(400);
//           expect(response.body).to.have.property('error', 'Insufficient funds');
//       });
//   });

//   it('should handle user not found on deposit', () => {
//       cy.request({
//           method: 'POST',
//           url: `${apiUrl}/deposit`,
//           body: { userId: 999, amount: 100 },
//           failOnStatusCode: false
//       }).then((response) => {
//           expect(response.status).to.eq(404);
//           expect(response.body).to.have.property('error', 'User not found');
//       });
//   });

//   it('should handle user not found on withdraw', () => {
//       cy.request({
//           method: 'POST',
//           url: `${apiUrl}/withdraw`,
//           body: { userId: 999, amount: 100 },
//           failOnStatusCode: false
//       }).then((response) => {
//           expect(response.status).to.eq(404);
//           expect(response.body).to.have.property('error', 'User not found');
//       });
//   });

//   it('should handle user not found on get_balance', () => {
//       cy.request({
//           method: 'GET',
//           url: `${apiUrl}/get_balance/999`,
//           failOnStatusCode: false
//       }).then((response) => {
//           expect(response.status).to.eq(404);
//           expect(response.body).to.have.property('error', 'User not found');
//       });
//   });

//   it('should handle user not found on send', () => {
//       cy.request({
//           method: 'POST',
//           url: `${apiUrl}/send`,
//           body: { fromUserId: 999, toUserId: 1, amount: 100 },
//           failOnStatusCode: false
//       }).then((response) => {
//           expect(response.status).to.eq(404);
//           expect(response.body).to.have.property('error', 'User not found');
//       });
//   });

//   it('should handle insufficient funds on send', () => {
//       const fromUserId = 3;  // Using dummy data user Charlie
//       const toUserId = 2;    // Using dummy data user Bob
//       cy.request({
//           method: 'POST',
//           url: `${apiUrl}/send`,
//           body: { fromUserId, toUserId, amount: 10000 },
//           failOnStatusCode: false
//       }).then((response) => {
//           expect(response.status).to.eq(400);
//           expect(response.body).to.have.property('error', 'Insufficient funds');
//       });
//   });
// });
