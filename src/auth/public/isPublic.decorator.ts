import { type CustomDecorator, SetMetadata } from '@nestjs/common';

export const IsPublic = (): CustomDecorator<string> => SetMetadata('isPublic', true);
