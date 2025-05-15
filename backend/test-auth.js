const axios = require('axios');

// Test login endpoint
async function testLogin() {
  try {
    console.log('Testing login endpoint...');
    const response = await axios.post('http://localhost:9080/user/login', 
      { 
        email: 'test@example.com', 
        password: 'password123' 
      },
      {
        withCredentials: true // Important for cookies to be set
      }
    );
    
    console.log('Login response:', response.data);
    console.log('Check your browser cookies to see if "username" cookie was set');
    return response.data;
  } catch (error) {
    console.error('Login test failed:', error.response ? error.response.data : error.message);
  }
}

// Test logout endpoint
async function testLogout() {
  try {
    console.log('Testing logout endpoint...');
    const response = await axios.post('http://localhost:9080/user/logout', {}, {
      withCredentials: true // Important for cookies to be cleared
    });
    
    console.log('Logout response:', response.data);
    console.log('Check your browser cookies to see if "username" cookie was removed');
    return response.data;
  } catch (error) {
    console.error('Logout test failed:', error.response ? error.response.data : error.message);
  }
}

// Run tests
async function runTests() {
  // First make sure we have a test user
  try {
    await axios.post('http://localhost:9080/user/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Test user created or already exists');
  } catch (error) {
    // If user already exists, that's fine
    if (error.response && error.response.status === 400) {
      console.log('Test user already exists');
    } else {
      console.error('Error creating test user:', error.message);
    }
  }

  // Run login test
  await testLogin();
  
  // Wait a bit before testing logout
  console.log('Waiting 2 seconds before testing logout...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Run logout test
  await testLogout();
}

// Run the tests
runTests();
