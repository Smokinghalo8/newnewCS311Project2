//this might be the same thing as Flahscard.js, in fact, that might just be decapricated
//yeah
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
        <button onClick={handleAnswerClick}>Show Answer</button>
      </div>
      {showAnswer && (
        <div className="answer">
          <p>{card.answer}</p>
          <div className="rating">

            <h3>How difficult did you find this question?</h3>



            <button onClick={() => handleRating(1)}>1 (Difficult af)</button>
            <button onClick={() => handleRating(2)}>2 (...meh, I mean it was okay)</button>
            <button onClick={() => handleRating(3)}>3 (Baby difficulty)</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
