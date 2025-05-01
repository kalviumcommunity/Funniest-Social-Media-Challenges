import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddChallenge from './src/components/AddChallenge';

const ChallengesList = () => {
    const [challenges, setChallenges] = useState([]);
    const [error, setError] = useState(null);

    const fetchChallenges = async () => {
        try {
            const response = await axios.get('http://localhost:9080/get');
            setChallenges(response.data.data);
        } catch (err) {
            console.error("Error fetching challenges:", err);
            setError("Failed to fetch challenges. Please try again later.");
        }
    };

    useEffect(() => {
        fetchChallenges();
    }, []);

    const handleChallengeAdded = (newChallenge) => {
        setChallenges(prevChallenges => [...prevChallenges, newChallenge]);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <AddChallenge onChallengeAdded={handleChallengeAdded} />
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Current Challenges</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {challenges.map((challenge, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">{challenge.challenge}</h3>
                            <p className="text-gray-600">{challenge.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChallengesList;