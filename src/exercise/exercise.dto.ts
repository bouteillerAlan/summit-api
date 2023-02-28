import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetExerciseDto {
  @ApiProperty() id: number;
}

export class CreateExerciseDto {
  /* link */
  @ApiProperty() owner: string; /* todo id */
  @ApiProperty() type: string; /* todo id */

  /* identity data */
  @ApiProperty() name: string;
  @ApiProperty() date: Date;

  /* planned data */
  @ApiPropertyOptional() plannedDistance?: number;
  @ApiPropertyOptional() plannedDuration?: number;
  @ApiPropertyOptional() plannedPace?: number;
  @ApiPropertyOptional() plannedCalorie?: number;

  /* current data */
  @ApiPropertyOptional() distance?: number;
  @ApiPropertyOptional() duration?: number;
  @ApiPropertyOptional() pace?: number;
  @ApiPropertyOptional() calorie?: number;

  /* additional data */
  @ApiPropertyOptional() note?: string;
  @ApiPropertyOptional() postActivityNote?: string;
  @ApiPropertyOptional() perceivedExertion?: number;
  @ApiPropertyOptional() feeling?: number;
}
