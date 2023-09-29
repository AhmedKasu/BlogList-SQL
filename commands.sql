-- Description: SQL commands for creating tables
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY, 
    author varchar(50),
    url varchar(500) NOT NULL,
    title varchar(50) NOT NULL, 
    likes int DEFAULT 0);

-- Description: SQL commands for inserting data (blogs)
INSERT INTO blogs (
    author,
    url,
    title)
VALUES (
    'Dan Abramov', 
    'https://overreacted.io/on-let-vs-const/', 
    'On let vs const');

INSERT INTO blogs (
    author, 
    url, 
    title) 
VALUES (
    'Laurenz Albe', 
    'https://www.cybertec-postgresql.com/en/gaps-in-sequences-postgresql/', 
    'Gaps in sequences in PostgreSQL');