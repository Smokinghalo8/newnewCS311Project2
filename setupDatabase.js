//I dont know what Im doing

//I mean... SQLite seems easier..? I think? I dont know?


//all these are requiersd
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'flashcards.db');

//Make sure the database exists, I dont want any errors
if (!fs.existsSync(dbPath)) {
  const db = new sqlite3.Database(dbPath);
  //needed
  //its table creation for sorting
  //just dont get rid of it
  //I mean get rid of the old database
  db.serialize(() => {
    db.run(`
      CREATE TABLE flashcards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        amount_understood INTEGER DEFAULT 0,
        time INTEGER DEFAULT 0
      )
    `);

    //Flashcard data
    const stmt = db.prepare("INSERT INTO flashcards (question, answer) VALUES (?, ?)");
    stmt.run("How do you tame a horse in Minecraft?", "Apple");
    stmt.run("Best way to live longer in general?", "Don't die");
    stmt.run("What is the chemical symbol for water?", "H2O");
    stmt.finalize();
  });

  db.close();
  console.log("Database initialized!");
} else {
  console.log("Database already exists.");
}
