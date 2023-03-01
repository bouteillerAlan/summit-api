import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { trainingTypeEnum } from './trainingType.enum';

export class GetTrainingTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateTrainingTypeDto {
  /* identity data */
  @ApiProperty({ enum: trainingTypeEnum })
  @IsEnum(trainingTypeEnum)
  name: trainingTypeEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  icon: string;
}
