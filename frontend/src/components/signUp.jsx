import axios from 'axios';
import React, { useState } from 'react'

const Signup = () => {
    const[user,setUser] = useState({
        name:"",
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

    async function handleRegister(e){
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!user.name || !user.email || !user.password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post("http://localhost:9080/user/register", user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSuccess('Registration successful!');
            console.log('Registration successful:', response.data);
            // Clear form after successful registration
            setUser({ name: "", email: "", password: "" });
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                setError('Unable to connect to the server. Please try again later.');
            } else if (error.response?.status === 400) {
                setError('User already exists with this email');
            } else {
                setError('Registration failed. Please try again.');
            }
            console.error('Registration error:', error);
        }
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <input 
                        type="text" 
                        name='name' 
                        placeholder="Name"
                        value={user.name}
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <input 
                        type="email" 
                        name='email' 
                        placeholder="Email"
                        value={user.email}
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        name='password' 
                        placeholder="Password"
                        value={user.password}
                        onChange={handleInput}
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                {success && <p style={{color: 'green'}}>{success}</p>}
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    )
}

export default Signup