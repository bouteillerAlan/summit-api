import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetExerciseDto {
  @ApiProperty()
  id: number;
}

export class CreateExerciseDto {
  /* link */
  @ApiProperty()
  training: number;

  @ApiProperty()
  type: number;

  /* current data */
  @ApiProperty()
  weight: number;

  @ApiProperty()
  repetition: number;

  @ApiProperty()
  series: number;

  /* additional data */
  @ApiPropertyOptional()
  note?: string;
}
