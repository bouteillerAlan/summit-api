import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { feelingEnum, perceivedExertionEnum } from './training.enum';

export class GetTrainingByIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class GetTrainingByDateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: string;
}

export class CreateTrainingDto {
  /* link */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  owner: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  trainingType: number;

  /* identity data */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  /* planned data */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  plannedDistance?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  plannedDuration?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  plannedPace?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  plannedCalorie?: number;

  /* current data */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  distance?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  pace?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  calorie?: number;

  /* additional data */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  postActivityNote?: string;

  @ApiPropertyOptional({ enum: perceivedExertionEnum })
  @IsOptional()
  @IsEnum(perceivedExertionEnum)
  perceivedExertion?: perceivedExertionEnum;

  @ApiPropertyOptional({ enum: feelingEnum })
  @IsOptional()
  @IsEnum(feelingEnum)
  feeling?: feelingEnum;
}
