import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetExerciseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateExerciseDto {
  /* link */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  training: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  type: number;

  /* current data */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  repetition: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  series: number;

  /* additional data */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  note?: string;
}
