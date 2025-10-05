CREATE DATABASE recipe;
\c recipe;

CREATE TABLE IF NOT EXISTS recipe_item(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    instructions TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredient(
    ingredient_id SERIAL PRIMARY KEY,
    recipe_id INT NOT NULL REFERENCES recipe_item(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    quantity VARCHAR(50)
);
