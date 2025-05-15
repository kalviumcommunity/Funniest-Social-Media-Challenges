const axios = require('axios');

async function testLogin() {
  try {
    console.log('Testing login endpoint...');
    const response = await axios.post('http://localhost:9080/user/login', 
      { 
        email: 'test@example.com', 
        password: 'password123' 
      },
      {
        withCredentials: true // Important for cookies
      }
    );
    
    console.log('Login response:', response.data);
    console.log('Headers:', response.headers);
    return response.data;
  } catch (error) {
    console.error('Login test failed:', error.response ? error.response.data : error.message);
    console.error('Error details:', error);
  }
}

testLogin();
