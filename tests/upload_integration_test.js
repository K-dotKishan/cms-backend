import fs from 'fs';

const log = (msg) => {
    fs.appendFileSync('upload_test_out.txt', msg + '\n');
    console.log(msg);
};

log("Testing Upload Integration (Static Analysis)...");

try {
    const routeContent = fs.readFileSync('routes/artifacts.route.js', 'utf8');

    // Check for correct import
    // Note: The import might be "import upload from ..." or "import { upload } from ..." depending on how middleware is exported
    // faster to just check for the file path
    if (routeContent.includes('../middleware/upload.middleware.js')) {
        log("PASS: Import path updated to middleware folder");
    } else {
        log("FAIL: Import path likely incorrect (expected ../middleware/upload.middleware.js)");
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
