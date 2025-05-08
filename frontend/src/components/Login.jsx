import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
    const[user,setUser] = useState({
        email:"",
        password:""
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function handleInput(e){
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user,[name]:value})
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            const response = await axios.post('http://localhost:9080/user/login', user, {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSuccess('Login successful!');
            console.log('Login successful:', response.data);
            // Here you can add navigation or other success handling
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                setError('Unable to connect to the server. Please try again later.');
            } else if (error.response?.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('Login failed. Please try again.');
            }
            console.error('Login error:', error);
        }
    };
    
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <input 
                        type="email" 
                        name='email' 
                        placeholder="Email"
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        name='password' 
                        placeholder="Password"
                        onChange={handleInput}
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                {success && <p style={{color: 'green'}}>{success}</p>}
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login