import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetExerciseTypeDto {
  @ApiProperty() @IsNotEmpty() @IsNumber()
  id: number;
}

export class CreateExerciseTypeDto {
  /* identity data */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
