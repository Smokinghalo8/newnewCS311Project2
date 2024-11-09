//this might be the same thing as Flahscard.js, in fact, that might just be decapricated
//yeah
import { useEffect, useState } from 'react';

const Flashcard = ({ onReview }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [showAnswer, setShowAnswer] = useState(null); //Track which card's answer is shown
  const [layout, setLayout] = useState('single'); //Track layout mode (single vs. multiple) because were doing that, of course

  //grab those flashcards data from the API
  useEffect(() => {
    const fetchFlashcards = async () => {
      const res = await fetch('/api/flashcards');
      const data = await res.json();
      setFlashcards(data);
    };

    fetchFlashcards();
  }, []);

  const handleAnswerClick = (id) => {
    setShowAnswer((prevState) => (prevState === id ? null : id));//set answer invisble
  };

  const handleRating = async (cardId, rating) => {
    //Update the knowledge level in the database, goofy name regarless
    const res = await fetch('/api/updateKnowledgeLevel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardId, amount_understood: rating }),


    });

    if (res.ok) {
      setFlashcards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId ? { ...card, amount_understood: rating } : card
        )
      );
    }
  };

  const toggleLayout = () => {
    setLayout((prevLayout) => (prevLayout === 'single' ? 'multiple' : 'single'));
  };

  return (
    <div>
      {/* Button to toggle layout */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={toggleLayout}
      >
        {layout === 'single' ? 'Show All Questions' : 'Show One Question'}
      </button>

      <div className="mt-4">
        {layout === 'single' ? (
          //Single question layout (default layout)
          flashcards.slice(0, 1).map((card) => (



            <div key={card.id} className="bg-white p-6 m-6 rounded-lg shadow-lg max-w-sm w-full">
              <div className="mb-4">

                <h2 className="text-xl font-semibold">{card.question}</h2>
                <button
                  className="bg-blue-200 text-black px-4 py-1 rounded-md hover:bg-red-300"
                  onClick={() => handleAnswerClick(card.id)}
                >
                  {showAnswer === card.id ? 'Hide Answer' : 'Show Answer'} 
                  
                </button>
                
              </div>
              {showAnswer === card.id && (
                <div className="mt-4">
                  <p className="italic">{card.answer}</p>
                  <div className="mt-4 space-x-2">
                    <h3 className="text-lg">How difficult did you find this question?</h3>
                    <button
                      className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ${card.amount_understood === 1 ? 'bg-red-600' : ''}`}
                      onClick={() => handleRating(card.id, 1)}
                    >
                      1 (Difficult af)
                    </button>
                    <button
                      className={`bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 ${card.amount_understood === 2 ? 'bg-yellow-600' : ''}`}
                      onClick={() => handleRating(card.id, 2)}
                    >
                      2 (...meh, I mean it was okay)
                    </button>
                    <button
                      className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ${card.amount_understood === 3 ? 'bg-green-600' : ''}`}
                      onClick={() => handleRating(card.id, 3)}
                    >
                      3 (Baby difficulty)
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-4">
                <p className="text-sm text-gray-500">Your Knowledge Level: {card.amount_understood}</p>
              </div>
            </div>
          ))
        ) : (
          //Multiple questions layout
          flashcards.map((card) => (
            <div key={card.id} className="bg-white p-6 m-6 rounded-lg shadow-lg max-w-sm w-full">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{card.question}</h2>
                <button
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={() => handleAnswerClick(card.id)}
                >
                  {showAnswer === card.id ? 'Hide Answer' : 'Show Answer'}
                </button>
              </div>
              {showAnswer === card.id && (
                <div className="mt-4">
                  <p className="italic">{card.answer}</p>
                  <div className="mt-4 space-x-2">
                    <h3 className="text-lg">How difficult did you find this question?</h3>
                    <button
                      className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ${card.amount_understood === 1 ? 'bg-red-600' : ''}`}
                      onClick={() => handleRating(card.id, 1)}
                    >
                      1 (Difficult af)
                    </button>
                    <button
                      className={`bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 ${card.amount_understood === 2 ? 'bg-yellow-600' : ''}`}
                      onClick={() => handleRating(card.id, 2)}
                    >
                      2 (...meh, I mean it was okay)
                      </button>
                    <button
                      className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ${card.amount_understood === 3 ? 'bg-green-600' : ''}`}
                      onClick={() => handleRating(card.id, 3)}
                    >
                      3 (Baby difficulty)
                      </button>
                  </div>
                </div>
              )}
              <div className="mt-4">
                <p className="text-sm text-gray-500">Your Knowledge Level: {card.amount_understood}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Flashcard;

/*
import { useState } from 'react';

const Flashcard = ({ card, onReview }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerClick = () => {
    setShowAnswer(true);
  };

  const handleRating = (rating) => {
    onReview(card.id, rating);
    setShowAnswer(false); // Hide answer after review pls
  };

  return (
    <div className="flashcard">
      <div className="question">
        <h2>{card.question}</h2>
        <button 
            className="bg-blue-200 text-black px-4 py-1 rounded-md hover:bg-red-300"
            onClick={handleAnswerClick}>Show Answer!</button>
      </div>
      {showAnswer && (
        <div className="answer">
          <p>{card.answer}</p>
          <div className="rating">

            <h3>How difficult did you find this question?</h3>



            <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
             onClick={() => handleRating(1)}>1 (Difficult af)</button>
            <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
             onClick={() => handleRating(2)}>2 (...meh, I mean it was okay)</button>
            <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={() => handleRating(3)}>3 (Baby difficulty)</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
*/