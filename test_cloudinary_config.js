import cloudinary from './config/cloudinary.js';

console.log('Cloudinary Config Test:');
try {
    const config = cloudinary.config();
    console.log('Cloud Name:', config.cloud_name);
    console.log('API Key:', config.api_key ? '***' + config.api_key.slice(-4) : 'Missing');
    if (config.cloud_name && config.api_key && config.api_secret) {
        console.log('SUCCESS: Cloudinary configuration loaded.');
    } else {
        console.error('FAILURE: Missing configuration values.');
        process.exit(1);
    }
} catch (error) {
    console.error('ERROR:', error);
    process.exit(1);
}
