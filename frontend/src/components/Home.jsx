import React from 'react';
import Card from './Card';

const Home = () => {
  const challenges = [
    {
      "id": 1,
      "title": "Chubby Bunny Challenge",
      "description": "Stuff marshmallows in your mouth and say 'Chubby Bunny'."
    },
    {
      "id": 2,
      "title": "Ice Bucket Challenge",
      "description": "Dump a bucket of ice water over yourself for charity."
    },
    {
      "id": 3,
      "title": "Cinnamon Challenge",
      "description": "Try to swallow a spoonful of cinnamon without drinking water."
    },
    {
      "id": 4,
      "title": "Lemon Eating Challenge",
      "description": "Eat a whole lemon without making a sour face."
    },
    {
      "id": 5,
      "title": "Blindfold Drawing Challenge",
      "description": "Draw a picture while blindfolded and guess what it is."
    },
    {
      "id": 6,
      "title": "Soda & Mentos Challenge",
      "description": "Drop Mentos into soda and try to control the fizz reaction."
    },
    {
      "id": 7,
      "title": "Make-Up Without a Mirror Challenge",
      "description": "Apply makeup without using a mirror and see the results."
    },
    {
      "id": 8,
      "title": "Whisper Challenge",
      "description": "Put on headphones and try to guess phrases that others whisper."
    },
    {
      "id": 9,
      "title": "Try Not to Laugh Challenge",
      "description": "Watch funny videos and try not to laugh or smile."
    },
    {
      "id": 10,
      "title": "Spicy Food Challenge",
      "description": "Eat extremely spicy food and see who can handle it best."
    }
  ];

  return (
    <div>
      <h1>Home</h1>
      <div className='challenge-container'>
        {
          challenges.map((challenge) => (
            <Card key={challenge.id}
              challenge={challenge.title}
              description={challenge.description}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Home;
