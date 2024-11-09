// pages/index.js
import { useState, useEffect } from 'react';
import Flashcard from '../components/Flashcard';

export default function Home() {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    // Fetch flashcards from the API
    async function fetchFlashcards() {
      const response = await fetch('/api/flashcards');
      const data = await response.json();
      setCards(data);
    }

    fetchFlashcards();
  }, []);

  const handleReview = async (cardId, rating) => {
    const updatedCard = cards.find(card => card.id === cardId);

    // Calculate the new amount_understood and time based on the rating
    const newAmountUnderstood = updatedCard.amount_understood + rating;
    const newTime = updatedCard.time + 1; // increment the review time by 1 unit (this could be more complex)

    const updatedFlashcard = {
      ...updatedCard,
      amount_understood: newAmountUnderstood,
      time: newTime,
    };

    // Update the flashcard data in the backend API
    await fetch('/api/flashcards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFlashcard),
    });

    // Update the local state with the updated flashcard
    const updatedCards = cards.map(card =>
      card.id === cardId ? updatedFlashcard : card
    );
    setCards(updatedCards);

    // Show the next card
    setCurrentCardIndex((currentCardIndex + 1) % cards.length);
  };

  const currentCard = cards[currentCardIndex];

  return (
    <div className="container">
      <h1>Spaced Repetition Flashcards</h1>
      {currentCard && (
        <Flashcard card={currentCard} onReview={handleReview} />
      )}
    </div>
  );
}
