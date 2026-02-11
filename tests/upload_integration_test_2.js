import fs from 'fs';

const log = (msg) => {
    fs.appendFileSync('upload_test_out.txt', msg + '\n');
    console.log(msg);
};

log("Testing Upload Integration (Static Analysis 2)...");

try {
    const routeContent = fs.readFileSync('routes/artifacts.route.js', 'utf8');

    // Check for correct import - NOW CHECKING FOR DEFAULT IMPORT
    if (routeContent.includes('import upload from "../middleware/upload.middleware.js"')) {
        log("PASS: Import uses default export correctly");
    } else {
        log("FAIL: Import still incorrect (expected default import)");
        log("Debug: " + routeContent.match(/import.*upload.*/));
    }

    // Check for router usage
    if (!routeContent.includes('app.post')) {
        log("PASS: No 'app.post' usage found");
    } else {
        log("FAIL: 'app.post' found - this will crash the router");
    }

    // Check for logic
    if (routeContent.includes('router.post') &&
        routeContent.includes('authorizeRoles') &&
        routeContent.includes('upload.single')) {
        log("PASS: Route definition contains role check and upload middleware");
    } else {
        log("FAIL: Route definition missing components");
    }

} catch (err) {
    log("ERROR: " + err.message);
}
