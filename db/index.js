const Database = require('better-sqlite3');
const db = new Database('app.db'); // file created if missing

// Create a table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = {
  allTodos() {
    return db.prepare('SELECT id, text, created_at FROM todos ORDER BY id DESC').all();
  },
  addTodo(text) {
    return db.prepare('INSERT INTO todos (text) VALUES (?)').run(text);
  },
  deleteTodo(id) {
    return db.prepare('DELETE FROM todos WHERE id = ?').run(id);
  },
  updateTodo(id, text) {
    return db.prepare('UPDATE todos SET text = ? WHERE id = ?').run(text, id);
  }
};
