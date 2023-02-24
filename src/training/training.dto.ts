import { ApiProperty } from '@nestjs/swagger';

export class GetTrainingDto {
    @ApiProperty()
    id: number;
}

export class CreateTrainingDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    type: string;
}
