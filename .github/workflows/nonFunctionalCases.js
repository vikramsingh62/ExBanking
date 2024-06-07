import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

// Custom metrics
let createUserCounter = new Counter('create_user');
let depositCounter = new Counter('deposit');
let withdrawCounter = new Counter('withdraw');
let getBalanceCounter = new Counter('get_balance');
let sendCounter = new Counter('send');

export let options = {
    stages: [
        { duration: '30s', target: 50 }, // ramp up to 50 users
        { duration: '1m', target: 50 },  // stay at 50 users for 1 minute
        { duration: '30s', target: 0 },  // ramp down to 0 users
    ],
};

const BASE_URL = "'http://localhost:3000'";

export default function () {
    let userPayload = JSON.stringify({ name: 'user1'});
    let depositPayload = JSON.stringify({ userId: '1', amount: 100 });
    let withdrawPayload = JSON.stringify({ userId: '2', amount: 50 });
    let sendPayload = JSON.stringify({ from_user: 1, to_user: 2, amount: 30 });
    let params = { headers: { 'Content-Type': 'application/json' } };

    // Create user
    let createUserRes = http.post(`${BASE_URL}/create_user`, userPayload, params);
    check(createUserRes, { 'create_user: status 200': (r) => r.status === 200 });
    createUserCounter.add(1);

    // Deposit
    let depositRes = http.post(`${BASE_URL}/deposit`, depositPayload, params);
    check(depositRes, { 'deposit: status 200': (r) => r.status === 200 });
    depositCounter.add(1);

    // Withdraw
    let withdrawRes = http.post(`${BASE_URL}/withdraw`, withdrawPayload, params);
    check(withdrawRes, { 'withdraw: status 200': (r) => r.status === 200 });
    withdrawCounter.add(1);

    // Get balance
    let getBalanceRes = http.get(`${BASE_URL}/get_balance?username=user1`);
    check(getBalanceRes, { 'get_balance: status 200': (r) => r.status === 200 });
    getBalanceCounter.add(1);

    // Send
    let sendRes = http.post(`${BASE_URL}/send`, sendPayload, params);
    check(sendRes, { 'send: status 200': (r) => r.status === 200 });
    sendCounter.add(1);

    sleep(1);
}
