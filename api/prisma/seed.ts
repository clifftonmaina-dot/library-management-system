import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create genres
  const genreNames = [
    'Fiction',
    'Science',
    'History',
    'Technology',
    'Fantasy',
  ];

  const genres = await Promise.all(
    genreNames.map((name) =>
      prisma.genre.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  const [fiction, science, history, technology, fantasy] = genres;

  // Book data
  const books = [
    { title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '9780000000001', totalCopies: 5, publishedYear: 1958, genreId: fiction.id },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780000000002', totalCopies: 4, publishedYear: 1925, genreId: fiction.id },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780000000003', totalCopies: 3, publishedYear: 1960, genreId: fiction.id },

    { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780000000004', totalCopies: 4, publishedYear: 1988, genreId: science.id },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', isbn: '9780000000005', totalCopies: 3, publishedYear: 1976, genreId: science.id },
    { title: 'Cosmos', author: 'Carl Sagan', isbn: '9780000000006', totalCopies: 5, publishedYear: 1980, genreId: science.id },

    { title: 'The Diary of a Young Girl', author: 'Anne Frank', isbn: '9780000000007', totalCopies: 4, publishedYear: 1947, genreId: history.id },
    { title: 'The Art of War', author: 'Sun Tzu', isbn: '9780000000008', totalCopies: 3, publishedYear: -500, genreId: history.id },
    { title: 'Long Walk to Freedom', author: 'Nelson Mandela', isbn: '9780000000009', totalCopies: 5, publishedYear: 1994, genreId: history.id },

    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780000000010', totalCopies: 4, publishedYear: 2008, genreId: technology.id },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '9780000000011', totalCopies: 3, publishedYear: 1999, genreId: technology.id },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '9780000000012', totalCopies: 2, publishedYear: 2009, genreId: technology.id },

    { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780000000013', totalCopies: 5, publishedYear: 1937, genreId: fantasy.id },
    { title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling', isbn: '9780000000014', totalCopies: 6, publishedYear: 1997, genreId: fantasy.id },
    { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', isbn: '9780000000015', totalCopies: 4, publishedYear: 1954, genreId: fantasy.id },
  ];

  // Update existing books or create new ones
  for (const book of books) {
    const existingBook = await prisma.book.findFirst({
      where: {
        title: book.title,
        author: book.author,
      },
    });

    if (existingBook) {
      await prisma.book.update({
        where: { id: existingBook.id },
        data: book,
      });
    } else {
      await prisma.book.create({
        data: book,
      });
    }
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