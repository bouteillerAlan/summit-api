import { ApiProperty } from '@nestjs/swagger';

export class GetExerciseTypeDto {
  @ApiProperty() id: number;
}

export class CreateExerciseTypeDto {
  /* identity data */
  @ApiProperty() name: string;
}
