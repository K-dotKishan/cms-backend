import { authorizeRoles } from "../middleware/role.middleware.js";
import fs from 'fs';

const log = (msg) => {
    fs.appendFileSync('artifact_test_out.txt', msg + '\n');
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

log("Testing authorizeRoles('ADMIN', 'EDITOR')...");

// Test 1: ADMIN should pass
log("Test 1: ADMIN role");
const req1 = { user: { role: "ADMIN" } };
const res1 = mockResponse();
let next1Called = false;
authorizeRoles("ADMIN", "EDITOR")(req1, res1, () => { next1Called = true; });
if (next1Called) {
    log("PASS: ADMIN allowed");
} else {
    log("FAIL: ADMIN blocked");
}

// Test 2: EDITOR should pass
log("Test 2: EDITOR role");
const req2 = { user: { role: "EDITOR" } };
const res2 = mockResponse();
let next2Called = false;
authorizeRoles("ADMIN", "EDITOR")(req2, res2, () => { next2Called = true; });
if (next2Called) {
    log("PASS: EDITOR allowed");
} else {
    log("FAIL: EDITOR blocked");
}

// Test 3: VIEWER should fail
log("Test 3: VIEWER role");
const req3 = { user: { role: "VIEWER" } };
const res3 = mockResponse();
let next3Called = false;
authorizeRoles("ADMIN", "EDITOR")(req3, res3, () => { next3Called = true; });
if (!next3Called && res3.statusCode === 403) {
    log("PASS: VIEWER blocked (403)");
} else {
    log(`FAIL: VIEWER not blocked correctly (status: ${res3.statusCode})`);
}
