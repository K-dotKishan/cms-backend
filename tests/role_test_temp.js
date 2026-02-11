import { authorizeRoles } from "../middleware/role.middleware.js";
import fs from 'fs';

const log = (msg) => {
    fs.appendFileSync('test_output.txt', msg + '\n');
    console.log(msg);
};

const mockResponse = () => {
    const res = {};
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.json = (data) => {
        res.data = data;
        return res;
    };
    return res;
};

const mockNext = () => {
    log("Next called");
};

log("Testing authorizeRoles middleware...");

// Test 1: Access denied (no user)
log("Test 1: Missing user");
const req1 = {};
const res1 = mockResponse();
authorizeRoles("ADMIN")(req1, res1, mockNext);
if (res1.statusCode === 401) {
    log("PASS: Status is 401");
} else {
    log(`FAIL: Expected 401, got ${res1.statusCode}`);
}

// Test 2: Access denied (no role)
log("Test 2: User without role");
const req2 = { user: {} };
const res2 = mockResponse();
authorizeRoles("ADMIN")(req2, res2, mockNext);
if (res2.statusCode === 401) {
    log("PASS: Status is 401");
} else {
    log(`FAIL: Expected 401, got ${res2.statusCode}`);
}

// Test 3: Forbidden (wrong role)
log("Test 3: User with wrong role");
const req3 = { user: { role: "VIEWER" } };
const res3 = mockResponse();
authorizeRoles("ADMIN")(req3, res3, mockNext);
if (res3.statusCode === 403) {
    log("PASS: Status is 403");
} else {
    log(`FAIL: Expected 403, got ${res3.statusCode}`);
}

// Test 4: Access granted
log("Test 4: User with correct role");
const req4 = { user: { role: "ADMIN" } };
const res4 = mockResponse();
let nextCalled = false;
const next4 = () => { nextCalled = true; };
authorizeRoles("ADMIN")(req4, res4, next4);
if (nextCalled) {
    log("PASS: Next middleware called");
} else {
    log("FAIL: Next middleware not called");
}
