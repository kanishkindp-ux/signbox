# SignBox Database Schema Notes (Day 7)

## 1. Core Database Concepts
*   **Tables:** Structured grids for storing data with strict rules for columns (data types) and rows (individual records).
*   **Primary Keys (PK):** A unique, permanent identifier for every single row (usually an auto-incrementing `SERIAL` integer). It guarantees we can find a specific record even if names or emails change.
*   **Foreign Keys (FK):** A column that stores the Primary Key of another table (like `owner_id` referencing a user). This connects records without duplicating data and protects the database from "orphaned" entries.

## 2. Table Blueprints
*   **`users` Table:** Tracks user accounts. Uses `id` as the PK, and enforces rules like `UNIQUE` on the email column so no two users share login details.
*   **`documents` Table:** Tracks uploaded files. Uses `id` as the PK, and `owner_id` as the FK referencing `users(id)`. 
*   **Data Integrity:** The database itself actively blocks invalid data. Attempting to insert a document with a non-existent `owner_id` violates the Foreign Key constraint and is instantly rejected.

## 3. Essential SQL Mechanics
*   **`CREATE TABLE` & `INSERT INTO`:** Used to build the structure and populate rows. We omit the `id` field during insertion because PostgreSQL handles it automatically.
*   **`JOIN ... ON`:** Temporarily merges two tables together using their Foreign/Primary Key relationship. This allows us to display human-readable data (like matching a document to a user's name instead of just showing an ID number).
*   **`GROUP BY` & `COUNT()`:** `GROUP BY` sorts data into distinct categories or "piles" (like grouping by user name) before performing math like `COUNT()` to aggregate the totals.

## 4. Security Considerations
*   **Passwords:** Plain-text passwords must never be stored in the database. Future iterations will utilize hashing algorithms (like bcrypt) and salting to protect against security vulnerabilities and data leaks.