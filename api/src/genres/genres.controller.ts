import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { GenresService } from './genres.service.js';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  // POST /genres
  @Post()
  create(@Body('name') name: string) {
    return this.genresService.create(name);
  }

  // GET /genres
  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  // GET /genres/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  // PATCH /genres/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('name') name: string,
  ) {
    return this.genresService.update(id, name);
  }

  // DELETE /genres/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(id);
  }
}