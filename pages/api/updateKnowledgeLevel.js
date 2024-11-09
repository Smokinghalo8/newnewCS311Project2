import sqlite3 from 'sqlite3';
//import { open } from 'sqlite';
//top line breaks application

// Open the database
const openDb = async () => {
  return open({
    filename: 'spaced-repetition/components/Flashcard.js', //path to the database file
    driver: sqlite3.Database
  });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cardId, amount_understood } = req.body;
    
    const db = await openDb();

    try {
      // Update the knowledge level for the specified card
      await db.run(
        'UPDATE flashcards SET amount_understood = ? WHERE id = ?',
        [amount_understood, cardId]
      );
      res.status(200).json({ message: 'Knowledge level updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update knowledge level' });
    } finally {
      db.close();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
