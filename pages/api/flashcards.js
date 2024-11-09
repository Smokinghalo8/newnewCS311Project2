import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database', 'flashcards.db');
//same as other api file but as a database and file
//this is complicated\
//push through

export default function handler(req, res) {
  const db = new sqlite3.Database(dbPath);

  if (req.method === 'GET') {
    db.all('SELECT * FROM flashcards', (err, rows) => {
      if (err) {
        //basic error
        return res.status(500).json({ error: 'Falied to fetch' });
      }
      res.status(200).json(rows);
    });
  }

  if (req.method === 'POST') {
    //update after
    const { id, amount_understood, time } = req.body;

    db.run(


      'UPDATE flashcards SET amount_understood = ?, time = ? WHERE id = ?',
      [amount_understood, time, id],
      function (err) {
        if (err) {
            //error
          return res.status(500).json({ error: 'Failed to fetch' });
        }
        res.status(200).json({ id, amount_understood, time });
      }
    );
  }

  db.close();
}
