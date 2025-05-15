import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserChallenges = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [userChallenges, setUserChallenges] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:9080/user/get');
            setUsers(response.data.users);
        } catch (error) {
            setError('Failed to fetch users');
            console.error('Error fetching users:', error);
        }
    };

    const fetchUserChallenges = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:9080/get`);
            const allChallenges = response.data.data;
            const filteredChallenges = allChallenges.filter(challenge => challenge.userId === userId);
            setUserChallenges(filteredChallenges);
        } catch (error) {
            setError('Failed to fetch challenges');
            console.error('Error fetching challenges:', error);
        }
    };

    const handleUserChange = (e) => {
        const userId = e.target.value;
        setSelectedUser(userId);
        if (userId) {
            fetchUserChallenges(userId);
        } else {
            setUserChallenges([]);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="user-challenges-container">
            <h2>User Challenges</h2>
            
            <div className="user-select">
                <select 
                    value={selectedUser} 
                    onChange={handleUserChange}
                    className="user-dropdown"
                >
                    <option value="">Select a user</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>
                            {user.name} ({user.email})
                        </option>
                    ))}
                </select>
            </div>

            {/* Display selected user details */}
            {selectedUser && users.map(user => {
                if (user._id === selectedUser) {
                    return (
                        <div key={user._id} className="user-details">
                            <h3>User Details</h3>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Created: {formatDate(user.createdAt)}</p>
                        </div>
                    );
                }
                return null;
            })}

            {error && <p className="error-message">{error}</p>}

            <div className="challenges-list">
                {userChallenges.length > 0 ? (
                    userChallenges.map(challenge => (
                        <div key={challenge._id} className="challenge-card">
                            <h3>{challenge.challenge}</h3>
                            <p>{challenge.description}</p>
                        </div>
                    ))
                ) : (
                    selectedUser && <p>No challenges found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default UserChallenges;