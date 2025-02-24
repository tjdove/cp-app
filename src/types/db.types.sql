CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    messageType TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp INTEGER NOT NULL
);