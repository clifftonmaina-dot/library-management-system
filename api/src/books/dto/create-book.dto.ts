import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsUUID,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsInt()
  @Min(1)
  totalCopies: number;

  @IsUUID()
  genreId: string;

  @IsInt()
  publishedYear: number;
}