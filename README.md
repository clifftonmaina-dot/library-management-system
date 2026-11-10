# Library Management System

A backend library management system built using NestJS, Prisma ORM, and PostgreSQL.

## Technologies Used

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Node.js

## Project Structure

library-management-system/
└── api/
    ├── prisma/
    │   ├── migrations/
    │   ├── schema.prisma
    │   └── seed.ts
    ├── src/
    │   ├── prisma/
    │   │   └── prisma.service.ts
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   └── app.service.ts
    ├── .env.example
    └── package.json
## Database Models

### User
Stores user information, including:
- ID
- Email
- Name
- Role (PATRON or LIBRARIAN)
- Created and updated timestamps

### Genre
Stores book genres.

### Book
Stores book information, including:
- ID
- Title
- Author
- Published year
- Genre ID
- Created and updated timestamps

## Schema Decisions

The Book model references the Genre model through a foreign key called genreId.

This design establishes a one-to-many relationship between Genre and Book. One genre can have many books, while each book belongs to one genre.

Using a separate Genre model avoids repeating genre information in every book record. It also makes it easier to manage genres, maintain data consistency, and retrieve books belonging to a particular genre.

## Setup Instructions

1. Clone the repository.
2. Navigate into the API folder.
3. Install dependencies:

npm install
4. Create a .env file using .env.example as a guide.
5. Add your PostgreSQL database connection string to .env.
6. Run database migrations:

npx prisma migrate dev
7. Insert sample data:

npx prisma db seed
8. Start the application:

npm run start:dev
## Seed Data

The database seed file creates:

- 5 genres
- 15 books distributed across the genres

Each book is connected to its corresponding genre using genreId.