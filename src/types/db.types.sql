CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT NOT NULL,
    messageType TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp INTEGER NOT NULL
);