CREATE TABLE food(
    db_id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    id UUID PRIMARY KEY NOT NULL,
    fdcId INTEGER UNIQUE,
    name TEXT NOT NULL,
    description TEXT 
);