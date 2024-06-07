import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Configuration
let createUserCounter = new Counter('create_user');
let depositCounter = new Counter('deposit');
let withdrawCounter = new Counter('withdraw');
let getBalanceCounter = new Counter('get_balance');
let sendCounter = new Counter('send');

export let options = {
    stages: [
        { duration: '5s', target: 100 }, // ramp up to 100 users
        { duration: '10s', target: 100 },  // stay at 100 users for 10 sec
        { duration: '5s', target: 0 },  // ramp down to 0 users
    ],
};

const BASE_URL = 'http://localhost:3000';

export default function () {
    let userPayload = JSON.stringify({ name: 'test user1' });
    let depositPayload = JSON.stringify({ userId : 2, amount: 100 });
    let withdrawPayload = JSON.stringify({ userId: 3, amount: 2 });
    let sendPayload = JSON.stringify({ fromUserId: 3, toUserId: 2, amount: 1 });
    let params = { headers: { 'Content-Type': 'application/json' } };



    // Create user
    let createUserRes = http.post(`${BASE_URL}/create_user`, userPayload, params);
    check(createUserRes, { 'create_user: status 201': (r) => r.status === 201 });
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
    let getBalanceRes = http.get(`${BASE_URL}/get_balance/1`);
    check(getBalanceRes, { 'get_balance: status 200': (r) => r.status === 200 });
    getBalanceCounter.add(1);

    
    
    // Send
    let sendRes = http.post(`${BASE_URL}/send`, sendPayload, params);
    check(sendRes, { 'send: status 200': (r) => r.status === 200 });
    sendCounter.add(1);

    sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}