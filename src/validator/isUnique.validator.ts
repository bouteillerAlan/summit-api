import {
  ValidatorConstraint,
  type ValidatorConstraintInterface,
  type ValidationArguments,
  type ValidationOptions, registerDecorator
} from 'class-validator';
import { type ExerciseType } from '../exerciseType/exerciseType.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

/**
 * register the decorator
 * @param {ValidationOptions} validationOptions the options you want to pass to the validator
 * @returns {void}
 */
export function IsUniqueExerciseTypeName(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsUniqueClass
    });
  };
}

// named IsUnique*Class* because I want to use @IsUnique for my decorator name setup above
@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable()
export class IsUniqueClass implements ValidatorConstraintInterface {
  constructor(
    private readonly exerciseTypeRepository: Repository<ExerciseType>
  ) {}

  /**
   * check that the given value is unique for the given field and table
   * @param {unknown} value the tested value
   * @param {ValidationArguments} args the arguments of the demand injected via the decorator
   * @returns {boolean} if the value is unique or not
   */
  async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    // todo make it generic
    // console.log('validator args >>>>>>>>>> ', { value, args });
    // const r = await this.exerciseTypeRepository.find({ where: { name: value as string } });
    return false;
  }

  /**
   * error message if the validation failed
   * @param {ValidationArguments} args the arguments of the demand injected via the decorator
   * @returns {string} the error message
   */
  defaultMessage(args: ValidationArguments): string {
    const { value } = args;
    return `The value '${value as string}' already exist`;
  }
}
