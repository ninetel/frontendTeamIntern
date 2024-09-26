const dotenv = require('dotenv-webpack');

module.exports = {
  // ... other webpack configuration
  plugins: [
    new dotenv({ path: '.env' }), // Replace '.env' with your actual file path if different
  ],
};