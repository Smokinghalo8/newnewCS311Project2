// pages/index.js
import Flashcard from '../components/Flashcard';

const cards = [
  { id: 1, question: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
  { id: 2, question: 'What is Next.js?', answer: 'A React framework for server-side rendering and static websites' },
  { id: 3, question: 'What is Tailwind CSS?', answer: 'A utility-first CSS framework for creating custom designs quickly' },
];

export default function Home() {
  const handleReview = (cardId, rating) => {
    console.log(`Card ${cardId} rated as ${rating}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">Spaced Repetition Flashcards</h1>
      <Flashcard cards={cards} onReview={handleReview} />
    </div>
  );
}
/*


import { useState, useEffect } from 'react';
import Flashcard from '../components/Flashcard';

export default function Home() {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    //Find and fetch flashcards from the API
    async function fetchFlashcards() {
      const response = await fetch('/api/flashcards');
      const data = await response.json();
      setCards(data);
    }

    fetchFlashcards();
  }, []);

  const handleReview = async (cardId, rating) => {
    const updatedCard = cards.find(card => card.id === cardId);

    const newAmountUnderstood = updatedCard.amount_understood + rating;
    const newTime = updatedCard.time + 1; //Increase the time by 1(this could be more complex, but who knows)

    const updatedFlashcard = {
      ...updatedCard,
      amount_understood: newAmountUnderstood,
      time: newTime,
    };

    //Update
    await fetch('/api/flashcards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFlashcard),
    });

    //Update Local with the updated flashcard
    const updatedCards = cards.map(card =>
      card.id === cardId ? updatedFlashcard : card
    );
    setCards(updatedCards);

    //Show the next card
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
*/