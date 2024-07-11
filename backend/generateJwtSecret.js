const crypto = require('crypto');

// Generate a random string of 64 bytes and convert it to hexadecimal
const secret = crypto.randomBytes(64).toString('hex');

console.log('Your JWT secret key is:', secret);
