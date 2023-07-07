const crypto = require('crypto');

const generateSecretKey = () => {
  const secretBytes = crypto.randomBytes(32);
  const secretKey = secretBytes.toString('hex');
  return secretKey;
};

console.log(generateSecretKey());
