import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create genres
  const fiction = await prisma.genre.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: { name: 'Fiction' },
  });

  const science = await prisma.genre.upsert({
    where: { name: 'Science' },
    update: {},
    create: { name: 'Science' },
  });

  const history = await prisma.genre.upsert({
    where: { name: 'History' },
    update: {},
    create: { name: 'History' },
  });

  const technology = await prisma.genre.upsert({
    where: { name: 'Technology' },
    update: {},
    create: { name: 'Technology' },
  });

  const fantasy = await prisma.genre.upsert({
    where: { name: 'Fantasy' },
    update: {},
    create: { name: 'Fantasy' },
  });

  // Create books
  const books = [
    { title: 'Things Fall Apart', author: 'Chinua Achebe', publishedYear: 1958, genreId: fiction.id },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925, genreId: fiction.id },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960, genreId: fiction.id },

    { title: 'A Brief History of Time', author: 'Stephen Hawking', publishedYear: 1988, genreId: science.id },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', publishedYear: 1976, genreId: science.id },
    { title: 'Cosmos', author: 'Carl Sagan', publishedYear: 1980, genreId: science.id },

    { title: 'The Diary of a Young Girl', author: 'Anne Frank', publishedYear: 1947, genreId: history.id },
    { title: 'The Art of War', author: 'Sun Tzu', publishedYear: -500, genreId: history.id },
    { title: 'Long Walk to Freedom', author: 'Nelson Mandela', publishedYear: 1994, genreId: history.id },

    { title: 'Clean Code', author: 'Robert C. Martin', publishedYear: 2008, genreId: technology.id },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', publishedYear: 1999, genreId: technology.id },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', publishedYear: 2009, genreId: technology.id },

    { title: 'The Hobbit', author: 'J.R.R. Tolkien', publishedYear: 1937, genreId: fantasy.id },
    { title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', publishedYear: 1997, genreId: fantasy.id },
    { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', publishedYear: 1954, genreId: fantasy.id },
  ];

  for (const book of books) {
    await prisma.book.create({ data: book });
  }

  console.log('Seed data inserted successfully!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });