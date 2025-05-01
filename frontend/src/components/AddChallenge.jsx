import React, { useState } from 'react';
import axios from 'axios';

const AddChallenge = ({ onChallengeAdded }) => {
    const [formData, setFormData] = useState({
        challenge: '',
        description: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.challenge || !formData.description) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:9080/post', formData);
            setSuccess('Challenge added successfully!');
            setFormData({ challenge: '', description: '' });
            if (onChallengeAdded) {
                onChallengeAdded(response.data.data);
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to add challenge');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Challenge</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="challenge" className="block text-sm font-medium text-gray-700">Challenge Name</label>
                    <input
                        type="text"
                        id="challenge"
                        name="challenge"
                        value={formData.challenge}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter challenge name"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter challenge description"
                    ></textarea>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Add Challenge
                </button>
            </form>
        </div>
    );
};

export default AddChallenge;