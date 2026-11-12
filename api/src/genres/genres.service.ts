import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  // Create a genre
  async create(name: string) {
    return this.prisma.genre.create({
      data: { name },
    });
  }

  // Get all genres
  async findAll() {
    return this.prisma.genre.findMany({
      include: { books: true },
    });
  }

  // Get one genre
  async findOne(id: string) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    return genre;
  }

  // Update a genre
  async update(id: string, name: string) {
    await this.findOne(id);

    return this.prisma.genre.update({
      where: { id },
      data: { name },
    });
  }

  // Delete a genre
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.genre.delete({
      where: { id },
    });
  }
}