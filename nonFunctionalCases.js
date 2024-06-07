import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

// Configuration
export let options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp-up to 10 users
    { duration: '30s', target: 100 },  // Stay at 10 users
    { duration: '30s', target: 0 },  // Ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
  },
};

const BASE_URL = 'http://localhost:3000'; // Change this to your server's URL

// Custom metrics
let createUserFailures = new Counter('create_user_failures');

export default function () {
  let payload = JSON.stringify({
    name: 'Test User',
  });

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post(`${BASE_URL}/create_user`, payload, params);

  // Check if the response status is 201 (Created)
  let success = check(res, {
    'is status 201': (r) => r.status === 201,
  });

  if (!success) {
    createUserFailures.add(1);
  }

  // Optional: Sleep for 1 second between requests
  sleep(1);
}
