// API Test Suite for Authentication Endpoints
const axios = require('axios');
const chalk = require('chalk'); // For colored console output

// Base URL for API
const API_URL = 'http://localhost:9080/user';

// Test user data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

// Store cookies between requests
let cookies = '';

// Helper function to log test results
function logResult(testName, success, message, data) {
  if (success) {
    console.log(chalk.green(`✓ ${testName}: ${message}`));
  } else {
    console.log(chalk.red(`✗ ${testName}: ${message}`));
  }
  
  if (data) {
    console.log(chalk.gray('Response data:'));
    console.log(chalk.gray(JSON.stringify(data, null, 2)));
  }
  
  console.log(''); // Empty line for readability
}

// Helper function to extract cookies from response
function extractCookies(response) {
  const setCookieHeader = response.headers['set-cookie'];
  if (setCookieHeader) {
    cookies = setCookieHeader.join('; ');
    return true;
  }
  return false;
}

// Test registration
async function testRegistration() {
  try {
    console.log(chalk.blue('=== Testing User Registration ==='));
    
    const response = await axios.post(`${API_URL}/register`, testUser, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    logResult(
      'Registration', 
      response.status === 201, 
      response.status === 201 ? 'User registered successfully' : 'Unexpected status code',
      response.data
    );
    
    return response.data;
  } catch (error) {
    // If user already exists, that's okay for our tests
    if (error.response && error.response.status === 400 && 
        error.response.data.message.includes('already exists')) {
      logResult('Registration', true, 'User already exists (this is fine for testing)', error.response.data);
      return { success: true, message: 'User already exists' };
    } else {
      logResult('Registration', false, `Error: ${error.message}`, error.response?.data);
      return { success: false, error: error.message };
    }
  }
}

// Test login
async function testLogin() {
  try {
    console.log(chalk.blue('=== Testing User Login ==='));
    
    const response = await axios.post(`${API_URL}/login`, {
      email: testUser.email,
      password: testUser.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const cookiesSet = extractCookies(response);
    
    logResult(
      'Login', 
      response.status === 200, 
      response.status === 200 ? 'Login successful' : 'Unexpected status code',
      response.data
    );
    
    logResult(
      'Cookie Setting', 
      cookiesSet, 
      cookiesSet ? 'Cookies were set in the response' : 'No cookies were set in the response',
      { cookies }
    );
    
    return { success: true, data: response.data, cookies };
  } catch (error) {
    logResult('Login', false, `Error: ${error.message}`, error.response?.data);
    return { success: false, error: error.message };
  }
}

// Test logout
async function testLogout() {
  try {
    console.log(chalk.blue('=== Testing User Logout ==='));
    
    const response = await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies
      }
    });
    
    const cookiesCleared = extractCookies(response);
    
    logResult(
      'Logout', 
      response.status === 200, 
      response.status === 200 ? 'Logout successful' : 'Unexpected status code',
      response.data
    );
    
    logResult(
      'Cookie Clearing', 
      cookiesCleared, 
      cookiesCleared ? 'Cookies were cleared in the response' : 'No cookie clearing detected',
      { cookies }
    );
    
    return { success: true, data: response.data };
  } catch (error) {
    logResult('Logout', false, `Error: ${error.message}`, error.response?.data);
    return { success: false, error: error.message };
  }
}

// Run all tests
async function runTests() {
  console.log(chalk.yellow('Starting API Tests for Authentication Endpoints'));
  console.log(chalk.yellow('==========================================='));
  
  // Test registration
  await testRegistration();
  
  // Test login
  const loginResult = await testLogin();
  
  // Only test logout if login was successful
  if (loginResult.success) {
    await testLogout();
  }
  
  console.log(chalk.yellow('==========================================='));
  console.log(chalk.yellow('API Tests Completed'));
}

// Install chalk if not already installed
try {
  require.resolve('chalk');
  // Run tests if chalk is installed
  runTests();
} catch (e) {
  console.log('Installing chalk package for colored output...');
  const { execSync } = require('child_process');
  execSync('npm install chalk', { stdio: 'inherit' });
  console.log('Chalk installed, running tests...');
  // Re-run this script after installing chalk
  require('./api-test.js');
}
