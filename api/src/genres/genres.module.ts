import { Module } from '@nestjs/common';

import { GenresController } from './genres.controller.js';
import { GenresService } from './genres.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  controllers: [GenresController],
  providers: [GenresService, PrismaService],
})
export class GenresModule {}