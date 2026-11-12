import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a book
  async create(data: CreateBookDto) {
    return this.prisma.book.create({
      data,
      include: {
        genre: true,
      },
    });
  }

  // Get all books with filtering, searching and pagination
  async findAll(query: {
    genreId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number(query.limit) || 10),
    );

    const where = {
      ...(query.genreId && {
        genreId: query.genreId,
      }),

      ...(query.search && {
        OR: [
          {
            title: {
              contains: query.search,
              mode: 'insensitive' as const,
            },
          },
          {
            author: {
              contains: query.search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
    };

    const [books, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        include: {
          genre: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          title: 'asc',
        },
      }),

      this.prisma.book.count({ where }),
    ]);

    return {
      data: books,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get one book by ID
  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        genre: true,
      },
    });

    if (!book) {
      throw new NotFoundException(
        `Book with ID ${id} not found,`
      );
    }

    return book;
  }

  // Update a book
  async update(id: string, data: Partial<CreateBookDto>) {
    await this.findOne(id);

    return this.prisma.book.update({
      where: { id },
      data,
      include: {
        genre: true,
      },
    });
  }

  // Delete a book
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.book.delete({
      where: { id },
    });
  }
}